/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'
import Animal from 'App/Models/Animal'
import Database from '@ioc:Adonis/Lucid/Database'
import TipoAnimal from 'App/Models/TipoAnimal'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class AdocaosController {

  public async store({ auth, params }: HttpContextContract) {

    const adocao = new Adocao();
    const logado = await auth.user;
    const animal = await Animal.find(params.idAnimal);
    const doacao = await Doacao.query().where('ativo', true)
      .andWhere('animal_id', animal!.id).first()
    await doacao!.preload('pessoa')  

    await adocao.related('pessoa').associate(logado!);
    await adocao.related('animal').associate(animal!);
    await adocao.save();

    doacao!.ativo = false;
    doacao!.save()
  
    return {'status': 'ok'}
  }

  public async show ({ view, params }: HttpContextContract) {
    const doacao = await Doacao.query()
      .where({ id: params.idDoacao })
      .preload('pessoa', query => query.preload('telefones'))
      .preload('animal', query => query.preload('caracteristicas'))
      .first()

    return view.render('adocao/detalhesAdocao', { pessoa: doacao?.pessoa, animal: doacao?.animal });
  }

  public async list({ view }: HttpContextContract) {
    //lista de todos os animais disponiveis pra adoção
    const doacoes = await Doacao.query().where('ativo', true)
      .preload('animal', doacoesQuery => {
        doacoesQuery.preload('tipoAnimal')
      })
    const animais = doacoes.map(doacao => 
      ({ ...doacao.animal.serialize(), doacaoId: doacao.id }));

    return view.render('adocao/list', { animais });
  }

  public async listMatch({ auth, view }: HttpContextContract) {
    //lista de animais disponiveis que da "match" com o usuario logado
    const logado = await auth.user
    const tiposAnimais = await TipoAnimal.all()
    const res = await Database.rawQuery("select ac.animal_id from animal_caracteristica as ac inner join pessoa_caracteristica as pc on ac.caracteristica_id = pc.caracteristica_id inner join doacaos as d on d.animal_id=ac.animal_id where pc.pessoa_id=? and d.ativo=true", [logado!.id])
    const animaisMatch = []

    for (const r in res[0]) {
      const animal = await Animal.find(res[0][r].animal_id)
      if (animal) {
        animaisMatch.push(animal)
      }
    }
    return view.render('adocao/listMatch', { animaisMatch, tiposAnimais });
  }

  public async listTipoAnimal({ view, params }: HttpContextContract) {
    //lista de animais disponiveis conforme o tipo de animal
    const tipoAnimal = params.tipoAnimal;
    const tiposAnimais = await TipoAnimal.all()

    var animaisTipo = await Doacao.query()
      .where('ativo', true)
      .whereHas('animal', (builder) => {
        builder.whereHas('tipoAnimal', (builder2) => {
          builder2.where('descricao', tipoAnimal)
        })
      }).preload('animal', (builder) => {
        builder.preload('tipoAnimal')
      })

    var animaisPorTipo = animaisTipo.map(doacao => 
      ({ ...doacao.animal.serialize(), doacaoId: doacao.id }));

    return view.render('adocao/listTipoAnimal', { animaisPorTipo, tiposAnimais });
  }

  private async listOutros(auth: AuthContract){
    //lista de animais que estão pra doação

    const list = await auth.user?.related('doacao')
      .query().where('ativo', true)
      .preload('animal', builder => {
        builder.preload('tipoAnimal')
      })
    
    return { list }
  }

  private async listAdocaosAbertas(auth: AuthContract) {
    //lista de animais que estão esperando a sua adoção ser efetivada pelo doador.
    const listAdocaos = await auth.user?.related('doacao')
      .query().whereHas('animal',(builder)=>{
        builder.whereHas('adocao',(builder2)=>{
          builder2.where('status','aguardando')
        })
      }).preload('animal',(builder)=>{
        builder.preload('adocao',(builder2)=>{
          builder2.where('status','aguardando').preload('pessoa')
        })
        builder.preload('tipoAnimal')
      })

    return { listAdocaos }
  }

  private async listEfetivados(auth: AuthContract) {
    //lista de animais que tiveram sua adoção efetivada: conforme o doador
    const listAdocaos = await auth.user?.related('doacao')
      .query().whereHas('animal',(builder)=>{
        builder.whereHas('adocao',(builder2)=>{
          builder2.where('status','efetivado')
        })
      }).preload('animal',(builder)=>{
        builder.preload('adocao',(builder2)=>{
          builder2.where('status','efetivado').preload('pessoa')
        })
        builder.preload('tipoAnimal')
      })

    return { listAdocaos }
  }

  private async listRecusados(auth: AuthContract) {
    //lista de animais que tiveram sua adoção recusada: conforme o doador
    const listAdocaos = await auth.user?.related('doacao')
      .query().whereHas('animal',(builder)=>{
        builder.whereHas('adocao',(builder2)=>{
          builder2.where('status','recusado')
        })
      }).preload('animal',(builder)=>{
        builder.preload('adocao',(builder2)=>{
          builder2.where('status','recusado')
            .preload('pessoa', builder => {
              builder.select(['id', 'nome']).distinct()
            })
        })
        builder.preload('tipoAnimal')
      })

    return { listAdocaos }
  }

  public async listDoacoes ({ view, auth }: HttpContextContract){
    const aguardando = await this.listAdocaosAbertas(auth)
    const efetivados = await this.listEfetivados(auth)
    const recusados = await this.listRecusados(auth)
    const outros = await this.listOutros(auth)

    console.log('estou aqui em list doações');

    return view.render('adocao/listDoacoes', { aguardando, efetivados, recusados, outros });
  }

  public async efetivarAdocaoSave({ params, response, view, auth }: HttpContextContract) {
    //caso o doador aceite o pedido de adoção
    const dado = await Adocao.find(params.idAdocao)
    dado!.status = 'efetivado'
    dado!.save()

    const aguardando = await this.listAdocaosAbertas(auth)
    const efetivados = await this.listEfetivados(auth)
    const recusados = await this.listRecusados(auth)
    const outros = await this.listOutros(auth)

    console.log('efetivada');

    return view.render('adocao/listDoacoes', { aguardando, efetivados, recusados, outros });

    //como regarregar a página?
    //console.log('estou aqui 1');
    //response.redirect().toRoute('AdocaosController.listDoacoes')
    //return
  }

  public async efetivarAdocaoRecusado({ params, response }: HttpContextContract) {
    //caso o doador recuse o pedido de adoção
    const dado = await Adocao.find(params.idAdocao);
    await dado!.preload('animal');

    const doacao = await Doacao.query().where('ativo', false)
      .andWhere('animal_id', dado!.animal.id).first()
    doacao!.ativo = true
    doacao!.save()
    
    dado!.status = 'recusado'
    dado!.save()

    return response.redirect().toRoute('/adocaos/listDoacoes')
  }

  private async listMinhasAdocoesAguardando(auth: AuthContract) {
    //lista de animais que estão aguardando: conforme o usuário logado
    const list = await auth.user!.related('adocao').query().where('status', 'aguardando')
      .preload('animal', (builder) => {
        builder.preload('tipoAnimal')
      }).preload('pessoa')
    return { list }
  }

  private async listMinhasAdocoesEfetivadas(auth: AuthContract) {
    //lista de animais que foram adotados: conforme o usuário logado
    const list = await auth.user!.related('adocao').query().where('status', 'efetivado')
      .preload('animal', (builder) => {
        builder.preload('tipoAnimal')
      }).preload('pessoa')
    return { list }
  }

  private async listMinhasAdocoesRecusadas(auth: AuthContract) {
    //lista de animais que foram recusados: conforme o usuário logado
    const list = await auth.user!.related('adocao').query().where('status', 'recusado')
      .preload('animal', (builder) => {
        builder.preload('tipoAnimal')
      }).preload('pessoa')
    return { list }
  }

  public async listAdocoes({ auth, view }: HttpContextContract){
    const aguardando = await this.listMinhasAdocoesAguardando(auth)
    const efetivados = await this.listMinhasAdocoesEfetivadas(auth)
    const recusados = await this.listMinhasAdocoesRecusadas(auth)

    return view.render('adocao/listAdocoes', { aguardando, efetivados, recusados });
  }
}
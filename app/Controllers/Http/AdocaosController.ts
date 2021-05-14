/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'
import Animal from 'App/Models/Animal'
import Database from '@ioc:Adonis/Lucid/Database'
import TipoAnimal from 'App/Models/TipoAnimal'

export default class AdocaosController {

  public async store ({ auth, params }: HttpContextContract) {
    
    const adocao = new Adocao();
    const logado = await auth.user;
    const animal = await Animal.find(params.idAnimal);

    adocao.efetivado = false;
    await adocao.related('pessoa').associate(logado);
    await adocao.related('animal').associate(animal);
    await adocao.save();
    
    const doacao = await Doacao.query().where('ativo',true)
      .andWhere('animal_id',animal!.id).first()
    
    doacao!.ativo = false;
    doacao!.save()
    
    return adocao;
  }

  public async list ({ view }: HttpContextContract){
    //lista de todos os animais disponiveis pra adoção

    const doacoes = await Doacao.query().where('ativo', true)
      .preload('animal', doacoesQuery => {
        doacoesQuery.preload('tipoAnimal')
      })
    const animais = doacoes.map(doacao => doacao.animal)

    return view.render('adocao/list', { animais });
  }

  public async listMatch ({ auth, view }: HttpContextContract) {
    //lista de animais disponiveis que da "match" com o usuario logado
    
    const logado = await auth.user
    const tiposAnimais = await TipoAnimal.all()
    const res = await Database.rawQuery("select ac.animal_id from animal_caracteristica as ac inner join pessoa_caracteristica as pc on ac.caracteristica_id = pc.caracteristica_id inner join doacaos as d on d.animal_id=ac.animal_id where pc.pessoa_id=? and d.ativo=true",[logado.id])
    const animaisMatch = []

    for(const r in res[0]){
        const animal = await Animal.find(res[0][r].animal_id)
        if(animal){
          animaisMatch.push(animal)
        }
    }
    return view.render('adocao/listMatch', { animaisMatch, tiposAnimais });
  }

  public async listTipoAnimal ({ view, params }: HttpContextContract){
    //lista de animais disponiveis conforme o tipo de animal

    const tipoAnimal = params.tipoAnimal;
    const tiposAnimais = await TipoAnimal.all()
    
    var animaisTipo = await Doacao.query()
      .where('ativo',true)
      .whereHas('animal',(builder)=>{
        builder.whereHas('tipoAnimal',(builder2)=>{
          builder2.where('descricao',tipoAnimal)
        }) 
      }).preload('animal',(builder)=>{
        builder.preload('tipoAnimal')
      })
    
    var animaisPorTipo = animaisTipo.map(doacao => doacao.animal)

    return view.render('adocao/listTipoAnimal', { animaisPorTipo, tiposAnimais });
  }

  public async listAdocaosAbertas({ auth, view }: HttpContextContract){
    //lista de animais que estão esperando a sua adoção ser efetivada pelo doador.
    //ta dando erro de syntax, não sei se ta certo essa consuta também

    const logado = await auth.user
    const tiposAnimais = await TipoAnimal.all()

    const listAdocaos = await Adocao.query()
      .whereHas('animal', (builder) => {
        builder.whereHas('doacao', (builder2) => {
          builder2.where('pessoa', logado)
        })
      })
    
    return view.render('adocao/listAberta', {listAdocaos, tiposAnimais})
  }

  public async efetivarAdocaoSave({ params }: HttpContextContract){

    const animal = await Animal.find(params.idAnimal);
    
    const adocao = await Adocao.query().where('efetivado',false)
      .andWhere('animal_id',animal!.id).first()
    
    adocao!.efetivado = true
    adocao!.save()
  }

  public async efetivarAdocaoRecusado({ params }: HttpContextContract){
    
    const animal = await Animal.find(params.idAnimal);

    const doacao = await Doacao.query().where('ativo', false)
      .andWhere('animal_id',animal!.id).first()
    
    doacao!.ativo = true
    doacao!.save()
  }
}
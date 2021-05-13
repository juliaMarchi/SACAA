/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'
import Animal from 'App/Models/Animal'
import Database from '@ioc:Adonis/Lucid/Database'
import TipoAnimal from 'App/Models/TipoAnimal'

export default class AdocaosController {

  public async store ({ request, auth, params }: HttpContextContract) {
    
    const logado = await auth.user;
    const animal = await Animal.find(params.idAnimal);
    const adocao = new Adocao();

    adocao.efetivado = false;
    await adocao.related('animal').associate(animal);
    await adocao.related('pessoa').associate(logado);
    await adocao.save();

    /*
    await Database.from('doacaos').where('ativo', 'true')
    .andWhere('animal_id', animal.id)
    .update({ ativo: 'false' })
    */

    /*
    await Doacao.query().where('ativo',true).andWhere('animal_id',animal.id).first().update({ativo: 'false'})
    */
    
    
    const doacao = await Doacao.query().where('ativo',true).andWhere('animal_id',animal.id).first()
    doacao.ativo = false;
    doacao.save()
    

    return adocao;
  }

  public async list ({ view }: HttpContextContract){

    //const animais = await Animal.query().where('ativo', true).preload('tipoAnimal')
    const doacoes = await Doacao.query().where('ativo', true).preload('animal', doacoesQuery => {
      doacoesQuery.preload('tipoAnimal')
    })
    const animais = doacoes.map(doacao => doacao.animal)
    //TODO: mudar consulta
    //const res = await Database.from('doacaos').select('*').where('ativo', 'true')
    // const res = await Database.rawQuery("select * from doacaos where ativo=true")
    // const animais = []
    // const tiposAnimais = await TipoAnimal.query().preload("")
    
    // for(const r in res[0]){
    //     const animal = await Animal.find(res[0][r].animal_id)
    //     if(animal){
    //       animal.preload("tipoAnimal");
    //       animais.push(animal);
    //     }
    //     console.log(animal)
    // }
    return view.render('adocao/list', { animais });
  }

  public async listMatch ({ auth, view }: HttpContextContract) {
    
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

    //select animal_id from animal_caracteristica as ac inner join pessoa_caracteristica as pc on ac.caracteristica_id = pc.caracteristica_id where pc.pessoa_id = 4;
    
  }

  public async listTipoAnimal ({ view, params }: HttpContextContract){

    const tipoAnimal = params.tipoAnimal;
    const tiposAnimais = await TipoAnimal.all()
    
    const doacoes = await Doacao.query()
                                .where('ativo', true)
                                .andWhereHas('animal',(builder)=>{builder.whereHas('tipoAnimal',tipoAnimal)})
                                .preload('animal')
    
    const animaisPorTipo = doacoes.map(doacao => doacao.animal)

    return view.render('adocao/listTipoAnimal', { animaisPorTipo, tiposAnimais });
  }

  public async listAdocaosAbertas({ request, auth, view }: HttpContextContract){

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

  public async adotar({}: HttpContextContract){
    //como pegar animal que o usuário escolheu

  }

  public async efetivarAdocaoSave({params, auth}: HttpContextContract){
    

  }
}
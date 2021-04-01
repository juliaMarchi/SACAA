/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'
import Animal from 'App/Models/Animal'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdocaosController {
  public async index ({}: HttpContextContract) {
  }

  public async list ({ view }: HttpContextContract) {
     
    const adocao = new Adocao();
    
    const res = Database.rawQuery("select ac.animal_id from animal_caracteristica as ac inner join pessoa_caracteristica as pc on ac.caracteristica_id = pc.caracteristica_id inner join doacaos as d on d.animal_id=ac.animal_id where pc.pessoa_id=4 and d.ativo=true")
    const animaisMatch = []

    for(const animal_id in res){
        const animal = await Animal.find(animal_id)
        animaisMatch.push(animal)
        console.log(animal_id)
    }

    console.log(animaisMatch)
    return view.render('adocao/list', { animaisMatch, adocao });

    //select animal_id from animal_caracteristica as ac inner join pessoa_caracteristica as pc on ac.caracteristica_id = pc.caracteristica_id where pc.pessoa_id = 4;
    
  }

  public async store ({ request, auth }: HttpContextContract) {
    
    const logado = await auth.user;
    //animal que o usuario escolheu?

    const dados = request.only(['data']);
    const adocao = await Adocao.create(dados);
    await adocao.related('animal').associate(request.only([animal_id]));

    await Database.from('doacaos').where('ativo', 'true').update({ account_status: 'false' })

    return adocao;
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
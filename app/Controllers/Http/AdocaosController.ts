/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'
import Animal from 'App/Models/Animal'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdocaosController {
  public async index ({}: HttpContextContract) {
  }

  public async list ({ view }: HttpContextContract){

    const res = await Database.rawQuery("select * from doacaos where ativo=true")
    const animais = []
    
    for(const r in res[0]){
        const animal = await Animal.find(res[0][r].animal_id)
        if(animal){
          animais.push(animal)
        }
        console.log(animal)
    }

    return view.render('adocao/list', { animais });
  }

  public async listMatch ({ auth, view }: HttpContextContract) {
    
    const logado = await auth.user
    
    const res = await Database.rawQuery("select ac.animal_id from animal_caracteristica as ac inner join pessoa_caracteristica as pc on ac.caracteristica_id = pc.caracteristica_id inner join doacaos as d on d.animal_id=ac.animal_id where pc.pessoa_id=? and d.ativo=true",[logado.id])
    const animaisMatch = []

    for(const r in res[0]){
        const animal = await Animal.find(res[0][r].animal_id)
        if(animal){
          animaisMatch.push(animal)
        }
    }

    return view.render('adocao/listMatch', { animaisMatch });

    //select animal_id from animal_caracteristica as ac inner join pessoa_caracteristica as pc on ac.caracteristica_id = pc.caracteristica_id where pc.pessoa_id = 4;
    
  }

  public async store ({ request, auth, params }: HttpContextContract) {
    
    const logado = await auth.user;

    const animal = await Animal.find(params.idAnimal);
    const adocao = new Adocao();

    await adocao.related('animal').associate(animal);
    await adocao.related('pessoa').associate(logado);
    await adocao.save();

    //await Database.from('doacaos').where('ativo', 'true').update({ ativo: 'false' })
    //animal id de doacaos = animal id que eu peguei

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
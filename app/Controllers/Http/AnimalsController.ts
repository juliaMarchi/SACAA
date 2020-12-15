/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal';

export default class AnimalsController {
  public async index ({ view }: HttpContextContract) {
    return view.render('animal/index', { message: 'estamos na index pelo controller' })
  }

  public async create ({ view }: HttpContextContract) {
    const animal = new Animal();
    return view.render('animal/create', { animal });
  }

  public async store ({ request }: HttpContextContract) {
    const animal = await Animal.create(request.all());
    return animal.idAnimal;
  }

  public async show ({ view }: HttpContextContract) {
    const animal =  await Animal.query().first();
    return view.render('pessoa/show', { animal });
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async delete ({ params }: HttpContextContract) {
    const animal = await Animal.find(params.idAnimal);

    if(animal){
      animal.delete();
    }
  }
}

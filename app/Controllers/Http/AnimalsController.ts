/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal';
import TipoAnimal from 'App/Models/TipoAnimal';
import Doacao from 'App/Models/Doacao';
import Pessoa from 'App/Models/Pessoa';
import authConfig from 'Config/auth';

export default class AnimalsController {
  public async index ({ view }: HttpContextContract) {
    return view.render('animal/index', { message: 'estamos na index pelo controller' })
  }

  public async create ({ view }: HttpContextContract) {
    const portes = [
      {
        value: "pequeno",
        description: "Pequeno",
      },
      {
        value: "medio",
        description: "Médio",
      },
      {
        value: "grande",
        description: "Grande",
      },
    ];
    const animal = new Animal();
    const tipoAnimais = await TipoAnimal.all();
    console.log(tipoAnimais);
    return view.render('animal/create', { portes, animal, tipoAnimais });
  }

  public async store ({ request, auth }: HttpContextContract) {
    
    const logado = await auth.user;

    const dados = request.all();
    console.log(dados)
    
    const tipoAnimal = await TipoAnimal.find(dados['idTipoAnimal']);
    console.log(tipoAnimal)

    const x = request.only(['nome','raca','nascimento','porte']);
    const animal = await Animal.create(x);

    await animal.related('tipoAnimal').associate(tipoAnimal);

    const usuario = await Pessoa.find(logado);

    return animal.id;
  }

  public async show ({ view }: HttpContextContract) {
    const animal =  await Animal.query().first();
    return view.render('animal/show', { animal });
  }

  public async list({ view }: HttpContextContract){
    const animais =  await Animal.all()
    return view.render('animal/list', { animais });
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

/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal';
import TipoAnimal from 'App/Models/TipoAnimal';
import Doacao from 'App/Models/Doacao';
import Caracteristica from 'App/Models/Caracteristica';

export default class AnimalsController {

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
    const sexos = [
      {
        value: "femea",
        description: "Fêmea"
      },
      {
        value: "macho",
        description: "Macho"
      }
    ];
    const animal = new Animal();
    const tiposAnimais = await TipoAnimal.all();
    const caracteristicas = await Caracteristica.all()
    
    return view.render('animal/create', { portes, sexos, animal, tiposAnimais, caracteristicas });
  }

  public async store ({ request, auth }: HttpContextContract) {
    
    const logado = await auth.user;
    const dados = request.all();
    console.log(dados) 

    const tipoAnimal = await TipoAnimal.find(dados['idTipoAnimal']);
    console.log(tipoAnimal)
    
    const x = request.only(['nome','raca','nascimento','porte', 'sexo']);
    const animal = await Animal.create(x);
    
    await animal.related('tipoAnimal').associate(tipoAnimal!!);

    //selecionando as caracteristicas
    const selecionadas = request.only(['caracteristicas'])['caracteristicas']
    if(selecionadas)
      await animal.related("caracteristicas").sync(selecionadas)

    //criando doação
    const doacao = await Doacao.create({pessoaId: logado?.id, animalId: animal.id, ativo: true});
    
    return {animalId: animal.id, doacaoId: doacao.id};
  }

  public async renderCaracteristicas({view, params}){
    const animal = await Animal.find(params.idAnimal)
    const caracteristicas = await Caracteristica.all()
    await animal!!.preload("caracteristicas")//carregar dados das relações
    
    return view.render('animal/perfil', { animal, caracteristicas });
  }

  public async saveCaracteristicas({request, params}){
    const animal = await Animal.find(params.idAnimal)
    const selecionadas = request.only(['caracteristicas'])['caracteristicas']
    if(selecionadas)
      await animal!!.related("caracteristicas").sync(selecionadas)
    await animal!!.preload("caracteristicas")//carregar dados das relações

    return animal
  }

  public async show ({ view, params }: HttpContextContract) {
    const animal =  await Animal.find(params.idAnimal)
    //carrega as caracteristicas do animal
    await animal!!.preload('caracteristicas')
    return view.render('animal/show', { animal });
  }

  public async list({ view }: HttpContextContract){
    const animais =  await Animal.all()
    return view.render('animal/list', { animais });
  }
  
  public async delete ({ params }: HttpContextContract) {
    const animal = await Animal.find(params.idAnimal);

    if(animal){
      animal.delete();
    }
  }
}

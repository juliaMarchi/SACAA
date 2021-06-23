/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { randomBytes } from 'crypto'
import Application from '@ioc:Adonis/Core/Application'
import Animal from 'App/Models/Animal';
import Imagem from 'App/Models/Imagem';
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

  public async store ({ request, auth, view }: HttpContextContract) {
    const logado = await auth.user;

    const dados = request.only(['nome','raca','nascimento','porte', 'sexo']);
    const animal = await Animal.create(dados);

    const tipoAnimal = await TipoAnimal.find(request.input('idTipoAnimal', null));
    await animal.related('tipoAnimal').associate(tipoAnimal!!);

    //selecionando as caracteristicas
    const selecionadas = request.input('caracteristicas', [])
    await animal.related("caracteristicas").sync(selecionadas)

    // Adiciona imagens
    const imagens: Imagem[] = []
    const animalPictures = request.files('animal_pic')
    
    for(let animalPic of animalPictures) {
      if(!animalPic) continue

      const hash = randomBytes(8).toString('hex')
      const nomeArquivo = `${hash}_${Date.now()}.${animalPic.extname}`
      const caminho = `/uploads/${nomeArquivo}`
      const animalfoto = animal.id
      await animalPic.move(
        Application.tmpPath('uploads'),
        { name: nomeArquivo }
      )

      const imagem = await Imagem.create({
        animalId: animalfoto,
        nomeArquivo: nomeArquivo,
        caminho: caminho
      })
      imagens.push(imagem)
    }
    
    await animal.related('imagens').saveMany(imagens)

    //criando doação
    await Doacao.create({ pessoaId: logado?.id, animalId: animal.id, ativo: true });
    
    //carregando depois de pronto
    await animal?.preload('caracteristicas')
    await animal?.preload('imagens')
    await animal?.preload('tipoAnimal')

    return view.render('animal/show', { animal })
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
    await animal!!.preload("caracteristicas")
    
    return animal
  }

  public async show ({ view, params }: HttpContextContract) {
    const animal =  await Animal.find(params.idAnimal)
    await animal!.preload('tipoAnimal')
    await animal!.preload('caracteristicas')
    await animal!.preload('imagens')
    const tiposAnimais = await TipoAnimal.all()

    return view.render('animal/show', { animal, tiposAnimais });
  }
}
/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View';
import Pessoa from 'App/Models/Pessoa';

export default class PessoasController {
  public async index({ view }: HttpContextContract) {
    return view.render('pessoa/index', { message: 'estamos na index pelo controller' })
  }

  public async create({ view }: HttpContextContract) {
    const pessoa = new Pessoa();
    return view.render('pessoa/create', { pessoa });
  }

  public async store({ request }: HttpContextContract) {
    const pessoa = await Pessoa.create(request.all());
    return pessoa.idPessoa;
  }

  public async show({ view, params }: HttpContextContract) {
    const pessoa =  await Pessoa.find(params.idPessoa)
    console.log(pessoa);
    return view.render('pessoa/show', { pessoa });
  }

  public async list({ view }: HttpContextContract){
    const pessoa =  await Pessoa.all()
    return view.render('pessoa/list', { pessoa });
  }

  public async edit({ view, params }: HttpContextContract) {
    const pessoa = await Pessoa.find(params.idPessoa);
    return view.render('pessoa/edit', { pessoa })
    //retornar o form pra editar uma pessoa.
  }

  public async update({ request, params }: HttpContextContract) {
    const pessoa = await Pessoa.find(params.idPessoa);

    if(pessoa){
      pessoa.merge(request.all())
      pessoa.save();
    }
  }
  
  public async delete({ params }: HttpContextContract) {
    const pessoa = await Pessoa.find(params.idPessoa);

    if(pessoa){
      pessoa.delete();
    }
  }
}

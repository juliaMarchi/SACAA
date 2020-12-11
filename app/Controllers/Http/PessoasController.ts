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
    const data = request.only(['nome']);
    const pessoa = await Pessoa.create(request.all());
    console.log(request.all());
    return pessoa.idPessoa;
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}
  
  public async destroy({}: HttpContextContract) {}
}

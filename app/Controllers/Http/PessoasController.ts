/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View';
import Pessoa from 'App/Models/Pessoa';
import Telefone from 'App/Models/Telefone';

export default class PessoasController {
  public async index({ view }: HttpContextContract) {
    return view.render('pessoa/index', { message: 'estamos na index pelo controller' })
  }

  public async create({ view }: HttpContextContract) {
    const pessoa = new Pessoa();
    return view.render('pessoa/create', { pessoa });
  }

  public async store({ request }: HttpContextContract) {
    const dados = request.all();
    const pessoa = await Pessoa.create(request.only(['nome','cpf','cnpj','nascimento','ong','cep','cidade','estado','bairro','rua','numero','complemento','email','senha']));
    if(dados['telefone1']){
      const telefone1 = new Telefone();
      telefone1.numero = dados['telefone1'];
      telefone1.idPessoa = pessoa.idPessoa;
      telefone1.save();
    }
    if(dados['telefone2']){
      const telefone2 = new Telefone();
      telefone2.numero = dados['telefone2'];
      telefone2.idPessoa = pessoa.idPessoa;
      telefone2.save();
    }
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

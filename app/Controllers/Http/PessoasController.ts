/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pessoa from 'App/Models/Pessoa';
import Telefone from 'App/Models/Telefone';
import Caracteristica from 'App/Models/Caracteristica';

export default class PessoasController {

  public async create({ view }: HttpContextContract) {
    const pessoa = new Pessoa();
    return view.render('pessoa/create', { pessoa });
  }

  public async store({ request, response }: HttpContextContract) {
    const dados = request.all();
    const pessoa = await Pessoa.create(request.only(['nome','cpf','cnpj','nascimento','ong','cep','cidade','estado','bairro','rua','numero','complemento','email','password']));
    if(dados['telefone1']){
      const telefone1 = new Telefone();
      telefone1.numero = dados['telefone1'];
      await telefone1.save();

      await telefone1.related('pessoa').associate(pessoa);
    }
    if(dados['telefone2']){
      const telefone2 = new Telefone();
      telefone2.numero = dados['telefone2'];
      telefone2.save();

      await telefone2.related('pessoa').associate(pessoa);
    }

    response.redirect('/login')
    
  }

  public async renderPerfil({view, params}){
    const pessoa = await Pessoa.find(params.idPessoa)
    const caracteristicas = await Caracteristica.all()
    return view.render('pessoa/perfil', { pessoa, caracteristicas });
  }

  public async savePerfil({request, params}){
    const pessoa = await Pessoa.find(params.idPessoa)
    await pessoa.related("caracteristicas").sync(request.only(['caracteristicas'])['caracteristicas'])
    await pessoa.preload("caracteristicas")//carregar dados das relações

    return pessoa
  }

  public async show({ view, params }: HttpContextContract) {
    const pessoa =  await Pessoa.find(params.idPessoa)
    //carrega as caracteristicas da pessoa
    await pessoa.preload('caracteristicas')
    return view.render('pessoa/show', { pessoa });
  }

  public async list({ view }: HttpContextContract){
    const pessoas =  await Pessoa.all()
    return view.render('pessoa/list', { pessoas });
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

  public async login({ auth, request, response }: HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')
    await auth.attempt(email, password)

    response.redirect('/home')
  }

  public async logout({ auth, response }: HttpContextContract){
    await auth.logout()

    response.redirect('/')
  }
}
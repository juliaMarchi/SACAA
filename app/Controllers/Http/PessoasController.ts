/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pessoa from 'App/Models/Pessoa';
import Telefone from 'App/Models/Telefone';
import Caracteristica from 'App/Models/Caracteristica';
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import TipoAnimal from 'App/Models/TipoAnimal';

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

  public async show({ view, params }: HttpContextContract) {

    const pessoa =  await Pessoa.find(params.idPessoa)
    await pessoa?.preload('caracteristicas')
    await pessoa?.preload('telefones')
    const tiposAnimais = await TipoAnimal.all()

    return view.render('pessoa/show', { pessoa, tiposAnimais });
  }

  private async renderCaracteristicas(auth: AuthContract){
    const pessoa = auth.user;
    const todasCaracteristicas = await Caracteristica.all()
    await pessoa?.preload("caracteristicas")//carregar dados das relações
    
    //TODO: Verificar se existe outra forma de checkar um checkbox...
    const caracteristicas = todasCaracteristicas.map((caract)=>{
      const objt = {}
      const flag = pessoa?.caracteristicas.find(c=> c.id === caract.id)?"checked":""
      objt['id'] = caract.id
      objt['descricao'] = caract.descricao
      objt['checked'] = flag
      return objt
    });

    return { caracteristicas };
  }

  public async perfil({ view, auth }: HttpContextContract){
    const { caracteristicas } = await this.renderCaracteristicas(auth);
    const pessoa = auth.user;
    await pessoa?.preload('telefones')

    const tiposAnimais = await TipoAnimal.all()

    return view.render('pessoa/edit', { pessoa, caracteristicas, tiposAnimais });
  }

  public async savePerfil({ request, auth, view }: HttpContextContract){

    const pessoa = auth.user;
    await pessoa?.preload('telefones')
    
    const data = request.only(['nome', 'nascimento', 'cep', 'estado', 'cidade', 'bairro', 'rua', 'numero', 'complemento']);
    if(pessoa) {
      pessoa.merge(data)
      await pessoa.save();
    }

    const tel1 = request.input('telefone1');
    const objTel1 = pessoa?.telefones[0];
    objTel1.numero = tel1;
    objTel1?.save();

    const tel2 = request.input('telefone2');
    const objTel2 = pessoa?.telefones[1];
    objTel2.numero = tel2;
    objTel2?.save();

    const selecionadas = request.only(['caracteristicas'])['caracteristicas']
    if(selecionadas)
      await pessoa?.related("caracteristicas").sync(selecionadas)
    
    const res = await Pessoa.find(pessoa?.id);
    await res?.preload('caracteristicas');
    await res?.preload('telefones');
    const { caracteristicas } = await this.renderCaracteristicas(auth);
    
    return view.render('pessoa/edit', { 'pessoa': res, caracteristicas });
  }

  public async listaEstados({}: HttpContextContract){
    const pessoas = await Pessoa.all();
    var estados = new Set();
    pessoas.map(p => estados.add(p.estado));
    return JSON.stringify([...estados]);
  }

  public async listaCidades({ params }: HttpContextContract){
    const pessoas = await Pessoa.query().where('estado', params.estado);
    var cidades = new Set();
    pessoas.map(p => cidades.add(p.cidade));
    return JSON.stringify([...cidades]);
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
/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pessoa from 'App/Models/Pessoa';
import Telefone from 'App/Models/Telefone';
import Caracteristica from 'App/Models/Caracteristica';
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import TipoAnimal from 'App/Models/TipoAnimal';
import Application from '@ioc:Adonis/Core/Application';
import { randomBytes } from 'crypto'

export default class PessoasController {

  public async create({ view }: HttpContextContract) {
    const pessoa = new Pessoa();
    return view.render('pessoa/create', { pessoa });
  }

  public async store({ request, response }: HttpContextContract) {
    //const pessoa = await Pessoa.create(request.only(['nome','cpf','cnpj','nascimento','ong','cep','cidade','estado','bairro','rua','numero','complemento','email','password']));
    const dados = request.only(['nome','cpf','cnpj','nascimento','ong','cep','cidade','estado','bairro','rua','numero','complemento','email','password']);

    //adicionando imagem de perfil
    const pessoaPic = request.file('profile_pic')

    const hash = randomBytes(8).toString('hex')
    const nomeArquivo = `${hash}_${Date.now()}.${pessoaPic?.extname}`
    await pessoaPic?.move(
      Application.tmpPath('uploads'),
      { name: nomeArquivo }
    )
    const pessoa = await Pessoa.create({ ...dados, enderecoFoto: `/uploads/${nomeArquivo}` });

    //adicionando telefones
    const telefones = request.input('telefones', []).slice(0, 2)
    console.log(telefones);
    telefones.forEach(async tel => {
      if(!tel) return;

      const telefone = new Telefone();
      telefone.numero = tel;
      await telefone.save();

      await telefone.related('pessoa').associate(pessoa);
    });

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

  public async listaEstados({}: HttpContextContract) {
    const estados = await Pessoa.query().select('estado').distinct()
    return estados.map(e => e.serialize())
  }

  public async listaCidades({ params }: HttpContextContract){
    const cidades = await Pessoa.query()
      .select('cidade')
      .where('estado', decodeURIComponent(params.estado))
      .distinct()
    return cidades.map(c => c.serialize())
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
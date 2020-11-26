import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PessoasController {
  public async index({ view }: HttpContextContract) {
    return view.render('pessoa/index', { message: 'ola galera' })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

//tchau tchau

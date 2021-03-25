/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'

export default class AdocaosController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({}: HttpContextContract) {
    const doacaoAtiva = await Doacao.query()
      .where('ativo', true)
    //const adocao = new Adocao();
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

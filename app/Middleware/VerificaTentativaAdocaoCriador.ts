/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doacao from 'App/Models/Doacao'

export default class VerificaTentativaAdocaoCriador {
  public async handle ({ auth, params, response }: HttpContextContract, next: () => Promise<void>) {
    const doacao = await Doacao.query().where('ativo', true)
      .andWhere('animal_id', params.idAnimal).first()
    await doacao?.preload('pessoa')

    if(doacao?.pessoa.id === auth.user?.id){
      return response.unauthorized({ status: 'fail', message: 'O anunciante não pode realizar a adoção.' })
    }
    await next()
  }
}
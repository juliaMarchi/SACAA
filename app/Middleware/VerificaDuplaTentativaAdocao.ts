import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adocao from 'App/Models/Adocao'

export default class VerificaDuplaTentativaAdocao {
  public async handle({ auth, params, response }: HttpContextContract, next: () => Promise<void>) {
    const adocao = await Adocao.query()
      .where({ pessoa_id: auth.user?.id, animal_id: params.idAnimal })
      .first()

    if (adocao !== null) {
      return response.unauthorized({ status: 'fail', message: 'Tentativa de adoção já realizada.' })
    }

    await next()
  }
}

/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerificaCaracteristica {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    
    const carac = auth.user?.preload('caracteristicas')

    if(!carac){
      return response.unauthorized({ status: 'fail', message: 'Cadastre suas características em "Perfil" para acessar seu match perfeito.' })
    }

    await next()
  }
}

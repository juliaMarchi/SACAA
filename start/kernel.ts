/* eslint-disable prettier/prettier */
import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register(['Adonis/Core/BodyParserMiddleware'])

Server.middleware.registerNamed({
  auth: 'App/Middleware/Auth',
  verificaDuplaTentativa: 'App/Middleware/VerificaDuplaTentativaAdocao',
  verificaTentativaAdocaoCriador: 'App/Middleware/VerificaTentativaAdocaoCriador',
  verificaCaracteristica: 'App/Middleware/VerificaCaracteristica'
})

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
//import { cuid } from '@ioc:Adonis/Core/Helpers'

Route.post('gallery', async ({ request }) => {
  const images = request.files('images')

  for (let image of images) {
    await image.move(Application.tmpPath('uploads'))
  }
})

Route.post('posts', async ({ request }) => {
  const coverImage = request.file('cover_image')

  if (coverImage) {
    await coverImage.move(Application.tmpPath('uploads'))
  }
})

Route.get('uploads/:filename', async ({ params, response }) => {
  return response.attachment(
    Application.tmpPath('uploads', params.filename)//, `${cuid()}`
  )
})
/* eslint-disable prettier/prettier */
import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register(['Adonis/Core/BodyParserMiddleware'])

Server.middleware.registerNamed({
  auth: 'App/Middleware/Auth',
  verificaDuplaTentativa: 'App/Middleware/VerificaDuplaTentativaAdocao',
  verificaTentativaAdocaoCriador: 'App/Middleware/VerificaTentativaAdocaoCriador',
  verificaCaracteristica: 'App/Middleware/VerificaCaracteristica'
})
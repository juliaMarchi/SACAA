import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.on('/').render('welcome')

Route.get('cadastro', 'PessoasController.index')

Route.get('test', async () => {
  return Database.query().select('*').from('Pessoas')
})

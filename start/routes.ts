/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.on('/').render('welcome')

Route.get('/dashboard', async ({ auth }) => {
    const user = await auth.authenticate()
    return `Hello user! Your email address is ${user.email}`
})

Route.on('login').render('login')
Route.post('/login', 'PessoasController.login')
Route.get('/logout', 'PessoasController.logout');

//Route.resource('pessoas', 'PessoasController');
Route.get('/pessoas/index', 'PessoasController.index');
Route.get('/pessoas/cadastro', 'PessoasController.create');
Route.post('/pessoas/cadastro', 'PessoasController.store');
Route.get('/pessoas', 'PessoasController.list').middleware('auth:web');
Route.get('/pessoas/:idPessoa', 'PessoasController.show');
Route.get('/pessoas/:idPessoa/perfil', 'PessoasController.renderPerfil');
Route.post('/pessoas/:idPessoa/perfil', 'PessoasController.savePerfil');

//Route.resource('animais', 'AnimalsController');
Route.get('/animais/index', 'AnimalsController.index');
Route.get('/animais/cadastro', 'AnimalsController.create');
Route.post('/animais/cadastro', 'AnimalsController.store');
Route.get('/animais', 'AnimalsController.list');
/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.on('/').render('login')

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

Route.get('/home', 'HomeController.index').middleware('auth:web');
Route.get('/adocaos/list', 'AdocaosController.list').middleware('auth:web');
Route.get('/adocaos/listMatch', 'AdocaosController.listMatch').middleware('auth:web');
Route.get('/adocaos/listTipoAnimal/:tipoAnimal', 'AdocaosController.listTipoAnimal').middleware('auth:web');
Route.get('/adocaos/listAbertas', 'AdocaosController.listAdocaosAbertas').middleware('auth:web');
Route.get('/adocaos/realiza/:idAnimal', 'AdocaosController.store').middleware('auth:web');
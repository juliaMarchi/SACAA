/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.on('/').render('login')

Route.on('login').render('login')
Route.post('/login', 'PessoasController.login')
Route.get('/logout', 'PessoasController.logout');

//Route.resource('pessoas', 'PessoasController');
Route.get('/pessoas/cadastro', 'PessoasController.create');
Route.post('/pessoas/cadastro', 'PessoasController.store');
Route.get('/pessoas', 'PessoasController.list').middleware('auth:web');
Route.get('/pessoas/:idPessoa', 'PessoasController.show').middleware('auth:web');
Route.get('/pessoas/:idPessoa/editar', 'PessoasController.edit').middleware('auth:web');
Route.post('/pessoas/:idPessoa/editar', 'PessoasController.update').middleware('auth:web');
Route.get('/pessoas/:idPessoa/perfil', 'PessoasController.renderPerfil').middleware('auth:web');
Route.post('/pessoas/:idPessoa/perfil', 'PessoasController.savePerfil').middleware('auth:web');

//Route.resource('animais', 'AnimalsController');
Route.get('/animais/cadastro', 'AnimalsController.create').middleware('auth:web');
Route.post('/animais/cadastro', 'AnimalsController.store').middleware('auth:web');
Route.get('/animais', 'AnimalsController.list').middleware('auth:web');
Route.get('/animais/:idAnimal', 'AnimalsController.show').middleware('auth:web');
Route.get('/animais/:idAnimal/perfil', 'AnimalsController.renderPerfil').middleware('auth:web');
Route.post('/animais/:idAnimal/perfil', 'AnimalsController.savePerfil').middleware('auth:web');

Route.get('/home', 'HomeController.index').middleware('auth:web');
Route.get('/adocaos/list', 'AdocaosController.list').middleware('auth:web');
Route.get('/adocaos/listMatch', 'AdocaosController.listMatch').middleware('auth:web');
Route.get('/adocaos/listTipoAnimal/:tipoAnimal', 'AdocaosController.listTipoAnimal').middleware('auth:web');
Route.get('/adocaos/listAbertas', 'AdocaosController.listAdocaosAbertas').middleware('auth:web');
Route.get('/adocaos/realiza/:idAnimal', 'AdocaosController.store').middleware('auth:web');
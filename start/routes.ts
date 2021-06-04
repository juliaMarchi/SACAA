/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.get('/',  async ({response}) => {
    return response.redirect('/home')
})

Route.on('login').render('login')
Route.post('/login', 'PessoasController.login')
Route.get('/logout', 'PessoasController.logout');

//Route.resource('pessoas', 'PessoasController');
Route.get('/pessoas/cadastro', 'PessoasController.create');
Route.post('/pessoas/cadastro', 'PessoasController.store');
Route.get('/pessoas', 'PessoasController.list').middleware('auth:web');
Route.get('/pessoas/:idPessoa', 'PessoasController.show').middleware('auth:web');
Route.get('/perfil', 'PessoasController.perfil').middleware('auth:web')
Route.post('/perfil', 'PessoasController.savePerfil').middleware('auth:web')

//Route.resource('animais', 'AnimalsController');
Route.get('/animais/cadastro', 'AnimalsController.create').middleware('auth:web');
Route.post('/animais/cadastro', 'AnimalsController.store').middleware('auth:web');
Route.get('/animais', 'AnimalsController.list').middleware('auth:web');
Route.get('/animais/:idAnimal', 'AnimalsController.show').middleware('auth:web');
Route.get('/animais/:idAnimal/caracteristicas', 'AnimalsController.renderCaracteristicas').middleware('auth:web');
Route.post('/animais/:idAnimal/caracteristicas', 'AnimalsController.saveCaracteristicas').middleware('auth:web');

Route.get('/home', 'HomeController.index').middleware('auth:web');
Route.get('/adocaos/list', 'AdocaosController.list').middleware('auth:web');
Route.get('/adocaos/listMatch', 'AdocaosController.listMatch').middleware('auth:web');
Route.get('/adocaos/listTipoAnimal/:tipoAnimal', 'AdocaosController.listTipoAnimal').middleware('auth:web');
Route.get('/adocaos/listDoacoes', 'AdocaosController.listDoacoes').middleware('auth:web');
Route.get('/adocaos/listAdocoes', 'AdocaosController.listAdocoes').middleware('auth:web');
Route.get('/adocaos/realiza/:idAnimal', 'AdocaosController.store').middleware(['auth:web', 'verificaDuplaTentativa', 'verificaTentativaAdocaoCriador']);
Route.get('/adocaos/:idDoacao', 'AdocaosController.show').middleware('auth:web');
Route.get('/adocaos/efetivar/:idAdocao', 'AdocaosController.efetivarAdocaoSave').middleware('auth:web');
Route.get('/adocaos/recusar/:idAdocao', 'AdocaosController.efetivarAdocaoRecusado').middleware('auth:web');
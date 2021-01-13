/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.on('/').render('welcome')

Route.resource('pessoas', 'PessoasController');
Route.get('/index', 'PessoasController.index');
Route.get('/cadastro', 'PessoasController.create');
Route.post('/cadastro', 'PessoasController.store');
Route.get('/lista', 'PessoasController.list');
Route.get('/show/:idPessoa', 'PessoasController.show');
Route.get('/perfil/:idPessoa', 'PessoasController.renderPerfil');
Route.post('/perfil/:idPessoa', 'PessoasController.savePerfil');


Route.resource('animais', 'AnimalsController');
Route.get('/indexAnimal', 'AnimalsController.index');
Route.get('/cadastroAnimal', 'AnimalsController.create');
Route.post('/cadastroAnimal', 'AnimalsController.store');
Route.get('/listaAnimais', 'AnimalsController.show');
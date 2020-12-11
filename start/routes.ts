/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

Route.on('/').render('welcome')

Route.get('/cadastro', 'PessoasController.create')

Route.post('/cadastro', 'PessoasController.store');

Route.get('/index', 'PessoasController.index')

Route.resource('pessoas', 'PessoasController');
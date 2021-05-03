/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TipoAnimal from 'App/Models/TipoAnimal'

export default class AdocaosController {
    public async index ({view}: HttpContextContract) {
        const tiposAnimais = await TipoAnimal.all()

        return view.render('home', { tiposAnimais })
    }
}
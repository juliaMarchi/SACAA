/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doacao from 'App/Models/Doacao'
import TipoAnimal from 'App/Models/TipoAnimal'

export default class AdocaosController {
    public async index ({view}: HttpContextContract) {
        const list = await Doacao.query()
                        .where('ativo', true)
                        .preload('animal', (builder) => {
                            builder.preload('tipoAnimal')
                        })
                        .orderBy('created_at', 'desc')
                        .limit(8)

        const tiposAnimais = await TipoAnimal.all()
        return view.render('home', { list, tiposAnimais });
    }
}
/* eslint-disable prettier/prettier */
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Doacao from 'App/Models/Doacao'
import TipoAnimal from 'App/Models/TipoAnimal'

export default class AdocaosController {
    public async index ({ view, request }: HttpContextContract) {

        const tiposAnimais = await TipoAnimal.all()
        const cidade = request.only(['cidade'])['cidade'];

        if(cidade){
            var list = await Doacao.query()
                .where('ativo', true)
                .whereHas('pessoa', (builder) => {
                    builder.where('cidade', cidade)
                })
                .preload('animal', (builder) => {
                    builder.preload('tipoAnimal')
                    builder.preload('imagens')
                })
                .orderBy('created_at', 'desc')
                .limit(8)
        }else{
            var list = await Doacao.query()
                .where('ativo', true)
                .preload('animal', (builder) => {
                    builder.preload('tipoAnimal')
                    builder.preload('imagens')
                })
                .orderBy('created_at', 'desc')
                .limit(8)
        }
        
        return view.render('home', { list, tiposAnimais });
    }
}
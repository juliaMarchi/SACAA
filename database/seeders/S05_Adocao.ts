import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import Animal from 'App/Models/Animal'
import Adocao from 'App/Models/Adocao'
import Pessoa from 'App/Models/Pessoa'
import { DateTime, Zone } from 'luxon';

export default class S05_AdocaoSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    const cachorro = await Animal.query().where('nome','Cachorro 1').first()
    const pessoas = await Pessoa.all()
    const pessoa = pessoas[1]
    const adocao = await Adocao.create({pessoaId:pessoa?.id, animalId:cachorro?.id, data: DateTime.local().toJSDate()})

    const doacao = await cachorro?.related('doacao').query().where('ativo',true).first()

    doacao!.ativo = false

    await doacao!.save()  

  }
}

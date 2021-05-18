/* eslint-disable prettier/prettier */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Caracteristica from 'App/Models/Caracteristica'
import Database from '@ioc:Adonis/Lucid/Database'

export default class CaracteristicaSeederSeeder extends BaseSeeder {
  public async run () {
    await Caracteristica.create({descricao:'Tranquilo'})
    await Caracteristica.create({descricao:'Agitado'})
    await Caracteristica.create({descricao:'Agressivo'})
    await Caracteristica.create({descricao:'Amigável'})
    await Caracteristica.create({descricao:'Legal'})
    await Caracteristica.create({descricao:'Sonolento'})
  }
}

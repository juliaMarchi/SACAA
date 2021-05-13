import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TipoAnimal from 'App/Models/TipoAnimal'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TipoAnimalSeederSeeder extends BaseSeeder {
  public async run () {
    await TipoAnimal.create({descricao:'Cachorro'})
    await TipoAnimal.create({descricao:'Gato'})
    await TipoAnimal.create({descricao:'Coelho'})
    await TipoAnimal.create({descricao:'Porco'})
    
  }
}

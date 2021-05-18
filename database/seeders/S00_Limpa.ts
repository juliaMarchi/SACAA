/* eslint-disable prettier/prettier */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class S00LimpaSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Database.rawQuery("delete from doacaos")
    await Database.rawQuery("delete from adocaos")
    await Database.rawQuery("delete from pessoa_caracteristica")
    await Database.rawQuery("delete from animal_caracteristica")
    await Database.rawQuery("delete from animals")
    await Database.rawQuery("delete from pessoas")
    await Database.rawQuery("delete from tipo_animals")
    await Database.rawQuery("delete from caracteristicas")
  }
}

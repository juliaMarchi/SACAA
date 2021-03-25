/* eslint-disable prettier/prettier */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PessoaFactory } from 'Database/factories'

export default class PessoaSeeder extends BaseSeeder {
  public async run () {
    await PessoaFactory.createMany(10);
  }
}

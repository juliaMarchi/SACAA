/* eslint-disable prettier/prettier */
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PessoaFactory } from 'Database/factories'
import Database from '@ioc:Adonis/Lucid/Database'
import Pessoa from 'App/Models/Pessoa'
import Caracteristica from 'App/Models/Caracteristica'



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class PessoaSeeder extends BaseSeeder {
  
  private async ajustaCaracteristicas(){
    const pessoas = await Pessoa.all()
    const caracteristicas = await Caracteristica.all()

    const promisses = pessoas.map((pessoa) => {
      
      var carac1 = caracteristicas[getRandomInt(0,caracteristicas.length)]
      var carac2 = caracteristicas[getRandomInt(0,caracteristicas.length)]
      while(carac1 == carac2){
        carac2 = caracteristicas[getRandomInt(0,caracteristicas.length)]
      }
      pessoa.related('caracteristicas').saveMany([carac1, carac2])
    })

    await Promise.all(promisses)
  }
  
  public async run () {
    await PessoaFactory.createMany(10);
    await Pessoa.create({nome: 'Ze', email: 'ze@teste.com', password: '12345'})
    await this.ajustaCaracteristicas()
  }
}

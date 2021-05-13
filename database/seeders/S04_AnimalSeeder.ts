import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Animal from 'App/Models/Animal'
import TipoAnimal from 'App/Models/TipoAnimal'
import Doacao from 'App/Models/Doacao'
import Pessoa from 'App/Models/Pessoa'
import Caracteristica from 'App/Models/Caracteristica'


import { DateTime, Zone } from 'luxon';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class AnimalSeederSeeder extends BaseSeeder {

  private async ajustaCaracteristicas(){
    const animais = await Animal.all()
    const caracteristicas = await Caracteristica.all()

    const promisses = animais.map((animal) => {
      var carac1 = caracteristicas[getRandomInt(0,caracteristicas.length)]
      var carac2 = caracteristicas[getRandomInt(0,caracteristicas.length)]
      while(carac1 == carac2){
        carac2 = caracteristicas[getRandomInt(0,caracteristicas.length)]
      }
      
      animal.related('caracteristicas').saveMany([carac1,carac2])
    })

    await Promise.all(promisses)

  }


  private async criaCachorros(){
    const cachorro = await TipoAnimal.query().where('descricao','Cachorro').first()
    var c1 = await Animal.create({nome: 'Cachorro 1',
                         raca: 'Raca 1',
                         porte: 'Porte 1'
                          });
    await c1.related('tipoAnimal').associate(cachorro);
    const p1 = await Pessoa.all()[0]
    await Doacao.create({pessoaId: p1?.id, animalId: c1.id, ativo: true})

    var c1 = await Animal.create({nome: 'Cachorro 2',
                         raca: 'Raca 2',
                         porte: 'Porte 2'
                          });
    await c1.related('tipoAnimal').associate(cachorro);
    const p2 = await Pessoa.all()[1]
    await Doacao.create({pessoaId: p2?.id, animalId: c1.id, ativo: true})

    var c1 = await Animal.create({nome: 'Cachorro 3',
                         raca: 'Raca 3',
                         porte: 'Porte 3'
                          });
    await c1.related('tipoAnimal').associate(cachorro);
    const p3 = await Pessoa.all()[2]
    await Doacao.create({pessoaId: p3?.id, animalId: c1.id, ativo: false})
  
  }

  private async criaGatos(){
    const gato = await TipoAnimal.query().where('descricao','Gato').first()
    var c1 = await Animal.create({nome: 'Gato 1',
                         raca: 'Raca gato 1',
                         porte: 'Porte gato 1'
                          });
    await c1.related('tipoAnimal').associate(gato);
    const p1 = await Pessoa.all()[0]
    await Doacao.create({pessoaId: p1?.id, animalId: c1.id, ativo: true})

    var c1 = await Animal.create({nome: 'Gato 2',
                         raca: 'Raca gato 2',
                         porte: 'Porte gato 2'
                          });
    await c1.related('tipoAnimal').associate(gato);
    const p2 = await Pessoa.all()[1]
    await Doacao.create({pessoaId: p2?.id, animalId: c1.id, ativo: true})

    var c1 = await Animal.create({nome: 'Gato 3',
                         raca: 'Raca gato 3',
                         porte: 'Porte gato 3'
                          });
    await c1.related('tipoAnimal').associate(gato);
    const p3 = await Pessoa.all()[2]
    await Doacao.create({pessoaId: p3?.id, animalId: c1.id, ativo: false})
  
  }

  public async run () {
    
    await this.criaCachorros()
    await this.criaGatos()
    await this.ajustaCaracteristicas()
  }
}

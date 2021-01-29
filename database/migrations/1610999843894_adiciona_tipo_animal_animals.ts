/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AdicionaTipoAnimalAnimals extends BaseSchema {
  protected tableName = 'animals'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.integer('idTipoAnimal').unsigned().references('idTipoAnimal').inTable('tipo_animals')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
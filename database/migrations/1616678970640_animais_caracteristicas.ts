/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AnimalCaracteristicas extends BaseSchema {
  protected tableName = 'animal_caracteristica'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('animal_id').unsigned().references('id').inTable('animals')
      table.integer('caracteristica_id').unsigned().references('id').inTable('caracteristicas')
      
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

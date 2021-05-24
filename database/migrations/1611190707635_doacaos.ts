/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Doacaos extends BaseSchema {
  protected tableName = 'doacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.integer('animal_id')
        .unsigned()
        .references('id')
        .inTable('animals')
      table.integer('pessoa_id')
        .unsigned()
        .references('id')
        .inTable('pessoas')
      table.boolean('ativo').notNullable
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTableIfExists(this.tableName)
  }
}

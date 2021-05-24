/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Adocaos extends BaseSchema {
  protected tableName = 'adocaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('status').notNullable().defaultTo('aguardando')
      table.integer('animal_id').unsigned().references('id').inTable('animals')
      table.integer('pessoa_id').unsigned().references('id').inTable('pessoas')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

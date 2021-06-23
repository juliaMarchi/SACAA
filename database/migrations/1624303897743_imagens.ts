/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Imagens extends BaseSchema {
  protected tableName = 'imagens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('nomeArquivo').notNullable
      table.string('caminho').notNullable
      table.integer('animal_id')
        .unsigned()
        .references('id')
        .inTable('animals')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

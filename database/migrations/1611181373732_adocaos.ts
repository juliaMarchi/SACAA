/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Adocaos extends BaseSchema {
  protected tableName = 'adocaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('idAdocao').primary
      table.date('data').notNullable
      table.integer('idAnimal').unsigned().references('idAnimal').inTable('animals')
      table.integer('idPessoa').unsigned().references('idPessoa').inTable('pessoas')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Doacaos extends BaseSchema {
  protected tableName = 'doacaos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('idDoacao').primary
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

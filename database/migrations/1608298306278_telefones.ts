/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Telefones extends BaseSchema {
  protected tableName = 'telefones'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('idTelefone').primary
      table.foreign('idPessoa').references('idPessoa').inTable('Pessoas')
      table.string('numero').notNullable
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

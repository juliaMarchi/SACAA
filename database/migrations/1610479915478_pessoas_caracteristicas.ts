/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PessoasCaracteristicas extends BaseSchema {
  protected tableName = 'pessoas_caracteristicas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('idPessoa').unsigned().references('idPessoa').inTable('pessoas')
      table.integer('idCaracteristica').unsigned().references('idCaracteristica').inTable('caracteristicas')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

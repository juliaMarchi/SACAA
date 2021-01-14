/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PessoaCaracteristicas extends BaseSchema {
  protected tableName = 'pessoa_caracteristica'

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

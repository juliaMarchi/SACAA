/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PessoaCaracteristicas extends BaseSchema {
  protected tableName = 'pessoa_caracteristica'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('pessoa_id').unsigned().references('id').inTable('pessoas')
      table.integer('caracteristica_id').unsigned().references('id').inTable('caracteristicas')
      
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

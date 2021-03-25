/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AdicionaAtivas extends BaseSchema {
  protected tableName = 'doacaos'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('ativo').notNullable
    })
  }

  public async down () {
    this.schema.table(this.tableName, table => {
      table.dropColumn('ativo')
    })
  }
}

/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pessoas extends BaseSchema {
  protected tableName = 'pessoas'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('cpf')
      table.string('cnpj')
      table.string('cep').notNullable
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('cpf')
      table.dropColumn('cnpj')
      table.dropColumn('cep')
    })
  }
}

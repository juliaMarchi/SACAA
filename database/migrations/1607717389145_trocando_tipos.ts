/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pessoas extends BaseSchema {
  protected tableName = 'pessoas'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('cnpj').alter()
      table.string('cpf').alter()
      table.string('cep').alter()
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.integer('cpf').alter()
      table.integer('cnpj').alter()
      table.integer('cep').alter()
    })
  }
}

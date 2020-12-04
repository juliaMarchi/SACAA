/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Pessoas extends BaseSchema {
  protected tableName = 'pessoas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary
      table.string('nome').notNullable
      table.date('nascimento').notNullable
      table.integer('cpf')
      table.integer('cnpj')
      table.boolean('ong').notNullable
      table.integer('cep').notNullable
      table.string('estado').notNullable
      table.string('cidade').notNullable
      table.string('bairro').notNullable
      table.string('rua').notNullable
      table.integer('numero').notNullable
      table.string('complemento')
      table.string('enderecoFoto')
      table.string('email').notNullable
      table.string('senha').notNullable
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

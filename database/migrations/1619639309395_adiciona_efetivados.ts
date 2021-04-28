/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AdicionaEfetivados extends BaseSchema {
  protected tableName = 'adocaos'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.boolean('efetivado').defaultTo(0)
    })
  }

  public async down () {
    this.schema.table(this.tableName, table => {
      table.dropColumn('efetivado')
    })
  }
}
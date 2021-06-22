import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AnimalImagens extends BaseSchema {
  protected tableName = 'animal_imagens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('animal_id').unsigned().references('id').inTable('animals')
      table.integer('imagem_id').unsigned().references('id').inTable('imagens')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

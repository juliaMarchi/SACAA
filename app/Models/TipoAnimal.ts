/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Animal from 'App/Models/Animal'

export default class TipoAnimal extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'descricao' })
  public descricao: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Animal, {foreignKey:'tipoanimal_id'})
  public animal: HasMany<typeof Animal>
}

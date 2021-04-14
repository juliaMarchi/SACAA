/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Animal from 'App/Models/Animal'
import Pessoa from 'App/Models/Pessoa'

export default class Adocao extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'data' })
  public data: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @belongsTo(() => Animal, {localKey: 'animal_id', foreignKey: 'id'})
  public animal: BelongsTo<typeof Animal>

  @belongsTo(() => Pessoa, {localKey: 'pessoa_id', foreignKey: 'id'})
  public pessoa: BelongsTo<typeof Pessoa>
}
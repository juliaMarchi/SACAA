/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Animal from 'App/Models/Animal'
import Pessoa from 'App/Models/Pessoa'

export default class Doacao extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'data' })
  public data: Date

  @column({ columnName: 'ativo' })
  public ativo: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public pessoaId:number

  @column()
  public animalId:number

  @belongsTo(() => Animal, {foreignKey:'id'})
  public animal: BelongsTo<typeof Animal>

  @belongsTo(() => Pessoa, {foreignKey:'id'})
  public pessoa: BelongsTo<typeof Pessoa>
}

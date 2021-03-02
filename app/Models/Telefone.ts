import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Pessoa from 'App/Models/Pessoa'

export default class Telefone extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'pessoa_id' })
  public pessoaId: number

  @column({ columnName: 'numero' })
  public numero: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Pessoa)
  public pessoa: BelongsTo<typeof Pessoa>
}

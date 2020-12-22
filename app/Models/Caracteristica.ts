import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Caracteristica extends BaseModel {
  @column({ isPrimary: true, columnName: 'idCaracteristica' })
  public idCaracteristica: number

  @column({ columnName: 'descricao' })
  public descricao: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

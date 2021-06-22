/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Imagem extends BaseModel {
  public static table = 'imagens'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'nomeArquivo'})
  public nomeArquivo: string

  @column()
  public caminho: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

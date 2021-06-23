/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Animal from 'App/Models/Animal'

export default class Imagem extends BaseModel {
  public static table = 'imagens'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'nomeArquivo'})
  public nomeArquivo: string

  @column()
  public caminho: string

  @column({ columnName: 'animal_id' })
  public animalId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Animal)
  public animal: BelongsTo<typeof Animal>
}

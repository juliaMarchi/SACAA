/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Animal from 'App/Models/Animal'
import Pessoa from 'App/Models/Pessoa'

export default class Doacao extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'ativo' })
  public ativo: boolean
  
  @column({ columnName: 'pessoa_id' })
  public pessoaId:number

  @column({ columnName: 'animal_id' })
  public animalId:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Animal)
  public animal: BelongsTo<typeof Animal>

  @belongsTo(() => Pessoa)
  public pessoa: BelongsTo<typeof Pessoa>
}

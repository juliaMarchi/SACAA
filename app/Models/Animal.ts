import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Animal extends BaseModel {
  @column({ isPrimary: true })
  public idAnimal: number

  @column({ columnName: 'nome' })
  public nome: string[45]

  @column({ columnName: 'nascimento' })
  public datanascimento: Date

  @column({ columnName: 'raca' })
  public raca: string[45]

  @column({ columnName: 'porte' })
  public porte: string[45]

  @column({ columnName: 'enderecoFoto' })
  public enderecoFoto: string[300]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

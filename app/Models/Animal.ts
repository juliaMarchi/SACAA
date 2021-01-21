/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TipoAnimal from 'App/Models/TipoAnimal'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'

export default class Animal extends BaseModel {
  @column({ isPrimary: true, columnName: 'idAnimal' })
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

  @belongsTo(() => TipoAnimal)
  public tipoAnimal: BelongsTo<typeof TipoAnimal> 

  @hasMany(() => Adocao, {foreignKey:'idAdocao'})
  public adocao: HasMany<typeof Adocao>

  @hasMany(() => Doacao, {foreignKey:'idDoacao'})
  public doacao: HasMany<typeof Doacao>

}

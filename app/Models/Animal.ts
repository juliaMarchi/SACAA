/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, ManyToMany, manyToMany, } from '@ioc:Adonis/Lucid/Orm'
import TipoAnimal from 'App/Models/TipoAnimal'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'
import Caracteristica from 'App/Models/Caracteristica'

export default class Animal extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

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

  @column({ columnName: 'tipoanimal_id' })
  public tipoAnimalId: number


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

  @manyToMany(() => Caracteristica,{
    localKey: 'id',
    pivotForeignKey: 'animal_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'caracteristica_id',
    pivotTable: 'animal_caracteristica'
  } )
  public caracteristicas: ManyToMany<typeof Caracteristica>



}

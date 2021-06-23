/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, ManyToMany, manyToMany, } from '@ioc:Adonis/Lucid/Orm'
import TipoAnimal from 'App/Models/TipoAnimal'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'
import Caracteristica from 'App/Models/Caracteristica'
import Imagen from './Imagem'

export default class Animal extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

  @column({ columnName: 'nome' })
  public nome: string[45]

  @column.date({ columnName: 'nascimento' })
  public datanascimento: DateTime

  @column({ columnName: 'sexo'})
  public sexo: string[45]

  @column({ columnName: 'raca' })
  public raca: string[45]

  @column({ columnName: 'porte' })
  public porte: string[45]

  @column({ columnName: 'tipoanimal_id' })
  public tipoAnimalId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => TipoAnimal)
  public tipoAnimal: BelongsTo<typeof TipoAnimal> 

  @hasMany(() => Adocao)
  public adocao: HasMany<typeof Adocao>

  @hasMany(() => Doacao)
  public doacao: HasMany<typeof Doacao>

  @manyToMany(() => Caracteristica,{
    localKey: 'id',
    pivotForeignKey: 'animal_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'caracteristica_id',
    pivotTable: 'animal_caracteristica'
  } )
  public caracteristicas: ManyToMany<typeof Caracteristica>

  @manyToMany(() => Imagen, {
    localKey: 'id',
    pivotForeignKey: 'animal_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'imagem_id',
    pivotTable: 'animal_imagens'
  })
  public imagens: ManyToMany<typeof Imagen>

  public get imagemPerfil() {
    console.log(this.imagens)
    if(this.imagens === 0){
      return "/img/404.jpg"
    }
    return this.imagens[0].caminho
  }

  public get idade() {
    const nascimento = 
      (typeof this.datanascimento === 'string')
        ? DateTime.fromFormat(this.datanascimento, 'yyyy-MM-dd') 
        : this.datanascimento
    
    console.log(nascimento);
    return Math.floor(DateTime.now().diff(nascimento, 'years').years)
  }
}
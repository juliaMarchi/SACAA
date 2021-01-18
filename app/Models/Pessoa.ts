/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Telefone from "App/Models/Telefone"
import Caracteristica from 'App/Models/Caracteristica'

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true, columnName: 'idPessoa' })
  public idPessoa: number

  @column({ columnName: 'nome' })
  public nome: string[100]

  @column({ columnName: 'cpf' })
  public cpf: string

  @column({ columnName: 'cnpj' })
  public cnpj: string

  @column.date({ columnName: 'nascimento' })
  public nascimento: DateTime

  @column({ columnName: 'ong' })
  public ong: boolean

  @column({ columnName: 'cep' })
  public cep: string

  @column({ columnName: 'estado' })
  public estado: string[100]

  @column({ columnName: 'cidade' })
  public cidade: string[250]

  @column({ columnName: 'bairro' })
  public bairro: string[40]

  @column({ columnName: 'rua' })
  public rua: string[250]

  @column({ columnName: 'numero' })
  public numero: number

  @column({ columnName: 'complemento' })
  public complemento: string[250]

  @column({ columnName: 'enderecoFoto' })
  public enderecoFoto: string[300]

  @column({ columnName: 'email' })
  public email: string[450]

  @column({ columnName: 'senha' })
  public senha: string[45]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Telefone, {foreignKey:'idPessoa'})
  public telefones: HasMany<typeof Telefone>

  @manyToMany(() => Caracteristica,{
    localKey: 'idPessoa',
    pivotForeignKey: 'idPessoa',
    relatedKey: 'idCaracteristica',
    pivotRelatedForeignKey: 'idCaracteristica',
    pivotTable: 'pessoa_caracteristica'
  } )
  public caracteristicas: ManyToMany<typeof Caracteristica>

  getTelefone1(){
    return this.telefones.entries[0];
  }
  getTelefone2(){
    return this.telefones.entries[1];
  }
}

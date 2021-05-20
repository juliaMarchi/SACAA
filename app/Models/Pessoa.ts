/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, ManyToMany, manyToMany, beforeSave } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

import Telefone from "App/Models/Telefone"
import Caracteristica from 'App/Models/Caracteristica'
import Adocao from 'App/Models/Adocao'
import Doacao from 'App/Models/Doacao'

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  public id: number

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

  @column({ columnName: 'password' })
  public password: string[45]

  @column({ columnName: 'remember_me_token' })
  public rememberMeToken: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Telefone, {foreignKey:'id'})
  public telefones: HasMany<typeof Telefone>

  @manyToMany(() => Caracteristica,{
    localKey: 'id',
    pivotForeignKey: 'pessoa_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'caracteristica_id',
    pivotTable: 'pessoa_caracteristica'
  } )
  public caracteristicas: ManyToMany<typeof Caracteristica>

  getTelefone1(){
    return this.telefones.entries[0];
  }
  getTelefone2(){
    return this.telefones.entries[1];
  }

  @hasMany(() => Adocao)
  public adocao: HasMany<typeof Adocao>

  @hasMany(() => Doacao)
  public doacao: HasMany<typeof Doacao>


  @beforeSave()
  public static async hashPassword (pessoa: Pessoa) {
    if (pessoa.$dirty.password) {
      pessoa.password = await Hash.make(pessoa.password)
    }
  }

}

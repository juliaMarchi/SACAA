import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Pessoa extends BaseModel {
  @column({ isPrimary: true, columnName: 'idPessoa' })
  public idPessoa: number

  @column({ columnName: 'nome' })
  public nome: string[100]

  @column({ columnName: 'cpf' })
  public cpf: number

  @column({ columnName: 'cnpj' })
  public cnpj: number

  @column.date({ columnName: 'nascimento' })
  public nascimento: DateTime

  @column({ columnName: 'ong' })
  public ong: boolean

  @column({ columnName: 'cep' })
  public cep: number

  @column({ columnName: 'estado' })
  public estado: string[100]

  @column({ columnName: 'cidade' })
  public cidade: string[250]

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
}

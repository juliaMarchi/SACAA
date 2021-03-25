/* eslint-disable prettier/prettier */
import Factory from '@ioc:Adonis/Lucid/Factory'
import Pessoa from 'App/Models/Pessoa'
import { DateTime, Zone } from 'luxon';

export const PessoaFactory = Factory
    .define(Pessoa, ({ faker }) => ({
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        cpf: '000.000.000-00',
        cnpj: '',
        cep: '00000-00',
        cidade: 'Curtiba',
        bairro: 'Batel',
        complemento: 'Perto do Shopping',
        estado: 'Paraná',
        rua: 'Rua dona Mariquinha',
        ong: false,
        numero: faker.random.number(300),
        nascimento: DateTime.local().setZone('utc'),
        password: 'secret123',
        enderecoFoto: '',
    }))
    .build();
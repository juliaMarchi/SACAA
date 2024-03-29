import Env from '@ioc:Adonis/Core/Env'
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Application.tmpPath('db.sqlite3'),
      },
      useNullAsDefault: true,
      healthCheck: true,
			debug: false,
    },
    mysql: {
      client: 'mysql',
      connection: {
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD'),
        database: Env.get('MYSQL_DB_NAME', ''),
      },
      healthCheck: false,
      debug: false,
    },
  },

  orm: {},
}

export default databaseConfig

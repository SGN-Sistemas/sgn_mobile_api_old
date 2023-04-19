import 'dotenv/config'

import { DataSource } from 'typeorm'
import 'reflect-metadata'

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: '192.168.102.195',
  username: 'sa',
  password: 'sgn123',
  database: '2A',
  synchronize: true,
  logging: true,
  extra: {
    encrypt: false,
    trustServerCertificate: true
  },
  entities: ['./src/typeorm/entities/*.ts'],
  migrations: ['./src/typeorm/migrations/*.ts']
})

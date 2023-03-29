import { DataSource } from 'typeorm'
import 'reflect-metadata'
import { config } from 'dotenv'

config()

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.SERVER,
  username: 'sa',
  password: process.env.PASSWORDDB,
  database: process.env.DATABASEDB,
  synchronize: true,
  logging: false,
  extra: {
    encrypt: false,
    trustServerCertificate: true
  },
  entities: [
    './src/typeorm/entities/*.ts'
  ],
  migrations: [
    './src/typeorm/migrations/*.ts'
  ]
})

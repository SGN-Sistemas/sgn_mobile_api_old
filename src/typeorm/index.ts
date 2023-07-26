/* eslint-disable n/no-path-concat */
import { DataSource } from 'typeorm'
import 'reflect-metadata'
import { config } from 'dotenv'
config()

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.SERVER,
  username: process.env.USERDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASEDB,
  synchronize: true,
  requestTimeout: 60_000,
  logging: false,
  extra: {
    encrypt: false,
    trustServerCertificate: true
  },
  entities: [`${__dirname}/entities/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`]
})

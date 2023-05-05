/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import 'express-async-errors'
import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'
import { AppDataSource } from './typeorm/index'

import AppError from './errors/AppError'
import dotenv from 'dotenv'
import { routerV1 } from './routes/v1/index.routes'

dotenv.config()

AppDataSource.initialize().then(() => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        error: error.message,
        status: error.statusCode
      })
    }
    return res.status(500).json({
      status: 'error',
      message: 'Internal server'
    })
  })
  app.use('/v1', routerV1)

  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`RODANDO NA PORTA ${port}`)
  })
})

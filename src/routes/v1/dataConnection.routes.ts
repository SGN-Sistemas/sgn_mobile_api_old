import express from 'express'
import { DataConnectionControllers } from '../../controllers/dataConnection'

export const routerDataConnection = express.Router()

const dataConnectionControllers = new DataConnectionControllers()

routerDataConnection.get('/:cnpj', dataConnectionControllers.list)

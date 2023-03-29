import express from 'express'
import { UpdateController } from '../../controllers/updateControllers'

export const routerUpdate = express.Router()

const updateController = new UpdateController()

routerUpdate.get('/:platform/:version', updateController.verify)

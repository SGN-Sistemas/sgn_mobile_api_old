import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { ScheduleControllers } from '../../controllers/scheduleControllers'

export const routerSchedule = express.Router()

const scheduleControllers = new ScheduleControllers()

routerSchedule.get('/', isAuthenticatedAcess, scheduleControllers.list)

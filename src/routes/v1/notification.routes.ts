import express from 'express'
import NotificationControllers from '../../controllers/notification'

export const routerNotification = express.Router()

const notificationControllers = new NotificationControllers()

routerNotification.get('/:cod/:tipo', notificationControllers.sendNotificationPush)

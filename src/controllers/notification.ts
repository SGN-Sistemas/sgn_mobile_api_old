import { Request, Response } from 'express'
import SendNotificationPush from '../services/notification/sendNotification'

export default class NotificationControllers {
  public async sendNotificationPush (request: Request, response: Response): Promise<Response> {
    const {
      cod,
      tipo
    } = request.params

    const sendNotificationPush = new SendNotificationPush()

    const sendNotificationPushExec = await sendNotificationPush.execute(cod, tipo, request.database)

    return response.status(sendNotificationPushExec.status).json(sendNotificationPushExec)
  }
}

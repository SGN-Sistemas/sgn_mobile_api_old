/* eslint-disable @typescript-eslint/no-explicit-any */
import { Expo, ExpoPushMessage } from 'expo-server-sdk'
export const sendNotification = (tokenExpo: string, cod: string, tipo: string) => {
  const expo = new Expo()
  const messages: ExpoPushMessage[] = []
  const somePushTokens = []
  somePushTokens.push(tokenExpo)
  for (const pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`)
      continue
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      body: `Nova ${tipo} para poder ser aprovado ${cod}`
    })
  }

  const chunks = expo.chunkPushNotifications(messages)
  const tickets:any = [];
  (async () => {
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk)
        console.log(ticketChunk)
        tickets.push(...ticketChunk)
      } catch (error) {
        console.error(error)
      }
    }
  })()
}

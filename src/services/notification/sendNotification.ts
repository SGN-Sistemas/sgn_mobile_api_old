import { queryPegaTokenUserSoco } from '../../queries/purchaseOrder'
import { queryPegaTokenUserSql } from '../../queries/request'
import { queryPegaTokenUserCocs } from '../../queries/serviceContract'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { sendNotification } from '../../utils/sendNotification'

interface IResponse {
  message: string;
  status: number;
}

class SendNotificationPush {
  public async execute (cod: string, tipo: string): Promise<IResponse> {
    try {
      if (tipo === 'pedido') {
        const queryPegaTokenUserQuery = queryPegaTokenUserSql(cod)
        const queryPegaTokenUserData = await UsuarioRepository.query(queryPegaTokenUserQuery)
        if (queryPegaTokenUserData[0]) {
          if (queryPegaTokenUserData[0].EXPO_TOKEN_1) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_1, cod, tipo)
          }
          if (queryPegaTokenUserData[0].EXPO_TOKEN_2) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_2, cod, tipo)
          }
          if (queryPegaTokenUserData[0].EXPO_TOKEN_3) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_3, cod, tipo)
          }
          if (queryPegaTokenUserData[0].EXPO_TOKEN_4) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_4, cod, tipo)
          }
          return ({
            message: 'Enviada com sucesso',
            status: 200
          })
        }
      }
      if (tipo === 'solictação') {
        const queryPegaTokenUserQuery = queryPegaTokenUserSoco(cod)
        const queryPegaTokenUserData = await UsuarioRepository.query(queryPegaTokenUserQuery)
        if (queryPegaTokenUserData[0]) {
          if (queryPegaTokenUserData[0].EXPO_TOKEN_1) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_1, cod, tipo)
          }
          if (queryPegaTokenUserData[0].EXPO_TOKEN_2) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_2, cod, tipo)
          }

          return ({
            message: 'Enviada com sucesso',
            status: 200
          })
        }
      }
      if (tipo === 'contrato serviço') {
        const queryPegaTokenUserQuery = queryPegaTokenUserCocs(cod)
        const queryPegaTokenUserData = await UsuarioRepository.query(queryPegaTokenUserQuery)
        if (queryPegaTokenUserData[0]) {
          if (queryPegaTokenUserData[0].EXPO_TOKEN_1) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_1, cod, tipo)
          }
          if (queryPegaTokenUserData[0].EXPO_TOKEN_2) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_2, cod, tipo)
          }
          if (queryPegaTokenUserData[0].EXPO_TOKEN_3) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_3, cod, tipo)
          }
          if (queryPegaTokenUserData[0].EXPO_TOKEN_4) {
            sendNotification(queryPegaTokenUserData[0].EXPO_TOKEN_4, cod, tipo)
          }
          return ({
            message: 'Enviada com sucesso',
            status: 200
          })
        }
      }
      return ({
        message: 'Error',
        status: 400
      })
    } catch (error) {
      return ({
        message: `Error ${error}`,
        status: 400
      })
    }
  }
}

export default SendNotificationPush

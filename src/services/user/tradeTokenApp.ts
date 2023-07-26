import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'

interface Itrade{
    USUA_SIGLA: string,
    USUA_APP_TOKEN: string,
    database: string
}

interface IReturn {
  message: string,
  error: boolean,
  status: number,
}

export class TradeTokenAppService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_APP_TOKEN,
      database

    }: Itrade
  ): Promise<IReturn> {
    try {
      await UsuarioRepository.query(`
        USE [${database}]
        UPDATE
          USUARIO
        SET
          USUA_APP_TOKEN = '${USUA_APP_TOKEN}'
        WHERE
          USUA_SIGLA = '${USUA_SIGLA}'
      `)

      return {
        message: 'Token adicionado com sucesso ',
        error: false,
        status: 200
      }
    } catch (e) {
      return {
        message: 'Internal server error: ' + e,
        error: false,
        status: 500
      }
    }
  }
}

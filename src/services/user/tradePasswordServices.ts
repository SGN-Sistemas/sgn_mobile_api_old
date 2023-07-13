import bcrypt from 'bcrypt'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { verifyUserSignUp } from '../../utils/verifyUser'

interface Itrade{
  USUA_SIGLA: string;
  USUA_SENHA_APP: string;
  DATABASE: string;
}

interface IReturn {
  message: string,
  error: boolean,
  status: number,
}

export class TradePasswordService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_SENHA_APP,
      DATABASE
    } : Itrade
  ): Promise<IReturn> {
    try {
      const {
        message,
        error,
        status
      } = await verifyUserSignUp(USUA_SIGLA, USUA_SENHA_APP, DATABASE)

      if (error) {
        return {
          message,
          error,
          status
        }
      }

      const saltRounds = 2
      const passwordHash = await bcrypt.hash(USUA_SENHA_APP, saltRounds)

      await UsuarioRepository.query(`
        USE [${DATABASE}]
        UPDATE
          USUARIO
        SET
          USUA_SENHA_APP = '${passwordHash}'
        WHERE 
          USUA_SIGLA = '${USUA_SIGLA}'
      `)

      return {
        message: 'Senha trocada com sucesso ',
        error: false,
        status: 200
      }
    } catch (e) {
      return {
        message: 'Error' + e,
        error: true,
        status: 500
      }
    }
  }
}

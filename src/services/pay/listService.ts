import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectTrpg } from '../../queries/pay'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListPayService {
  public async execute (TOKEN: string, queryString: string): Promise<IPromise> {
    try {
      const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

      const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

      const cod = decodeToken.codUser

      const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: parseInt(cod) })

      if (!existsUser) {
        return {
          error: true,
          message: 'Usuario não existe',
          status: 400
        }
      }

      const autorizacaoCount = await UsuarioRepository.query(`
        SELECT
          PAGE_NUM_AUTORIZACOES
        FROM
          PARAMETROS_GERAIS
      `)

      const selectSql = selectTrpg(cod.toString(), autorizacaoCount[0].PAGE_NUM_AUTORIZACOES, queryString)
      console.log('====================================')
      console.log(selectSql)
      console.log('====================================')
      const querySelect = await UsuarioRepository.query(selectSql)

      return {
        error: false,
        message: querySelect,
        status: 200
      }
    } catch (e) {
      return {
        error: true,
        message: `Erro ${e}`,
        status: 500
      }
    }
  }
}

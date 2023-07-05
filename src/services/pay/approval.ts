import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { approvalTrpp } from '../../queries/pay'
import bcrypt from 'bcrypt'

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

export class ApprovalPayService {
  public async execute (TOKEN: string, trppCod: string, cereCod: string, valor: number, password: string): Promise<IPromise> {
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
      console.log('====================================')
      console.log(existsUser.USUA_SENHA_APP)
      console.log('====================================')
      const passwordBD = existsUser.USUA_SENHA_APP

      const comparePassword = await bcrypt.compare(password, passwordBD)

      if (!comparePassword) {
        return ({
          message: 'Senha incorreta',
          error: true,
          status: 400
        })
      }

      const autorizacaoCount = await UsuarioRepository.query(`
        SELECT
          (
            SELECT
                COUNT(RETU_DATA)
            FROM
               REL_TRPP_USUA
            WHERE
                RETU_TRPP_COD = ${trppCod}
            AND
                RETU_USUA_COD = ${cod}
          ) as countTrppUsua,
          PAGE_NUM_AUTORIZACOES
        FROM
          PARAMETROS_GERAIS
      `)

      if (
        Number(autorizacaoCount[0].PAGE_NUM_AUTORIZACOES) === Number(autorizacaoCount[0].countTrppUsua)
      ) {
        return {
          error: false,
          message: 'Parcela já autorizada',
          status: 200
        }
      }

      const selectValAprovAutoriza = await UsuarioRepository.query(
        `
          SELECT
            USCR_VALOR_MAXIMO,
            USCR_AUTORIZA
          FROM
            USUARIO_CR
          WHERE
            USCR_USUA_COD = ${cod}
          AND
            USCR_CERE_COD = ${cereCod}
        `
      )

      console.log('====================================')
      console.log(`          SELECT
            USCR_VALOR_MAXIMO,
            USCR_AUTORIZA
          FROM
            USUARIO_CR
          WHERE
            USCR_USUA_COD = ${cod}
          AND
            USCR_CERE_COD = ${cereCod}`)
      console.log('====================================')

      if (selectValAprovAutoriza[0].USCR_AUTORIZA === 'N') {
        return {
          error: false,
          message: `Transação ${trppCod} - Usuario não é aprovador`,
          status: 200
        }
      }

      if (selectValAprovAutoriza[0].USCR_VALOR_MAXIMO < valor) {
        return {
          error: false,
          message: `Transação ${trppCod} - usuario não pode aprovar um valor tão alto`,
          status: 200
        }
      }

      const queryApproval = approvalTrpp(cod, trppCod)

      await UsuarioRepository.query(queryApproval)

      return {
        error: false,
        message: `Transação ${trppCod} - aprovada com sucesso`,
        status: 200
      }
    } catch (e) {
      return {
        error: true,
        message: `Transação ${trppCod} - não pode ser aprovada ${e}`,
        status: 500
      }
    }
  }
}

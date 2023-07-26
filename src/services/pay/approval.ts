import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { approvalTrpp } from '../../queries/pay'
import { verifyUserApproval } from '../../utils/verifyUser'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ApprovalPayService {
  public async execute (sigla: string, trppCod: string, cereCod: string, valor: number, password: string, database: string): Promise<IPromise> {
    try {
      const {
        message,
        error,
        status,
        userCod
      } = await verifyUserApproval(sigla, password, database)

      if (error) {
        console.log('====================================')
        console.log(
          {
            message,
            error,
            status
          }
        )
        console.log('====================================')
        return ({
          message,
          error,
          status
        })
      }

      const autorizacaoCount = await UsuarioRepository.query(`
        USE [${database}]
        SELECT
          (
            SELECT
                COUNT(RETU_DATA)
            FROM
               REL_TRPP_USUA
            WHERE
                RETU_TRPP_COD = ${trppCod}
            AND
                RETU_USUA_COD = ${userCod}
          ) as countTrppUsua,
          PAGE_NUM_AUTORIZACOES
        FROM
          PARAMETROS_GERAIS
      `)

      if (
        Number(autorizacaoCount[0].PAGE_NUM_AUTORIZACOES) === Number(autorizacaoCount[0].countTrppUsua)
      ) {
        return {
          error: true,
          message: 'Parcela já autorizada',
          status: 403
        }
      }

      const selectValAprovAutoriza = await UsuarioRepository.query(
        `
          USE [${database}]
          SELECT
            USCR_VALOR_MAXIMO,
            USCR_AUTORIZA
          FROM
            USUARIO_CR
          WHERE
            USCR_USUA_COD = ${userCod}
          AND
            USCR_CERE_COD = ${cereCod}
        `
      )

      if (selectValAprovAutoriza[0].USCR_AUTORIZA === 'N') {
        return {
          error: true,
          message: `Transação ${trppCod} - Usuario não é aprovador`,
          status: 403
        }
      }

      if (selectValAprovAutoriza[0].USCR_VALOR_MAXIMO < valor) {
        return {
          error: true,
          message: `Transação ${trppCod} - usuario não pode aprovar um valor tão alto`,
          status: 403
        }
      }

      const queryApproval = approvalTrpp(userCod + '', trppCod, database)

      await UsuarioRepository.query(queryApproval)

      return {
        error: false,
        message: `Transação ${trppCod} - aprovada com sucesso`,
        status: 200
      }
    } catch (e) {
      return {
        error: true,
        message: `Internal Server Error: ${e}`,
        status: 500
      }
    }
  }
}

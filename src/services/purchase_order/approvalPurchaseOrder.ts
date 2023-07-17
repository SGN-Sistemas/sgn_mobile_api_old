import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { countNumAprovaSoliCompra, updateASSSolicitacao } from '../../queries/purchaseOrder'
import { verifyUserApproval } from '../../utils/verifyUser'

interface IResponse {
    message: string,
    error: boolean,
    status: number,
}

export class ApprovalPurchaseOrderService {
  public async execute (sigla: string, password: string, posUsuaCod: string, socoCod: string, valorTotalSoco: number, database: string): Promise<IResponse> {
    try {
      const {
        // eslint-disable-next-line camelcase
        usua_valor_aprov_solic,
        error,
        message,
        status
      } = await verifyUserApproval(sigla, password, database)

      if (error) {
        return ({
          message,
          error,
          status
        })
      }

      if (Number(usua_valor_aprov_solic) < valorTotalSoco) {
        return ({
          message: 'Úsuario não pode aprovar um valor tão alto',
          error: true,
          status: 403
        })
      }

      const sqlContNumAprovaS = countNumAprovaSoliCompra(socoCod)

      const countNumAprovaS = await PedidoEstoqueRepository.query(sqlContNumAprovaS)

      const sqlAprovaNumPage = await PedidoEstoqueRepository.query(`
    USE [${database}]
    SELECT 
      page_num_aprovacoes_solic,
      page_todas_aprovacoes_solic
    FROM 
      PARAMETROS_GERAIS
    `)

      let statusSQL = ''

      if (sqlAprovaNumPage[0].page_todas_aprovacoes_solic === 'S') {
        if (sqlAprovaNumPage[0].page_num_aprovacoes_solic === 1) {
          statusSQL = "SOCO_STATUS = 'AP',"
        } else if (sqlAprovaNumPage[0].page_num_aprovacoes_solic === 2 && countNumAprovaS[0].NUM === 1) {
          statusSQL = "SOCO_STATUS = 'AP',"
        }
      } else {
        statusSQL = "SOCO_STATUS = 'AP',"
      }

      const sql = updateASSSolicitacao(socoCod, posUsuaCod, statusSQL, database)

      await PedidoEstoqueRepository.query(sql)
      return ({
        message: 'Solicitação aprovada com sucesso',
        error: false,
        status: 200
      })
    } catch (e) {
      return ({
        message: 'Internal Server Error',
        error: true,
        status: 500
      })
    }
  }
}

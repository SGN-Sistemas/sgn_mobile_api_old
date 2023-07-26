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
    console.log('====================================')
    console.log(database)
    console.log('====================================')
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

      const sqlContNumAprovaS = countNumAprovaSoliCompra(socoCod, database)
      console.log('====================================')
      console.log(sqlContNumAprovaS)
      console.log('====================================')
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
      console.log('====================================')
      console.log(database)
      console.log('====================================')
      await PedidoEstoqueRepository.query(sql)
      return ({
        message: `Solicitação ${socoCod} aprovada com sucesso`,
        error: false,
        status: 200
      })
    } catch (e) {
      return ({
        message: 'Internal Server Error' + e,
        error: true,
        status: 500
      })
    }
  }
}

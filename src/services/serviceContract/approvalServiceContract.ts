import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { attContratoCompraServico, countNumAprov } from '../../queries/serviceContract'
import { verifyUserApproval } from '../../utils/verifyUser'

interface ICocsResponse {
    status: number;
    message: string;
    erro: boolean;
}

export class ApprovalServiceContract {
  public async execute (sigla: string, ass: string, codCocs: string, password:string, valTotal: string, database: string): Promise<ICocsResponse> {
    try {
      const {
        error,
        message,
        status,
        USUA_VALOR_APROVA_CONT_SERV
      } = await verifyUserApproval(sigla, password, database)

      if (error) {
        return ({
          message,
          erro: error,
          status
        })
      }

      if (Number(USUA_VALOR_APROVA_CONT_SERV) < parseFloat(valTotal)) {
        return ({
          message: `Contrato ${codCocs} não pode ser aprovado valor acima do de aprovação do úsuario`,
          erro: true,
          status: 403
        })
      }

      const selectPageNumAprova = await PedidoEstoqueRepository.query(`
      USE [${database}]
      SELECT 
        PAG2_NUM_APROVACOES_CONTR,
        PAG2_TODAS_APROVACOES_CONTR
      FROM 
        PARAMETROS_GERAIS_2
    `)

      const sql = countNumAprov(codCocs, database)

      const selectQtdAprova = await PedidoEstoqueRepository.query(sql)

      let statusSQL = ''

      if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_CONTR === 'S') {
        if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 1) {
          statusSQL = "COCS_STATUS = 'AP',"
        } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 2 && selectQtdAprova[0].NUM === 1) {
          statusSQL = "COCS_STATUS = 'AP',"
        } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 3 && selectQtdAprova[0].NUM === 2) {
          statusSQL = "COCS_STATUS = 'AP',"
        } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 4 && selectQtdAprova[0].NUM === 3) {
          statusSQL = "COCS_STATUS = 'AP',"
        }
      } else {
        statusSQL = "COCS_STATUS = 'AP',"
      }

      const sql2 = attContratoCompraServico(codCocs, ass, statusSQL, database)
      await PedidoEstoqueRepository.query(
        sql2
      )
      return {
        status: 200,
        message: `Contrato ${codCocs} aprovado com sucesso`,
        erro: false
      }
    } catch (e) {
      return ({
        message: 'Internal server error' + e,
        erro: true,
        status: 500
      })
    }
  }
}

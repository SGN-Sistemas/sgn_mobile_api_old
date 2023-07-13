import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import dotenv from 'dotenv'
import { countNumAprovAditivoContratoPR, updatePRCS } from '../../queries/contratctAdditiveTerm'
import { verifyUserLogin } from '../../utils/verifyUser'
dotenv.config()

interface IAdcsResponse {
    status: number;
    message: string;
    error: boolean;
}

export class ApprovalContractAdditiveTerm {
  public async execute (cod: string, ass: string, codCocs: string, password: string, database: string): Promise<IAdcsResponse> {
    try {
      const {
        message,
        error,
        status
      } = await verifyUserLogin(cod, password, database)

      if (error) {
        return ({
          message,
          error,
          status
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

      const sql = countNumAprovAditivoContratoPR(codCocs, database)

      const selectQtdAprova = await PedidoEstoqueRepository.query(sql)

      let statusSQL = ''

      if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_CONTR === 'S') {
        if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 1) {
          statusSQL = ",PRCS_APROVADO = 'S'"
        } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 2 && selectQtdAprova[0].NUM === 1) {
          statusSQL = ",PRCS_APROVADO = 'S'"
        } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 3 && selectQtdAprova[0].NUM === 2) {
          statusSQL = ",PRCS_APROVADO = 'S'"
        } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 4 && selectQtdAprova[0].NUM === 3) {
          statusSQL = ",PRCS_APROVADO = 'S'"
        }
      } else {
        statusSQL = ",PRCS_APROVADO = 'S'"
      }

      const sql2 = updatePRCS(ass, codCocs, statusSQL, database)

      await PedidoEstoqueRepository.query(
        sql2
      )

      return {
        status: 200,
        message: `Aditivo de contrato ${codCocs} aprovado com sucesso`,
        error: false
      }
    } catch (e) {
      return ({
        message: 'Internal server error',
        error: true,
        status: 500
      })
    }
  }
}

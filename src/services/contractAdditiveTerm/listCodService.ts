import { selectPrazoContratoServico1, selectPrazoContratoServico2, selectPrazoContratoServico3, selectPrazoContratoServico4 } from '../../queries/contratctAdditiveTerm'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'

interface IPrcs {
  PRCS_COCS_COD: string,
  PRCS_COD: string,
  PRCS_DATA_INI: string,
  FORN_NOME: string,
  PRCS_DATA_CADASTRO: string,
  PRCS_DATA_FIM: string,
  PRCS_OBS: string,
  PRCS_NUMERO: string,
  ASS: string
}

interface IReturnResponse {
  message: IPrcs[] | string;
  status: number;
  error: boolean;
}

export class ListServiceCodContractAdditiveTerm {
  public async execute (cod: string, PRCS_COCS_COD: string, database: string): Promise<IReturnResponse> {
    try {
      const queryString = `
      AND 
        PRCS_COCS_COD = ${PRCS_COCS_COD}
      `

      const sql = selectPrazoContratoServico1(cod + '', queryString, database)
      const sql2 = selectPrazoContratoServico2(cod + '', queryString, database)
      const sql3 = selectPrazoContratoServico3(cod + '', queryString, database)
      const sql4 = selectPrazoContratoServico4(cod + '', queryString, database)

      const array: IPrcs[] = []
      const listContract1 = await PedidoEstoqueRepository.query(sql)
      const listContract2 = await PedidoEstoqueRepository.query(sql2)
      const listContract3 = await PedidoEstoqueRepository.query(sql3)
      const listContract4 = await PedidoEstoqueRepository.query(sql4)

      if (listContract1.length > 0) {
        listContract1.map((pos: IPrcs) => array.push(pos))
      }

      if (listContract2.length > 0) {
        listContract2.map((pos: IPrcs) => array.push(pos))
      }

      if (listContract3.length > 0) {
        listContract3.map((pos: IPrcs) => array.push(pos))
      }

      if (listContract4.length > 0) {
        listContract4.map((pos: IPrcs) => array.push(pos))
      }

      return {
        message: array,
        status: 200,
        error: false
      }
    } catch (e) {
      console.log('====================================')
      console.log(e)
      console.log('====================================')
      return {
        message: 'Internal server error',
        status: 500,
        error: true
      }
    }
  }
}

import { listSoliPlac, listSoliPlacServ } from '../../queries/purchaseWorksheet'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'

interface IRequest {
  SOCO_COD: string;
  MATE_COD: string;
  MATE_DESC: string;
  ALMO_COD: string;
  ALMO_DESC: string;
  SOCO_DTNECE: string;
  SOCO_QTD_NECE: string;
  UNMA_SIGLA: string;
  UNMA_COD: string;
  SOCO_OBS: string;
  MATE_REFERENCIA: string;
  PESS_COD: string;
  PESS_NOME: string;
  SOCO_PLAC_OBS: string;
  SOCO_DTPRAZORESP: string;
  CERE_COD: string;
  CERE: string;
  ITPC: string;
  ITPC_COD: string;
  FORN_NOME: string;
  TIPO: string;
}

export class ListFornPurcahseWorksheet {
  public async execute (placCod: string, database: string) {
    try {
      const sql = listSoliPlac(placCod, database)
      const arraySocoPlac: IRequest[] = []

      const result = await PedidoEstoqueRepository.query(sql)
      if (result.length > 0) {
        result.map((pos:IRequest) => arraySocoPlac.push(pos))
      }

      const sql1 = listSoliPlacServ(placCod, database)

      const result1 = await PedidoEstoqueRepository.query(sql1)
      if (result1.length > 0) {
        result1.map((pos:IRequest) => arraySocoPlac.push(pos))
      }

      return ({
        message: arraySocoPlac,
        status: 200
      })
    } catch (e) {
      return ({
        message: 'Internal server error' + e,
        status: 500
      })
    }
  }
}

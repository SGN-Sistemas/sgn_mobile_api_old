import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectPurchaseWorksheet } from '../../queries/purchaseWorksheet'

interface iArrayPurchaseWorksheet {
    PLAC_SECO_COD: string;
    PLAC_COD: string;
    PLAC_PESS_COD: string;
    PLAC_STATUS: string;
    ASS: string;
    SECO_DESC: string;
    PESS_NOME: string;
}

export class ListPurcahseWorksheet {
  public async execute (cod: string, database: string, queryString: string) {
    try {
      const selectWorksheet = selectPurchaseWorksheet(
        cod,
        '1',
        database,
        queryString,
        `
        AND 
          PLAC_ASSINATURA_1 != 'S'
        `
      )
      const selectWorksheet2 = selectPurchaseWorksheet(
        cod,
        '2',
        database,
        queryString,
        `
        AND 
          PLAC_ASSINATURA_1 = 'S'
        AND 
          PLAC_ASSINATURA_2 !=  'S'
        `
      )

      console.log('====================================')
      console.log(selectWorksheet2)
      console.log('====================================')
      console.log('====================================')
      console.log(selectWorksheet)
      console.log('====================================')
      const selectWorksheetExec = await PedidoEstoqueRepository.query(selectWorksheet)
      const selectWorksheetExec2 = await PedidoEstoqueRepository.query(selectWorksheet2)

      const listPurchaseWorksheet: iArrayPurchaseWorksheet[] = []

      if (selectWorksheetExec.length > 0) {
        selectWorksheetExec.map((pos: iArrayPurchaseWorksheet) => listPurchaseWorksheet.push(pos))
      }
      if (selectWorksheetExec2.length > 0) {
        selectWorksheetExec2.map((pos: iArrayPurchaseWorksheet) => listPurchaseWorksheet.push(pos))
      }

      return ({
        message: listPurchaseWorksheet,
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

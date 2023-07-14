import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectSoliComp1, selectSoliComp2 } from '../../queries/purchaseOrder'

interface IReturnBd {
  SOCO_COD: number,
  SOCO_DTSOLI: string,
  SOCO_OBS: string,
  SOCO_ASSINATURA_1: string,
  SOCO_USUA_COD_ASS_1: number,
  SOCO_NUMERO: string,
  SOCO_QTD_NECE: number,
  SOCO_ALMO_COD: number,
  SOCO_MATE_COD: number,
  ESTO_CUSTO_MEDIO: number,
  valor_total: number,
  ASS: string
}

interface IRequestBD {
  error: boolean,
  message: IReturnBd[] | string,
  status: number
}

export class ListPurchaseOrderService {
  public async execute (cod: string, database: string): Promise<IRequestBD> {
    try {
      const query2 = selectSoliComp2(cod, database)
      const query1 = selectSoliComp1(cod, database)

      const listPurchaseOrder1 = await PedidoEstoqueRepository.query(query1)
      const listPurchaseOrder2 = await PedidoEstoqueRepository.query(query2)

      const orderArray: IReturnBd[] = []

      if (listPurchaseOrder1.length > 0) {
        listPurchaseOrder1.map((pos: IReturnBd) => orderArray.push(pos))
      }

      if (listPurchaseOrder2.length > 0) {
        listPurchaseOrder2.map((pos: IReturnBd) => orderArray.push(pos))
      }

      return {
        error: false,
        message: orderArray,
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

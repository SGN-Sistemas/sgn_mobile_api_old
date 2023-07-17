import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectSoliCompNumero } from '../../queries/purchaseOrder'

interface IRequestBD {
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

interface IResponse {
  message: string | IRequestBD[];
  status: number;
}

export class ListPurchaseOrderNumberService {
  public async execute (cod: string, socoNUMERO: string, database: string): Promise<IResponse> {
    try {
      const query2 = selectSoliCompNumero(cod, socoNUMERO, '1', database)
      const query1 = selectSoliCompNumero(cod, socoNUMERO, '2', database)

      const listPurchaseOrder1 = await PedidoEstoqueRepository.query(query1)
      const listPurchaseOrder2 = await PedidoEstoqueRepository.query(query2)

      const orderArray: IRequestBD[] = []

      if (listPurchaseOrder1.length > 0) {
        listPurchaseOrder1.map((pos: IRequestBD) => orderArray.push(pos))
      }

      if (listPurchaseOrder2.length > 0) {
        listPurchaseOrder2.map((pos: IRequestBD) => orderArray.push(pos))
      }

      return {
        message: orderArray,
        status: 200
      }
    } catch (e) {
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

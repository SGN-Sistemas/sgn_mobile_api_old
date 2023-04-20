import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';
import { selectSoliCompData } from '../../queries/purchaseOrder';


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

export class ListPurchaseOrderDateService {
  public async execute(userId: number, date: string): Promise<IRequestBD[]> {

    const query2 = selectSoliCompData(userId, date, '1');
    const query1 = selectSoliCompData(userId, date, '2');

    const listPurchaseOrder1 = await PedidoEstoqueRepository.query(query1);
    const listPurchaseOrder2 = await PedidoEstoqueRepository.query(query2);

    const orderArray: IRequestBD[] = [];

    if (listPurchaseOrder1.length > 0) {
      listPurchaseOrder1.map((pos: any) => orderArray.push(pos));
    }

    if (listPurchaseOrder2.length > 0) {
      listPurchaseOrder2.map((pos: any) => orderArray.push(pos));
    }

    return orderArray;
  }
}

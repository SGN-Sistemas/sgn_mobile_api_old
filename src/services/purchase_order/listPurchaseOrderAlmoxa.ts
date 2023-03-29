/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectSoliCompAlmoxarifado } from '../../queries/purchaseOrder'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

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

export class ListPurchaseOrderWarehouseService {
  public async execute (token: string, almoDesc:string): Promise<IRequestBD[]> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(token, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const query2 = selectSoliCompAlmoxarifado(cod, almoDesc, '1')
    const query1 = selectSoliCompAlmoxarifado(cod, almoDesc, '2')

    const listPurchaseOrder1 = await PedidoEstoqueRepository.query(query1)
    const listPurchaseOrder2 = await PedidoEstoqueRepository.query(query2)

    const orderArray: IRequestBD[] = []

    if (listPurchaseOrder1.length > 0) {
      listPurchaseOrder1.map((pos: any) => orderArray.push(pos))
    }

    if (listPurchaseOrder2.length > 0) {
      listPurchaseOrder2.map((pos: any) => orderArray.push(pos))
    }

    return orderArray
  }
}

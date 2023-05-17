import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectPurchaseWorksheet } from '../../queries/purchaseWorksheet'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

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
  public async execute (TOKEN: string) {
    try {
      const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

      const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

      const cod = decodeToken.codUser

      const selectWorksheet = selectPurchaseWorksheet(cod, '1')
      console.log('====================================')
      console.log(selectWorksheet)
      console.log('====================================')
      const selectWorksheet2 = selectPurchaseWorksheet(cod, '2')
      console.log('====================================')
      console.log(selectWorksheet2)
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
        message: 'Erro' + e,
        status: 400
      })
    }
  }
}

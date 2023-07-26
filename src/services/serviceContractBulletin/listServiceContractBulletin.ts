import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectBoletim1, selectBoletim2 } from '../../queries/serviceContractBulletin'

interface IBocs {
  BOCS_COD: string,
  FORN_NOME: string,
  BOCS_DATA: string,
  BOCS_DT_INICIO: string,
  BOCS_DT_FIM: string,
  BOCS_STATUS: string,
  BOCS_OBS: string,
  BOCS_USUA_COD_ASS_2: string,
  BOCS_ASSINATURA_2: string,
  BOCS_NUMERO: string,
  BOCS_DT_VENC: string,
  ASS: string,
  QTD: string,
  VAL_UNIT: string,
  val_total: string
}

interface IResponse {
  message: string | IBocs[];
  status: number;
}

export class ServiceContractBulletinService {
  public async execute (cod: string, database: string, queryString: string): Promise<IResponse> {
    try {
      const sql = selectBoletim1(cod, database, queryString)
      const sql2 = selectBoletim2(cod, database, queryString)
      const array: IBocs[] = []
      const listBulletin1 = await PedidoEstoqueRepository.query(sql)
      const listBulletin2 = await PedidoEstoqueRepository.query(sql2)
      if (listBulletin1.length > 0) {
        listBulletin1.map((pos: IBocs) => array.push(pos))
      }

      if (listBulletin2.length > 0) {
        listBulletin2.map((pos: IBocs) => array.push(pos))
      }

      return {
        message: array,
        status: 200
      }
    } catch (err) {
      return {
        message: 'Internal Server Error' + err,
        status: 500
      }
    }
  }
}

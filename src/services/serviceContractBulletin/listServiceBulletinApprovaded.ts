import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectBoletimApprovaded } from '../../queries/serviceContractBulletin'

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

export class ServiceContractBulletinServiceApprovaded {
  public async execute (cod: string, database: string): Promise<IResponse> {
    try {
      const sql = selectBoletimApprovaded(cod, database)

      console.log('====================================')
      console.log(sql)
      console.log('====================================')

      const listBulletin1 = await PedidoEstoqueRepository.query(sql)

      return {
        message: listBulletin1,
        status: 200
      }
    } catch (e) {
      return {
        message: 'Internal server error',
        status: 500
      }
    }
  }
}

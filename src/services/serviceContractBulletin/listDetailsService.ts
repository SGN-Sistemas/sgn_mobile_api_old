import { boletimMedicaoDetalhe } from '../../queries/serviceContractBulletin'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
interface IBcsi {
    BCSI_SERV_COD: string,
    SERV_DESC: string,
    BCSI_BOCS_COD: string,
    BCSI_QUANTIDADEBOCS_DT_INICIO: string,
    BCSI_VLR_UNIT: string,
}

interface IResponse {
  message: string | IBcsi[];
  status: number;
}

export class ListDetailsBulletin {
  public async execute (codBcsi: string, database: string): Promise<IResponse> {
    try {
      const sql = boletimMedicaoDetalhe(codBcsi, database)

      const listBulletin1 = await PedidoEstoqueRepository.query(sql)

      return {
        message: listBulletin1,
        status: 200
      }
    } catch (e) {
      return {
        status: 500,
        message: 'Internal server error'
      }
    }
  }
}

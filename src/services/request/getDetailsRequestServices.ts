import { selectPedidosItemServico } from '../../queries/request'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'

interface IResponse {
  status: number;
  message: string | []
}

export class GetDetailsRequestServices {
  public async execute (PEDI_COD: string, database: string): Promise<IResponse> {
    try {
      const sql = selectPedidosItemServico(PEDI_COD, database)

      const requestItens = await PedidoEstoqueRepository.query(sql)
      return {
        status: 200,
        message: requestItens
      }
    } catch (e) {
      return {
        status: 500,
        message: 'Internal server error'
      }
    }
  }
}

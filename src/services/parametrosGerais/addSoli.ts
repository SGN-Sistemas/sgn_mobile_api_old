import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectPagePag2StartAddPage } from '../../queries/parametrosGerais'

interface IResponse {
    message: [] | string,
    status: number,
    error: boolean
}

export class ListParametros {
  public async execute (database: string): Promise<IResponse> {
    try {
      const sql = selectPagePag2StartAddPage(database)

      const data = await PedidoEstoqueRepository.query(sql)

      return ({
        message: data,
        status: 200,
        error: false
      })
    } catch (e) {
      return ({
        message: e + '',
        status: 500,
        error: true
      })
    }
  }
}

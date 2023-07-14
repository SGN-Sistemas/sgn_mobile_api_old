import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import { selectMovimentDetailsData, selectMovimentDetailsDataAndApl } from '../../queries/movDiaria'

interface IResponse {
  message: string | {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string
  }
  status: number
}

export class DetailsMoivmentService {
  public async execute (cod: string, data: string, aplicacao: string, database: string): Promise<IResponse> {
    try {
      if (aplicacao === '') {
        const sql = selectMovimentDetailsData(cod, data, database)
        const movimentQuery = await MovimentoDiarioRepository.query(sql)

        return movimentQuery
      }

      const sql = selectMovimentDetailsDataAndApl(cod, data, aplicacao, database)

      const movimentQuery = await MovimentoDiarioRepository.query(sql)

      return {
        message: movimentQuery,
        status: 200
      }
    } catch (err) {
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

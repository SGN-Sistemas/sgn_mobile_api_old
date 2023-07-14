import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import { selectMovimentFilterData, selectMovimentFilterDataAndApl } from '../../queries/movDiaria'

interface IResponse {
  message: string | {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string
  };
  status: number;
}

export class FilterDataAndAplMovimentService {
  public async execute (cod: string, dataIni: string, dataFim: string, aplicacao: string, database: string): Promise<IResponse> {
    try {
      if (aplicacao === '') {
        const sql = selectMovimentFilterData(cod, dataIni, dataFim, database)

        const movimentQuery = await MovimentoDiarioRepository.query(sql)

        return movimentQuery
      }
      const sql = selectMovimentFilterDataAndApl(cod, dataIni, dataFim, aplicacao, database)

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

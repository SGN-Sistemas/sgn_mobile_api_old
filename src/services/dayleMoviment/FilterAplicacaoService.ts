import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import { selectMovimentacaoAplicacao } from '../../queries/movDiaria'

interface IResponse {
  status: number;
  message: string | {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
  }
}

export class FilterAplicacao {
  public async execute (cod: string, aplicacao: string, database: string): Promise<IResponse> {
    try {
      const sql = selectMovimentacaoAplicacao(cod, aplicacao, database)
      const movimentQuery = await MovimentoDiarioRepository.query(sql)

      return {
        status: 200,
        message: movimentQuery
      }
    } catch (err) {
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

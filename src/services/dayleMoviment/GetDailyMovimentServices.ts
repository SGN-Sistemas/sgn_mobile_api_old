import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import { selectMovimentacao } from '../../queries/movDiaria'

interface IResponse {
  status: number;
  message: {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string
  } | string;
}

export class GetDailyMovimentServices {
  public async execute (cod: string, database: string): Promise<IResponse> {
    try {
      const sql = selectMovimentacao(cod, database)
      const usersTableMeta = await MovimentoDiarioRepository.query(sql)
      return {
        status: 200,
        message: usersTableMeta
      }
    } catch (e) {
      return {
        status: 500,
        message: 'Internal Server Error '
      }
    }
  }
}

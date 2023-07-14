import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import { selectComboAplicacao } from '../../queries/movDiaria'

interface IResponse{
  status: number,
  messsage: {
    gaco_nome: string
  } | string;
}

export class GetDailyMovimentComboAplicacaoServices {
  public async execute (cod: string, database:string): Promise<IResponse> {
    try {
      const sql = selectComboAplicacao(cod, database)
      const movimentQuery = await MovimentoDiarioRepository.query(sql)
      return {
        status: 200,
        messsage: movimentQuery
      }
    } catch (err) {
      return {
        messsage: 'Internal Server Error',
        status: 500
      }
    }
  }
}

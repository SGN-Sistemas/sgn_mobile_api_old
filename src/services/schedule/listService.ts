import { selectPefiPejuPess } from '../../queries/schedule'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'

interface IPessPefiPeju {
    NOME: string;
    ENDE: string;
    EMAIL: string;
    TELEFONE: string;
}

interface IReturn{
  message: string | IPessPefiPeju[];
  status: number
}

export class ListScheduleService {
  public async execute (database: string): Promise<IReturn> {
    try {
      const sqlSelectPefiPejuPess = selectPefiPejuPess(database)

      const listPefiPejuPess = await PedidoEstoqueRepository.query(sqlSelectPefiPejuPess)
      return {
        message: listPefiPejuPess,
        status: 200
      }
    } catch {
      return {
        message: 'Internal server error',
        status: 500
      }
    }
  }
}

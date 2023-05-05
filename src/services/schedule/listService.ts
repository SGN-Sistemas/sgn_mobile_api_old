import { selectPefiPejuPess } from '../../queries/schedule'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'

interface IPessPefiPeju {
    NOME: string;
    ENDE: string;
    EMAIL: string;
    TELEFONE: string;
}

export class ListScheduleService {
  public async execute ():Promise<IPessPefiPeju[]> {
    const sqlSelectPefiPejuPess = selectPefiPejuPess()

    const listPefiPejuPess = await PedidoEstoqueRepository.query(sqlSelectPefiPejuPess)
    return listPefiPejuPess
  }
}

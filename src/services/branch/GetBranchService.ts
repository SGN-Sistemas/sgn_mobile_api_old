import { searchEmprUsua } from '../../queries/branch'
import { FilialRepository } from '../../typeorm/repository/filialRepositories'

interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
}

export class GetBranchService {
  public async execute (codEmpr: string): Promise<IResponse> {
    const sql = searchEmprUsua(codEmpr)

    const empresaQuery = await FilialRepository.query(sql)

    return empresaQuery
  }
}

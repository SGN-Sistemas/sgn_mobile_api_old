import { EmpresaContaRepository } from '../../typeorm/repository/empresaRepositories'
import { searchEmprUsua } from '../../queries/branch'

interface IResponse {
  status: number,
  message: string | {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
  }
}

export class ListCompanyUserService {
  public async execute (cod: string, database: string): Promise<IResponse> {
    try {
      const sql = searchEmprUsua(cod, database)

      const empresaQuery = await EmpresaContaRepository.query(sql)

      return {
        status: 200,
        message: empresaQuery
      }
    } catch (e) {
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

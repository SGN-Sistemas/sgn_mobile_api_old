import { EmpresaContaRepository } from '../../typeorm/repository/empresaRepositories';
import { searchEmprUsua } from '../../queries/branch';

interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
}

export class ListCompanyUserService {
  public async execute (userId: number): Promise<IResponse> {

    const sql = searchEmprUsua(userId);

    const empresaQuery = await EmpresaContaRepository.query(sql);

    return empresaQuery;
  }
}

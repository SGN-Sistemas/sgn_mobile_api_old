import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories';
import { selectMovimentFilterData, selectMovimentFilterDataAndApl } from '../../queries/movDiaria';
import AppError from '../../errors/AppError';

interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string

}

export class FilterDataAndAplMovimentService {
  public async execute (userSigla: string, dataIni: string, dataFim:string, aplicacao:string): Promise<IResponse> {

    if (!dataIni || !dataFim) {
      throw new AppError('Data is missing');
    }

    if (aplicacao === '') {
      const sql = selectMovimentFilterData(userSigla, dataIni, dataFim);

      const movimentQuery = await MovimentoDiarioRepository.query(sql);

      return movimentQuery;
    }
    const sql = selectMovimentFilterDataAndApl(userSigla, dataIni, dataFim, aplicacao);

    const movimentQuery = await MovimentoDiarioRepository.query(sql);

    return movimentQuery;
  }
}

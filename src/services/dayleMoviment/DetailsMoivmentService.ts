import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories';
import { selectMovimentDetailsData, selectMovimentDetailsDataAndApl } from '../../queries/movDiaria';
import AppError from '../../errors/AppError';


interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string
}

export class DetailsMoivmentService {
  public async execute (userSigla: string, data: string, aplicacao: string): Promise<IResponse> {

    if (!data) {
      throw new AppError('Data is missing');
    }

    if (aplicacao === '') {
      const sql = selectMovimentDetailsData(userSigla, data);
      const movimentQuery = await MovimentoDiarioRepository.query(sql);

      return movimentQuery;
    }

    const sql = selectMovimentDetailsDataAndApl(userSigla, data, aplicacao);

    const movimentQuery = await MovimentoDiarioRepository.query(sql);

    return movimentQuery;
  }
}

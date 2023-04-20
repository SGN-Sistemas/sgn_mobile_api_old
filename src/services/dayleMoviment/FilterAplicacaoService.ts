import 'dotenv/config';
import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories';
import { selectMovimentacaoAplicacao } from '../../queries/movDiaria';
import AppError from '../../errors/AppError';

interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
}

export class FilterAplicacao {
  public async execute (userSigla: string, aplicacao: string): Promise<IResponse> {

    if (!aplicacao) {
      throw new AppError('Data is missing');
    }

    const sql = selectMovimentacaoAplicacao(userSigla, aplicacao);
    const movimentQuery = await MovimentoDiarioRepository.query(sql);

    return movimentQuery;
  }
}

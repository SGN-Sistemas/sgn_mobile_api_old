import 'dotenv/config';
import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories';
import { selectMovimentacao } from '../../queries/movDiaria';
interface IResponse {
  DEBITO: number,
  CREDITO: number,
  SALDO: number,
  DATA: string,
  GACO_NOME:string
}

export class GetDailyMovimentServices {
  public async execute(userSigla: string): Promise<IResponse> {

    const sql = selectMovimentacao(userSigla);

    const usersTableMeta = await MovimentoDiarioRepository.query(sql);
    return usersTableMeta;
  }
}

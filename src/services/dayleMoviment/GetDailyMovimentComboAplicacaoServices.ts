import 'dotenv/config';
import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories';

import { selectComboAplicacao } from '../../queries/movDiaria';


interface IResponse{
  gaco_nome:string
}

export class GetDailyMovimentComboAplicacaoServices {
  public async execute (userSigla: string): Promise<IResponse> {

    const sql = selectComboAplicacao(userSigla);
    const movimentQuery = await MovimentoDiarioRepository.query(sql);
    return movimentQuery;
  }
}

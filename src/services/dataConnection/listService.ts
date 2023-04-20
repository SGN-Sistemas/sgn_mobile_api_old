import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories';

import { selectDataConnectionCompany } from '../../queries/dataConnection';
import AppError from '../../errors/AppError';
interface IPessPefiPeju {
    DACO_COD: string;
    DACO_CNPJ: string;
    DACO_URL: string;
    DAC0_DATABASE: string;
    DACO_NOME: string;
}

interface IResponse {
    message: IPessPefiPeju[] | string;
    error: boolean;
    status: number
}

export class ListDataConnectionService {
  public async execute (cnpj: string): Promise<IResponse> {
    try {
      const sqlSelectDataConnectionCompany = selectDataConnectionCompany(cnpj);

      const listSelectDataConnectionCompany = await MovimentoDiarioRepository.query(sqlSelectDataConnectionCompany);

      if (listSelectDataConnectionCompany[0] === undefined) {
        throw new AppError('CNPJ não cadastrado');
      }

      return {
        message: listSelectDataConnectionCompany[0],
        error: false,
        status: 200
      };
    } catch (e) {
      throw new AppError(e.message);
    }
  }
}

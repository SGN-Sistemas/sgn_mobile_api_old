import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'

import { selectDataConnectionCompany } from '../../queries/dataConnection'
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
      const sqlSelectDataConnectionCompany = selectDataConnectionCompany(cnpj)

      const listSelectDataConnectionCompany = await MovimentoDiarioRepository.query(sqlSelectDataConnectionCompany)
      console.log('====================================')
      console.log(listSelectDataConnectionCompany[0])
      console.log('====================================')
      if (listSelectDataConnectionCompany[0] === undefined) {
        return {
          message: 'CNPJ não cadastrado',
          error: true,
          status: 400
        }
      }

      return {
        message: listSelectDataConnectionCompany[0],
        error: false,
        status: 200
      }
    } catch (e) {
      return {
        message: `Error = ${e}`,
        error: true,
        status: 500
      }
    }
  }
}

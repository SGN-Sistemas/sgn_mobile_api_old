import { FilialRepository } from '../../typeorm/repository/filialRepositories'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListBranchService {
  public async execute (database: string): Promise<IPromise> {
    try {
      const sql = `
      USE [${database}]
      SELECT
        FILI_COD,
        FILI_NOME_FANTASIA
      FROM
        FILIAL
      WHERE
        FILI_IND_BLOQ = 'N'
        
    `
      const branchList = await FilialRepository.query(sql)
      return {
        error: false,
        message: branchList,
        status: 200
      }
    } catch (e) {
      return ({
        error: true,
        message: 'Internal Server Error',
        status: 500
      })
    }
  }
}

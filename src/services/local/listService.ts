import { FilialRepository } from '../../typeorm/repository/filialRepositories'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListLocalService {
  public async execute (database: string): Promise<IPromise> {
    try {
      const sql = `
      USE [${database}]
      SELECT
        LOCA_DESC,
        LOCA_COD
      FROM
        LOCAL
      WHERE
        LOCA_BLOQUEADO = 'N'
        
    `
      const localList = await FilialRepository.query(sql)
      return {
        error: false,
        message: localList,
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

import { FilialRepository } from '../../typeorm/repository/filialRepositories'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListSupplierService {
  public async execute (database: string): Promise<IPromise> {
    try {
      const sql = `
      USE [${database}]
      SELECT
        FORN_NOME,
        FORN_COD
      FROM
        FORNECEDOR
    `
      const supplierList = await FilialRepository.query(sql)
      return {
        error: false,
        message: supplierList,
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

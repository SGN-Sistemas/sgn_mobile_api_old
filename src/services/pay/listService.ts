import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { selectTrpg } from '../../queries/pay'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListPayService {
  public async execute (cod: string, queryString: string, database: string): Promise<IPromise> {
    try {
      const autorizacaoCount = await UsuarioRepository.query(`
        USE [${database}]
        SELECT
          PAGE_NUM_AUTORIZACOES
        FROM
          PARAMETROS_GERAIS
      `)

      const selectSql = selectTrpg(cod, autorizacaoCount[0].PAGE_NUM_AUTORIZACOES, queryString, database)
      console.log('====================================')
      console.log(selectSql)
      console.log('====================================')
      const querySelect = await UsuarioRepository.query(selectSql)

      return {
        error: false,
        message: querySelect,
        status: 200
      }
    } catch (e) {
      return {
        error: true,
        message: `Internal Server Error: ${e}`,
        status: 500
      }
    }
  }
}

import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { selectAllSetorCompras, selectSetorCompraUsua } from '../../queries/setorCompra'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListSectorService {
  public async execute (cod: string, database: string): Promise<IPromise> {
    try {
      const sqlParametro = await UsuarioRepository.query(`
        USE [${database}]
        SELECT 
          PAGE_REL_USUARIO_SETOR_COMPRAS
        FROM
          PARAMETROS_GERAIS
    `)

      if (sqlParametro[0].PAGE_REL_USUARIO_SETOR_COMPRAS === 'S') {
        const setorComprasUsuaSql = selectSetorCompraUsua(cod, database)
        const setorComprasUsuaQuery = await UsuarioRepository.query(setorComprasUsuaSql)
        return {
          error: false,
          message: setorComprasUsuaQuery,
          status: 200
        }
      }
      const setorComprasUsuaSql = selectAllSetorCompras(database)
      const setorComprasUsuaQuery = await UsuarioRepository.query(setorComprasUsuaSql)
      return {
        error: false,
        message: setorComprasUsuaQuery,
        status: 200
      }
    } catch (e) {
      return {
        error: true,
        message: 'Internal server error',
        status: 500
      }
    }
  }
}

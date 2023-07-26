import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { selectAllCrFiliAlmo, selectAllCrFiliAlmoUsua, selectCrForAlmo, selectCrForAlmoUsua } from '../../queries/cr'
import { verifyUsercodWithOutSignUp } from '../../utils/verifyUser'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListCrService {
  public async execute (cod: string, almoCod: string, database: string): Promise<IPromise> {
    try {
      const {
        message,
        error,
        userTipo
      } = await verifyUsercodWithOutSignUp(cod, database)

      if (error) {
        return ({
          error: true,
          message,
          status: 403
        })
      }

      const sqlParametro = await UsuarioRepository.query(`
        USE [${database}]
        SELECT 
          PAGE_COMPRAS_CR_ALMOXARIFADO
        FROM
          PARAMETROS_GERAIS
    `)
      if (userTipo === 'E') {
        if (sqlParametro[0].PAGE_COMPRAS_CR_ALMOXARIFADO === 'S') {
          const selectCrForAlmoSql = selectCrForAlmo(almoCod, database)
          const selectCrForAlmoQuery = await UsuarioRepository.query(selectCrForAlmoSql)
          return ({
            error: false,
            message: selectCrForAlmoQuery,
            status: 200
          })
        }
        const selectAllCrFiliAlmoSql = selectAllCrFiliAlmo(almoCod, database)
        const selectAllCrFiliAlmoQuery = await UsuarioRepository.query(selectAllCrFiliAlmoSql)
        return ({
          error: false,
          message: selectAllCrFiliAlmoQuery,
          status: 200
        })
      }
      if (sqlParametro[0].PAGE_COMPRAS_CR_ALMOXARIFADO === 'S') {
        const selectCrForAlmoUsuaSql = selectCrForAlmoUsua(almoCod, cod, database)
        const selectCrForAlmoUsuaQuery = await UsuarioRepository.query(selectCrForAlmoUsuaSql)
        return ({
          error: false,
          message: selectCrForAlmoUsuaQuery,
          status: 200
        })
      }

      const selectAllCrFiliAlmoUsuaSql = selectAllCrFiliAlmoUsua(almoCod, cod, database)
      const selectAllCrFiliAlmoUsuaQuery = await UsuarioRepository.query(selectAllCrFiliAlmoUsuaSql)
      return {
        error: false,
        message: selectAllCrFiliAlmoUsuaQuery,
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

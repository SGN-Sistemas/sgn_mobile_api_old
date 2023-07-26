import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { sqlPageControleUsuarioCrAlmox } from '../../queries/parametrosGerais'
import { SelectalmoRelUsuario, selectAllAlmo, selectAlmoRelCere } from '../../queries/werehouse'
import { verifyUsercodWithoutPassword } from '../../utils/verifyUser'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListWarehouseService {
  public async execute (cod: string, database: string): Promise<IPromise> {
    try {
      const {
        message,
        error,
        status,
        USUA_TIPO
      } = await verifyUsercodWithoutPassword(cod, database)

      if (error) {
        return ({
          message,
          error,
          status
        })
      }

      const sqlQueryPage = sqlPageControleUsuarioCrAlmox(database)

      const sqlParametro = await UsuarioRepository.query(sqlQueryPage)

      if (sqlParametro[0].PAG2_CONTROLE_USUARIO_CR_ALMOX === 'S') {
        if (USUA_TIPO === 'E') {
          const almoSql = selectAllAlmo(database)
          const dataQueryAlmo = await UsuarioRepository.query(almoSql)
          return {
            error: false,
            message: dataQueryAlmo,
            status: 200
          }
        }
        const almoSql = selectAlmoRelCere(cod, database)
        const dataQueryAlmo = await UsuarioRepository.query(almoSql)
        return {
          error: false,
          message: dataQueryAlmo,
          status: 200
        }
      } else if (sqlParametro[0].PAG2_REL_USUA_ALMOX === 'S') {
        if (USUA_TIPO === 'E') {
          const almoSql = selectAllAlmo(database)
          const dataQueryAlmo = await UsuarioRepository.query(almoSql)
          return {
            error: false,
            message: dataQueryAlmo,
            status: 200
          }
        }
        const almoSql = SelectalmoRelUsuario(cod, database)
        const dataQueryAlmo = await UsuarioRepository.query(almoSql)
        return {
          error: false,
          message: dataQueryAlmo,
          status: 200
        }
      }
      const almoSql = selectAllAlmo(database)
      const dataQueryAlmo = await UsuarioRepository.query(almoSql)
      return {
        error: false,
        message: dataQueryAlmo,
        status: 200
      }
    } catch (e) {
      return ({
        message: 'Internal server error',
        error: true,
        status: 500
      })
    }
  }
}

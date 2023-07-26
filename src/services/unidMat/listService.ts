import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { selectAllUnidMat } from '../../queries/unidMat'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListUnidMatService {
  public async execute (database: string): Promise<IPromise> {
    try {
      const selectAllUnidMatSql = selectAllUnidMat(database)

      const selectAllUnidMatData = await UsuarioRepository.query(selectAllUnidMatSql)

      return {
        error: false,
        message: selectAllUnidMatData,
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

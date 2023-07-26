import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { selectAll } from '../../queries/service'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListServicesService {
  public async execute (database: string): Promise<IPromise> {
    try {
      const sqlServicesAllQuery = selectAll(database)
      const sqlServicesAllData = await UsuarioRepository.query(sqlServicesAllQuery)

      return {
        error: false,
        message: sqlServicesAllData,
        status: 200
      }
    } catch (e) {
      return {
        error: true,
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

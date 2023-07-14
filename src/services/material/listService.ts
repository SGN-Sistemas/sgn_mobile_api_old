import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { sqlMaterialAllDataQuery } from '../../queries/material'

interface IPromise {
    message: string | [],
    status: number
}

export class ListMaterialService {
  public async execute (database: string): Promise<IPromise> {
    try {
      const sqlMaterialAllData = await UsuarioRepository.query(sqlMaterialAllDataQuery(database))

      return {
        message: sqlMaterialAllData,
        status: 200
      }
    } catch (e) {
      return {
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

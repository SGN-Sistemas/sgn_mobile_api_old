import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
interface IPromise {
    error: boolean,
    message: [] | string,
    status: number
}

export class ListUserAprovSoliService {
  public async execute (database: string): Promise<IPromise> {
    try {
      const users = await UsuarioRepository.query(`
        USE [${database}]
        SELECT 
          *
        FROM
          USUARIO
        WHERE 
          USUA_APROVA_SOLIC = 'S'
      `)
      return ({
        message: users,
        error: false,
        status: 200
      })
    } catch (e) {
      return ({
        message: 'Internal  Server Error ' + e,
        error: true,
        status: 500
      })
    }
  }
}

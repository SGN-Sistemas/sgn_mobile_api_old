import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'

export class VerifyModule {
  public async execute (database: string, cod: string) {
    try {
      const modules = await UsuarioRepository.query(`
        USE [${database}]
        SELECT 
            *
        FROM
            USUARIO_APLICACAO_MOBILE
        WHERE
            USAM_USUA_COD = ${cod}
      `)
      console.log('====================================')
      console.log(`
      USE [${database}]
      SELECT 
          *
      FROM
          USUARIO_APLICACAO_MOBILE
      WHERE
          USAM_USUA_COD = ${cod}
    `)
      console.log('====================================')
      return ({
        message: modules,
        status: 200
      })
    } catch (error) {
      return ({
        message: 'Internal Server Error ' + error,
        status: 500
      })
    }
  }
}

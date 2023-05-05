import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectAllCrFiliAlmo, selectAllCrFiliAlmoUsua, selectCrForAlmo, selectCrForAlmoUsua } from '../../queries/cr'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListCrService {
  public async execute (TOKEN: string, almoCod: string): Promise<IPromise> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = decodeToken.codUser

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: parseInt(cod) })

    if (!existsUser) {
      return {
        error: true,
        message: 'Usuario não existe',
        status: 400
      }
    }

    const sqlParametro = await UsuarioRepository.query(`
        SELECT 
          PAGE_COMPRAS_CR_ALMOXARIFADO
        FROM
          PARAMETROS_GERAIS
    `)
    if (existsUser.USUA_TIPO === 'E') {
      if (sqlParametro[0].PAGE_COMPRAS_CR_ALMOXARIFADO === 'S') {
        const selectCrForAlmoSql = selectCrForAlmo(almoCod)
        const selectCrForAlmoQuery = await UsuarioRepository.query(selectCrForAlmoSql)
        return ({
          error: false,
          message: selectCrForAlmoQuery,
          status: 200
        })
      }
      const selectAllCrFiliAlmoSql = selectAllCrFiliAlmo(almoCod)
      const selectAllCrFiliAlmoQuery = await UsuarioRepository.query(selectAllCrFiliAlmoSql)
      return ({
        error: false,
        message: selectAllCrFiliAlmoQuery,
        status: 200
      })
    }
    if (sqlParametro[0].PAGE_COMPRAS_CR_ALMOXARIFADO === 'S') {
      const selectCrForAlmoUsuaSql = selectCrForAlmoUsua(almoCod, cod)
      const selectCrForAlmoUsuaQuery = await UsuarioRepository.query(selectCrForAlmoUsuaSql)
      return ({
        error: false,
        message: selectCrForAlmoUsuaQuery,
        status: 200
      })
    }

    const selectAllCrFiliAlmoUsuaSql = selectAllCrFiliAlmoUsua(almoCod, cod)
    const selectAllCrFiliAlmoUsuaQuery = await UsuarioRepository.query(selectAllCrFiliAlmoUsuaSql)
    return {
      error: false,
      message: selectAllCrFiliAlmoUsuaQuery,
      status: 200
    }
  }
}

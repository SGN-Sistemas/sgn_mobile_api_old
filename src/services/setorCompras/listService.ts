import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectAllSetorCompras, selectSetorCompraUsua } from '../../queries/setorCompra'

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

export class ListSectorService {
  public async execute (TOKEN: string): Promise<IPromise> {
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
          PAGE_REL_USUARIO_SETOR_COMPRAS
        FROM
          PARAMETROS_GERAIS
    `)

    if (sqlParametro[0].PAGE_REL_USUARIO_SETOR_COMPRAS === 'S') {
      const setorComprasUsuaSql = selectSetorCompraUsua(cod)
      const setorComprasUsuaQuery = await UsuarioRepository.query(setorComprasUsuaSql)
      return {
        error: false,
        message: setorComprasUsuaQuery,
        status: 200
      }
    }
    const setorComprasUsuaSql = selectAllSetorCompras()
    const setorComprasUsuaQuery = await UsuarioRepository.query(setorComprasUsuaSql)
    return {
      error: false,
      message: setorComprasUsuaQuery,
      status: 200
    }
  }
}

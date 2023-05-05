import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sqlPageControleUsuarioCrAlmox } from '../../queries/parametrosGerais'
import { SelectalmoRelUsuario, selectAllAlmo, selectAlmoRelCere } from '../../queries/werehouse'

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

export class ListWarehouseService {
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

    const sqlQueryPage = sqlPageControleUsuarioCrAlmox()

    const sqlParametro = await UsuarioRepository.query(sqlQueryPage)

    if (sqlParametro[0].PAG2_CONTROLE_USUARIO_CR_ALMOX === 'S') {
      if (existsUser.USUA_TIPO === 'E') {
        const almoSql = selectAllAlmo()
        const dataQueryAlmo = await UsuarioRepository.query(almoSql)
        return {
          error: false,
          message: dataQueryAlmo,
          status: 200
        }
      }
      const almoSql = selectAlmoRelCere(cod)
      const dataQueryAlmo = await UsuarioRepository.query(almoSql)
      return {
        error: false,
        message: dataQueryAlmo,
        status: 200
      }
    } else if (sqlParametro[0].PAG2_REL_USUA_ALMOX === 'S') {
      if (existsUser.USUA_TIPO === 'E') {
        const almoSql = selectAllAlmo()
        const dataQueryAlmo = await UsuarioRepository.query(almoSql)
        return {
          error: false,
          message: dataQueryAlmo,
          status: 200
        }
      }
      const almoSql = SelectalmoRelUsuario(cod)
      const dataQueryAlmo = await UsuarioRepository.query(almoSql)
      return {
        error: false,
        message: dataQueryAlmo,
        status: 200
      }
    }
    const almoSql = selectAllAlmo()
    const dataQueryAlmo = await UsuarioRepository.query(almoSql)
    return {
      error: false,
      message: dataQueryAlmo,
      status: 200
    }
  }
}

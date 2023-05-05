import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectAllUnidMat } from '../../queries/unidMat'

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

export class ListUnidMatService {
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
    const selectAllUnidMatSql = selectAllUnidMat()

    const selectAllUnidMatData = await UsuarioRepository.query(selectAllUnidMatSql)

    return {
      error: false,
      message: selectAllUnidMatData,
      status: 200
    }
  }
}

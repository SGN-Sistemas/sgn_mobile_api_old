import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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

export class ListMaterialService {
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

    const sqlMaterialAllData = await UsuarioRepository.query(`
      SELECT
        MATE_DESC,
        MATE_SIGLA,
        MATE_COD,
        MATE_UNMA_COD,
        UNMA_DESC,
        UNMA_SIGLA
      FROM
        MATERIAL
      INNER JOIN
        UNID_MAT
      ON
        UNMA_COD = MATE_UNMA_COD
    `)

    return {
      error: false,
      message: sqlMaterialAllData,
      status: 200
    }
  }
}

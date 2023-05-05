import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectForPlgc } from '../../queries/itemPcg'
import { selectLevelRcUser } from '../../queries/userRc'

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

export class ListItemPgcService {
  public async execute (TOKEN: string, plgcCod: string, trcrCod: string, cereCod: string): Promise<IPromise> {
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

    const selectNiacCod = selectLevelRcUser(cereCod, cod)

    const niacCodQuery = await UsuarioRepository.query(selectNiacCod)

    let niacCod = '0'

    if (niacCodQuery[0]) {
      niacCod = niacCodQuery[0].USCR_NIAC_COD_PG
    }

    const selectForPlgcQuery = selectForPlgc(niacCod, trcrCod, plgcCod)

    const itemsPcg = await UsuarioRepository.query(selectForPlgcQuery)

    return {
      error: false,
      message: itemsPcg,
      status: 200
    }
  }
}

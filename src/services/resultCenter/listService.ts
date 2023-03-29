import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectCRUsua } from '../../queries/relUserResultCenter'
import { selectCere } from '../../queries/resultCenter'
dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

interface IPromise {
  error: boolean,
  message: string,
  status: number
}

type IArray = {
  USCR_CERE_COD:string
}

export class ListResultCenterService {
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

    if (existsUser.USUA_TIPO === 'E') {
      const sqlSpecial = await UsuarioRepository.query(`
        SELECT 
          CERE_NOME,
          CERE_SIGLA,
          CERE_PLCG_COD,
          CERE_COD
        FROM
          CENTRO_RESULTADO
      `)
      return {
        error: false,
        message: sqlSpecial,
        status: 200
      }
    }

    const selectCRUsuaQuery = selectCRUsua(cod)

    const verifyCR = await UsuarioRepository.query(selectCRUsuaQuery)

    let cods = ''

    verifyCR.forEach((element: IArray) => {
      if (cods === '') {
        cods = element.USCR_CERE_COD
      } else {
        cods = cods + ',' + element.USCR_CERE_COD
      }
    })

    const selectCereQuery = selectCere(cods, '')

    const resultQueryCereSelect = await UsuarioRepository.query(selectCereQuery)

    return {
      error: false,
      message: resultQueryCereSelect,
      status: 400
    }
  }
}

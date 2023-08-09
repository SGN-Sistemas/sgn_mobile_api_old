import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { selectCRUsua } from '../../queries/relUserResultCenter'
import { selectCere } from '../../queries/resultCenter'
import { verifyUsercodWithoutPassword } from '../../utils/verifyUser'

interface IPromise {
  error: boolean,
  message: string,
  status: number
}

type IArray = {
  USCR_CERE_COD:string
}

export class ListResultCenterService {
  public async execute (cod: string, database: string): Promise<IPromise> {
    try {
      const {
        error,
        message,
        status,
        USUA_TIPO
      } = await verifyUsercodWithoutPassword(cod, database)

      if (error) {
        return {
          error,
          message,
          status
        }
      }

      if (USUA_TIPO === 'E') {
        const sqlSpecial = await UsuarioRepository.query(`
        USE [${database}]
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

      const selectCRUsuaQuery = selectCRUsua(cod, database)

      const verifyCR = await UsuarioRepository.query(selectCRUsuaQuery)

      let cods = '0'

      verifyCR.forEach((element: IArray) => {
        if (cods === '0') {
          cods = element.USCR_CERE_COD
        } else {
          cods = cods + ',' + element.USCR_CERE_COD
        }
      })

      const selectCereQuery = selectCere(cods, '', database)
      console.log('====================================')
      console.log(selectCereQuery)
      console.log('====================================')
      const resultQueryCereSelect = await UsuarioRepository.query(selectCereQuery)

      return {
        error: false,
        message: resultQueryCereSelect,
        status: 200
      }
    } catch (e) {
      return {
        error: true,
        message: 'Internal server error' + e,
        status: 500
      }
    }
  }
}

import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { selectForPlgc } from '../../queries/itemPcg'
import { selectLevelRcUser } from '../../queries/userRc'

interface IPromise {
    error: boolean,
    message: string | [],
    status: number
}

export class ListItemPgcService {
  public async execute (cod: string, plgcCod: string, trcrCod: string, cereCod: string, database: string): Promise<IPromise> {
    try {
      const selectNiacCod = selectLevelRcUser(cereCod, cod, database)

      const niacCodQuery = await UsuarioRepository.query(selectNiacCod)

      let niacCod = '0'

      if (niacCodQuery[0]) {
        niacCod = niacCodQuery[0].USCR_NIAC_COD_PG
      }

      const selectForPlgcQuery = selectForPlgc(niacCod, trcrCod, plgcCod, database)

      const itemsPcg = await UsuarioRepository.query(selectForPlgcQuery)

      return {
        error: false,
        message: itemsPcg,
        status: 200
      }
    } catch (error) {
      return {
        error: true,
        message: 'Internal Server Error',
        status: 500
      }
    }
  }
}

import dotenv from 'dotenv'
import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import jwt from 'jsonwebtoken'
import { selectMovimentDetailsData, selectMovimentDetailsDataAndApl } from '../../queries/movDiaria'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}
interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string,
    GACO_NOME: string
}

export class DetailsMoivmentService {
  public async execute (TOKEN: string, data: string, aplicacao: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const USUA_SIGLA = decodeToken.USUA_SIGLA

    if (aplicacao === '') {
      const sql = selectMovimentDetailsData(USUA_SIGLA, data)
      const movimentQuery = await MovimentoDiarioRepository.query(sql)

      return movimentQuery
    }

    const sql = selectMovimentDetailsDataAndApl(USUA_SIGLA, data, aplicacao)

    const movimentQuery = await MovimentoDiarioRepository.query(sql)

    return movimentQuery
  }
}

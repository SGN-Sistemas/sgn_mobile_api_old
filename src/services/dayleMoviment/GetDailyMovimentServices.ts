import dotenv from 'dotenv'
import { MovimentoDiarioRepository } from '../../typeorm/repository/movimentoDiarioRepositories'
import jwt from 'jsonwebtoken'
import { selectMovimentacao } from '../../queries/movDiaria'

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
  GACO_NOME:string
}

export class GetDailyMovimentServices {
  public async execute (TOKEN: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const USUA_SIGLA = decodeToken.USUA_SIGLA

    const sql = selectMovimentacao(USUA_SIGLA)
    console.log(sql)
    const usersTableMeta = await MovimentoDiarioRepository.query(sql)
    return usersTableMeta
  }
}

import { selectPrazoContratoServico1, selectPrazoContratoServico2, selectPrazoContratoServico3, selectPrazoContratoServico4 } from '../../queries/contratctAdditiveTerm'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import jwt from 'jsonwebtoken'

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

interface IPrcs {
  PRCS_COCS_COD: string,
  PRCS_COD: string,
  PRCS_DATA_INI: string,
  FORN_NOME: string,
  PRCS_DATA_CADASTRO: string,
  PRCS_DATA_FIM: string,
  PRCS_OBS: string,
  PRCS_NUMERO: string,
  ASS: string
}

export class ListServiceCodContractAdditiveTerm {
  public async execute (token: string, PRCS_COCS_COD: string): Promise<IPrcs[]> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(token, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const queryString = `
    AND 
      PRCS_COCS_COD = ${PRCS_COCS_COD}
    `

    const sql = selectPrazoContratoServico1(cod + '', queryString)
    const sql2 = selectPrazoContratoServico2(cod + '', queryString)
    const sql3 = selectPrazoContratoServico3(cod + '', queryString)
    const sql4 = selectPrazoContratoServico4(cod + '', queryString)

    const array: IPrcs[] = []
    const listContract1 = await PedidoEstoqueRepository.query(sql)
    const listContract2 = await PedidoEstoqueRepository.query(sql2)
    const listContract3 = await PedidoEstoqueRepository.query(sql3)
    const listContract4 = await PedidoEstoqueRepository.query(sql4)

    if (listContract1.length > 0) {
      listContract1.map((pos: IPrcs) => array.push(pos))
    }

    if (listContract2.length > 0) {
      listContract2.map((pos: IPrcs) => array.push(pos))
    }

    if (listContract3.length > 0) {
      listContract3.map((pos: IPrcs) => array.push(pos))
    }

    if (listContract4.length > 0) {
      listContract4.map((pos: IPrcs) => array.push(pos))
    }

    return array
  }
}

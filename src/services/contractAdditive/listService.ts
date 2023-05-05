import { selectAditivoContrato1, selectAditivoContrato2, selectAditivoContrato3, selectAditivoContrato4 } from '../../queries/contractAdditive'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import jwt from 'jsonwebtoken'

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

interface IAdcs {
    ADCS_COD: string,
    ADCS_QUANTIDADE: string,
    ADCS_VLR_UNIT: string,
    ADCS_DESC: string,
    ADCS_COCS_COD: string,
    ADCS_APROVADO: string,
    ADCS_SERV_COD: string,
    SERV_COD: string,
    ADCS_DATA_INI: string,
    ADCS_DATA_FIM: string,
    ADCS_OBS: string,
    ADCS_NUMERO: string,
    VALOR_TOTAL: string,
    ASS: string,
}

export class ListServiceContractAdditive {
  public async execute (token: string):Promise<IAdcs[]> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(token, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)
    const sql = selectAditivoContrato1(cod + '', '')
    const sql2 = selectAditivoContrato2(cod + '', '')
    const sql3 = selectAditivoContrato3(cod + '', '')
    const sql4 = selectAditivoContrato4(cod + '', '')

    const array: IAdcs[] = []
    const listContract1 = await PedidoEstoqueRepository.query(sql)
    const listContract2 = await PedidoEstoqueRepository.query(sql2)
    const listContract3 = await PedidoEstoqueRepository.query(sql3)
    const listContract4 = await PedidoEstoqueRepository.query(sql4)

    if (listContract1.length > 0) {
      listContract1.map((pos: IAdcs) => array.push(pos))
    }

    if (listContract2.length > 0) {
      listContract2.map((pos: IAdcs) => array.push(pos))
    }

    if (listContract3.length > 0) {
      listContract3.map((pos: IAdcs) => array.push(pos))
    }

    if (listContract4.length > 0) {
      listContract4.map((pos: IAdcs) => array.push(pos))
    }

    return array
  }
}

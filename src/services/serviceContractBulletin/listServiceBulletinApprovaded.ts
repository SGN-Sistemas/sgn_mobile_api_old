import jwt from 'jsonwebtoken'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectBoletimApprovaded } from '../../queries/serviceContractBulletin'

interface IBocs {
  BOCS_COD: string,
  FORN_NOME: string,
  BOCS_DATA: string,
  BOCS_DT_INICIO: string,
  BOCS_DT_FIM: string,
  BOCS_STATUS: string,
  BOCS_OBS: string,
  BOCS_USUA_COD_ASS_2: string,
  BOCS_ASSINATURA_2: string,
  BOCS_NUMERO: string,
  BOCS_DT_VENC: string,
  ASS: string,
  QTD: string,
  VAL_UNIT: string,
  val_total: string
}

interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}

export class ServiceContractBulletinServiceApprovaded {
  public async execute (token: string): Promise<IBocs[]> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(token, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const sql = selectBoletimApprovaded(cod + '')

    console.log('====================================')
    console.log(sql)
    console.log('====================================')

    const listBulletin1 = await PedidoEstoqueRepository.query(sql)

    return listBulletin1
  }
}

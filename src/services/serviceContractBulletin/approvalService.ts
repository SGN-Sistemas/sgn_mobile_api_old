import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { countNumAprovaBoletim, updateBoletim } from '../../queries/serviceContractBulletin'
dotenv.config()

interface IResponse {
    status: number;
    message: string;
    erro: boolean;
}

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

export class ApprovalBulletinService {
  public async execute (token: string, codBulletin: string, ass: string, password: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(token, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: cod })

    if (!existsUser) {
      return ({
        status: 400,
        message: 'Codigo incorreto',
        erro: true
      })
    }

    const passwordBD = existsUser.USUA_SENHA_APP

    const comparePassword = await bcrypt.compare(password, passwordBD)

    if (!comparePassword) {
      return ({
        message: 'Senha incorreta',
        erro: true,
        status: 400
      })
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      return ({
        message: 'Úsuario bloqueado',
        erro: true,
        status: 400
      })
    }

    let statusSQL = ''

    const sql = countNumAprovaBoletim(codBulletin)

    const countNumAprovaBole = await PedidoEstoqueRepository.query(sql)

    const selectPageNumAprova = await PedidoEstoqueRepository.query(`
       SELECT 
        PAG2_NUM_APROVACOES_BOLETIM,
        PAG2_TODAS_APROVACOES_BOLETIM
      FROM 
        PARAMETROS_GERAIS_2
    `)
    if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_BOLETIM === 'S') {
      if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_BOLETIM === 1) {
        statusSQL = "BOCS_STATUS = 'AP',"
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_BOLETIM === 2 && countNumAprovaBole[0].NUM === 1) {
        statusSQL = "BOCS_STATUS = 'AP',"
      }
    } else {
      statusSQL = "BOCS_STATUS = 'AP',"
    }

    const sqlUpdate = updateBoletim(ass, statusSQL, codBulletin)

    await PedidoEstoqueRepository.query(
      sqlUpdate
    )

    return {
      status: 200,
      message: 'Boletim contrato serviço aprovado ',
      erro: false
    }
  }
}

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import bcrypt from 'bcrypt'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { countNumAprovaPedido, updatePedidoASS } from '../../queries/request'

dotenv.config()

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

interface IResponse{
  message: string,
  error: boolean,
  status: number,
}

export class ApprovalRequestService {
  public async execute (TOKEN: string, USUA_SENHA_APP: string, posUsuaCod: string, pediCod: string, pediNumero: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: cod })

    if (!existsUser) {
      return ({
        message: 'Codigo incorreto',
        error: true,
        status: 400
      })
    }

    const passwordBD = existsUser.USUA_SENHA_APP

    const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD)

    if (!comparePassword) {
      console.log('====================================')
      console.log(1)
      console.log('====================================')
      return ({
        message: 'Senha incorreta',
        error: true,
        status: 400
      })
    }

    let sqlQuery = ''

    const sqlCountNumAprovaPedido = countNumAprovaPedido(pediCod)

    const valCountNumAprovaPedido = await PedidoEstoqueRepository.query(sqlCountNumAprovaPedido)

    const valCountNumAprovaPedidoBD = await PedidoEstoqueRepository.query(
      `
      SELECT 
        PAGE_NUM_APROVACOES_PEDIDO,
        PAGE_TODAS_APROVACOES_PEDIDO
      FROM 
        PARAMETROS_GERAIS
      `
    )

    if (valCountNumAprovaPedidoBD[0].PAGE_TODAS_APROVACOES_PEDIDO === 'S') {
      if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 1) {
        sqlQuery = "PEDI_STATUS = 'A',"
      } else if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 2 && valCountNumAprovaPedido[0].NUM === 1) {
        sqlQuery = "PEDI_STATUS = 'A',"
      } else if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 3 && valCountNumAprovaPedido[0].NUM === 2) {
        sqlQuery = "PEDI_STATUS = 'A',"
      } else if (valCountNumAprovaPedidoBD[0].PAGE_NUM_APROVACOES_PEDIDO === 4 && valCountNumAprovaPedido[0].NUM === 3) {
        sqlQuery = "PEDI_STATUS = 'A',"
      }
    } else {
      sqlQuery = "PEDI_STATUS = 'A',"
    }

    const sql = updatePedidoASS(pediCod, posUsuaCod, sqlQuery)

    await PedidoEstoqueRepository.query(sql)

    return ({
      message: `Pedido ${pediNumero} aprovado com sucesso`,
      error: false,
      status: 200
    })
  }
}

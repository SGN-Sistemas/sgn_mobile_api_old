import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { countNumAprovaPedido, updatePedidoASS } from '../../queries/request'
import { verifyUserApproval } from '../../utils/verifyUser'

interface IResponse{
  message: string,
  error: boolean,
  status: number,
}

export class ApprovalRequestService {
  public async execute (sigla: string, USUA_SENHA_APP: string, posUsuaCod: string, pediCod: string, pediNumero: string, database: string): Promise<IResponse> {
    const {
      error,
      message,
      status
    } = await verifyUserApproval(sigla, USUA_SENHA_APP, database)
    console.log('====================================')
    console.log(error,
      message,
      status)
    console.log('====================================')
    if (error) {
      return ({
        message,
        error,
        status
      })
    }

    let sqlQuery = ''

    const sqlCountNumAprovaPedido = countNumAprovaPedido(pediCod, database)

    const valCountNumAprovaPedido = await PedidoEstoqueRepository.query(sqlCountNumAprovaPedido)

    const valCountNumAprovaPedidoBD = await PedidoEstoqueRepository.query(
      `
      USE [${database}]
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

    const sql = updatePedidoASS(pediCod, posUsuaCod, sqlQuery, database)

    await PedidoEstoqueRepository.query(sql)

    return ({
      message: `Pedido ${pediNumero} aprovado com sucesso`,
      error: false,
      status: 200
    })
  }
}

import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectPedidoEstoque1, selectPedidoEstoque2, selectPedidoEstoque3, selectPedidoEstoque4, selectPedidoEstoqueCere1, selectPedidoEstoqueCere2, selectPedidoEstoqueCere3, selectPedidoEstoqueCere4 } from '../../queries/request'
import { selectUsuaCr } from '../../queries/userResultCenter'
import { selectPag2ContrUsuaSmpCrPedCom } from '../../queries/parametrosGerais'

interface IRequest {
  PEDI_OBS: string,
  PEDI_DESCONTO: string,
  PEDI_STATUS: string,
  PEDI_FRETE: string,
  PEDI_VALOR_APROVADO: string,
  PEDI_VALOR_TOTAL: string,
  PEDI_COD: string,
  PEDI_NUMERO: string,
  FORN_NOME: string,
  PEDI_DATA: string,
  ASS: string,
  EMPR_NOME: string,
  PEDI_FORN_COD: string,
  PEDI_TOTAL_MERC: string,
  PESS_NOME: string,
  VALOR_TOTAL_SERVICO: string,
  VALOR_TOTAL_ITEM: string,
}

interface IResponse {
  status: number,
  message: string | IRequest[];
}

export class ListPedidoService {
  public async execute (cod: string, queryString: string, database: string): Promise<IResponse> {
    try {
      const array: IRequest[] = []
      const selectPag2ContrUsuaSmpCrPedComQuery = selectPag2ContrUsuaSmpCrPedCom(database)

      const selectPag2ContrUsuaSmpCrPedComData = await PedidoEstoqueRepository.query(selectPag2ContrUsuaSmpCrPedComQuery)

      if (selectPag2ContrUsuaSmpCrPedComData[0].PAG2_CONTR_USUA_SMP_CR_PED_COM === 'S') {
        const selectUsuaCrQuery = selectUsuaCr(cod, database)

        const selectUsuaCrDatas = await PedidoEstoqueRepository.query(selectUsuaCrQuery)
        const arrayCere: string[] = []
        let queryStringPese = `
        AND
          PESE_CERE_COD IN(0)
        `
        let queryStringPeit = `
        AND
          PEIT_CERE_COD IN(0)
        `
        if (selectUsuaCrDatas.length > 0) {
          for await (const selectUsuaCrData of selectUsuaCrDatas) {
            arrayCere.push(selectUsuaCrData.USCR_CERE_COD)
            queryStringPese = `
          AND
            PESE_CERE_COD IN(${arrayCere})
          `
            queryStringPeit = `
          AND
            PEIT_CERE_COD IN(${arrayCere})
          `
          }
        }

        const sql1 = selectPedidoEstoqueCere1(cod, queryString, queryStringPese, queryStringPeit, database)
        const sql2 = selectPedidoEstoqueCere2(cod, queryString, queryStringPese, queryStringPeit, database)
        const sql3 = selectPedidoEstoqueCere3(cod, queryString, queryStringPese, queryStringPeit, database)
        const sql4 = selectPedidoEstoqueCere4(cod, queryString, queryStringPese, queryStringPeit, database)

        const listPedido1 = await PedidoEstoqueRepository.query(sql1)
        const listPedido2 = await PedidoEstoqueRepository.query(sql2)
        const listPedido3 = await PedidoEstoqueRepository.query(sql3)
        const listPedido4 = await PedidoEstoqueRepository.query(sql4)

        if (listPedido1.length > 0) {
          listPedido1.map((pos: IRequest) => array.push(pos))
        }

        if (listPedido2.length > 0) {
          listPedido2.map((pos: IRequest) => array.push(pos))
        }

        if (listPedido3.length > 0) {
          listPedido3.map((pos: IRequest) => array.push(pos))
        }

        if (listPedido4.length > 0) {
          listPedido4.map((pos: IRequest) => array.push(pos))
        }
      } else {
        const sql1 = selectPedidoEstoque1(cod, queryString, database)
        const sql2 = selectPedidoEstoque2(cod, queryString, database)
        const sql3 = selectPedidoEstoque3(cod, queryString, database)
        const sql4 = selectPedidoEstoque4(cod, queryString, database)

        const listPedido1 = await PedidoEstoqueRepository.query(sql1)
        const listPedido2 = await PedidoEstoqueRepository.query(sql2)
        const listPedido3 = await PedidoEstoqueRepository.query(sql3)
        const listPedido4 = await PedidoEstoqueRepository.query(sql4)

        if (listPedido1.length > 0) {
          listPedido1.map((pos: IRequest) => array.push(pos))
        }

        if (listPedido2.length > 0) {
          listPedido2.map((pos: IRequest) => array.push(pos))
        }

        if (listPedido3.length > 0) {
          listPedido3.map((pos: IRequest) => array.push(pos))
        }

        if (listPedido4.length > 0) {
          listPedido4.map((pos: IRequest) => array.push(pos))
        }
      }

      return {
        status: 200,
        message: array
      }
    } catch (e) {
      return {
        status: 500,
        message: 'Internal server error'
      }
    }
  }
}

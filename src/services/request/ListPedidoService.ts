/* eslint-disable @typescript-eslint/no-explicit-any */
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { selectPedidoEstoque1, selectPedidoEstoque2, selectPedidoEstoque3, selectPedidoEstoque4, selectPedidoEstoqueCere1, selectPedidoEstoqueCere2, selectPedidoEstoqueCere3, selectPedidoEstoqueCere4 } from '../../queries/request'
import { selectUsuaCr } from '../../queries/userResultCenter'
import { selectPag2ContrUsuaSmpCrPedCom } from '../../queries/parametrosGerais'

dotenv.config()

interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}

export class ListPedidoService {
  public async execute (TOKEN: string, queryString: string): Promise<any> {
    const array: any = []
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

    const cod = decodeToken.codUser

    const selectPag2ContrUsuaSmpCrPedComQuery = selectPag2ContrUsuaSmpCrPedCom()

    const selectPag2ContrUsuaSmpCrPedComData = await PedidoEstoqueRepository.query(selectPag2ContrUsuaSmpCrPedComQuery)

    if (selectPag2ContrUsuaSmpCrPedComData[0].PAG2_CONTR_USUA_SMP_CR_PED_COM === 'S') {
      const selectUsuaCrQuery = selectUsuaCr(cod)

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

      const sql1 = selectPedidoEstoqueCere1(cod, queryString, queryStringPese, queryStringPeit)
      const sql2 = selectPedidoEstoqueCere2(cod, queryString, queryStringPese, queryStringPeit)
      const sql3 = selectPedidoEstoqueCere3(cod, queryString, queryStringPese, queryStringPeit)
      const sql4 = selectPedidoEstoqueCere4(cod, queryString, queryStringPese, queryStringPeit)

      const listPedido1 = await PedidoEstoqueRepository.query(sql1)
      const listPedido2 = await PedidoEstoqueRepository.query(sql2)
      const listPedido3 = await PedidoEstoqueRepository.query(sql3)
      const listPedido4 = await PedidoEstoqueRepository.query(sql4)

      if (listPedido1.length > 0) {
        listPedido1.map((pos: any) => array.push(pos))
      }

      if (listPedido2.length > 0) {
        listPedido2.map((pos: any) => array.push(pos))
      }

      if (listPedido3.length > 0) {
        listPedido3.map((pos: any) => array.push(pos))
      }

      if (listPedido4.length > 0) {
        listPedido4.map((pos: any) => array.push(pos))
      }
    } else {
      const sql1 = selectPedidoEstoque1(cod, queryString)
      const sql2 = selectPedidoEstoque2(cod, queryString)
      const sql3 = selectPedidoEstoque3(cod, queryString)
      const sql4 = selectPedidoEstoque4(cod, queryString)

      const listPedido1 = await PedidoEstoqueRepository.query(sql1)
      const listPedido2 = await PedidoEstoqueRepository.query(sql2)
      const listPedido3 = await PedidoEstoqueRepository.query(sql3)
      const listPedido4 = await PedidoEstoqueRepository.query(sql4)

      if (listPedido1.length > 0) {
        listPedido1.map((pos: any) => array.push(pos))
      }

      if (listPedido2.length > 0) {
        listPedido2.map((pos: any) => array.push(pos))
      }

      if (listPedido3.length > 0) {
        listPedido3.map((pos: any) => array.push(pos))
      }

      if (listPedido4.length > 0) {
        listPedido4.map((pos: any) => array.push(pos))
      }
    }

    return array
  }
}

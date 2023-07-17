import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { totalFornCerePedido, totalUsuaPedido } from '../../queries/request'
import { selectUsuaCrParametros } from '../../queries/userResultCenter'
import { pegaPeriodo } from '../../utils/pegaPeriodoPedido'
import { selectPag2ContrUsuaSmpCrPedCom } from '../../queries/parametrosGerais'
import { verifyUsercodWithoutPassword } from '../../utils/verifyUser'

export const validCereFornPedi = async (cod: string, cereCod: string, valTotal: string, fornCod: string, pediCod: string, database: string) => {
  const {
    USUA_VALOR_APROVACAO,
    USUA_VALOR_APROVACAO_MENSAL
  } = await verifyUsercodWithoutPassword(cod, database)

  const periodo = pegaPeriodo('PEDI_DATA')

  const sqlUsuarioCr = selectUsuaCrParametros(cod + '', cereCod, database)
  const selectPag2ContrUsuaSmpCrPedComQuery = selectPag2ContrUsuaSmpCrPedCom(database)

  const selectPag2ContrUsuaSmpCrPedComData = await PedidoEstoqueRepository.query(selectPag2ContrUsuaSmpCrPedComQuery)

  const sqlUsuarioCrData = await PedidoEstoqueRepository.query(sqlUsuarioCr)

  if (selectPag2ContrUsuaSmpCrPedComData[0].PAG2_CONTR_USUA_SMP_CR_PED_COM === 'S') {
    if (!sqlUsuarioCrData[0]) {
      return ({
        message: 'Parametros de usuario CR não estão configurados corretamente',
        error: true,
        status: 400
      })
    } else if (sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED) {
      const USCR_VLR_MAX_APROV_PED = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED
      if (USCR_VLR_MAX_APROV_PED < parseInt(valTotal)) {
        return ({
          message: `Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar nesse CR`,
          error: true,
          status: 400
        })
      }
    } else if (sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED_FORN) {
      const USCR_VLR_MAX_APROV_PED_FORN = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED_FORN
      const sqlTotalFornCerePedido = totalFornCerePedido(cereCod, fornCod, periodo, database)

      if (USCR_VLR_MAX_APROV_PED_FORN > 0) {
        const totalFornCerePedidoData = await PedidoEstoqueRepository.query(sqlTotalFornCerePedido)

        let totalFornCerePedidoValue = 0
        for (let i = 0; i < totalFornCerePedidoData; i++) {
          totalFornCerePedidoValue += totalFornCerePedidoData[i].VALOR
        }

        totalFornCerePedidoValue += parseInt(valTotal)

        if (USCR_VLR_MAX_APROV_PED_FORN < totalFornCerePedidoValue) {
          return ({
            message: `Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor mensal de aprovação para esse fornecedor`,
            error: true,
            status: 400
          })
        }
      }
    }
  } else {
    if (USUA_VALOR_APROVACAO && USUA_VALOR_APROVACAO_MENSAL) {
      if (parseInt(valTotal) > Number(USUA_VALOR_APROVACAO)) {
        return ({
          message: `Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar`,
          error: true,
          status: 400
        })
      }
      const sqlTotalUsuaPedido = totalUsuaPedido(cod + '', periodo, database)

      const totalUsuaPedidoData = await PedidoEstoqueRepository.query(sqlTotalUsuaPedido)
      let totalUsuaPedidoValue = 0
      for (let i = 0; i < totalUsuaPedidoData; i++) {
        totalUsuaPedidoValue += totalUsuaPedidoData[i].VALOR
      }
      totalUsuaPedidoValue += parseInt(valTotal)
      if (Number(USUA_VALOR_APROVACAO_MENSAL) < totalUsuaPedidoValue) {
        return ({
          message: `Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar por mês`,
          error: true,
          status: 400
        })
      }
    } else if (USUA_VALOR_APROVACAO || !USUA_VALOR_APROVACAO_MENSAL) {
      if (parseInt(valTotal) > Number(USUA_VALOR_APROVACAO)) {
        return ({
          message: `Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar`,
          error: true,
          status: 400
        })
      }
    } else if (!USUA_VALOR_APROVACAO || USUA_VALOR_APROVACAO_MENSAL) {
      const sqlTotalUsuaPedido = totalUsuaPedido(cod + '', periodo, database)

      const totalUsuaPedidoData = await PedidoEstoqueRepository.query(sqlTotalUsuaPedido)
      let totalUsuaPedidoValue = 0
      for (let i = 0; i < totalUsuaPedidoData; i++) {
        totalUsuaPedidoValue += totalUsuaPedidoData[i].VALOR
      }
      totalUsuaPedidoValue += parseInt(valTotal)
      if (Number(USUA_VALOR_APROVACAO_MENSAL) < totalUsuaPedidoValue) {
        return ({
          message: `Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar por mês`,
          error: true,
          status: 400
        })
      }
    }
  }

  return ({
    message: '',
    error: false,
    status: 200
  })
}

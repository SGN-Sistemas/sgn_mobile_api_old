
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';
import { totalFornCerePedido, totalUsuaPedido } from '../../queries/request';
import { selectUsuaCrParametros } from '../../queries/userResultCenter';
import { pegaPeriodo } from '../../utils/pegaPeriodoPedido';
import { selectPag2ContrUsuaSmpCrPedCom } from '../../queries/parametrosGerais';
import AppError from '../../errors/AppError';


export const validCereFornPedi = async (userId: number, cereCod: string, valTotal: string, fornCod: string, pediCod:string) => {


  const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: userId });
  const periodo = pegaPeriodo('PEDI_DATA');

  if (!existsUser) {
    throw new AppError('Codigo incorreto');
  }

  const sqlUsuarioCr = selectUsuaCrParametros(userId + '', cereCod);
  const selectPag2ContrUsuaSmpCrPedComQuery = selectPag2ContrUsuaSmpCrPedCom();

  const selectPag2ContrUsuaSmpCrPedComData = await PedidoEstoqueRepository.query(selectPag2ContrUsuaSmpCrPedComQuery);

  const sqlUsuarioCrData = await PedidoEstoqueRepository.query(sqlUsuarioCr);

  let USCR_VLR_MAX_APROV_PED = 0;

  if (sqlUsuarioCrData[0]) {
    USCR_VLR_MAX_APROV_PED = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED;
  }

  let USCR_VLR_MAX_APROV_PED_FORN = 0;

  if (sqlUsuarioCrData[0]) {
    USCR_VLR_MAX_APROV_PED_FORN = sqlUsuarioCrData[0].USCR_VLR_MAX_APROV_PED_FORN;
  }
  if (selectPag2ContrUsuaSmpCrPedComData[0].PAG2_CONTR_USUA_SMP_CR_PED_COM === 'S') {
    if (USCR_VLR_MAX_APROV_PED > 0) {
      if (USCR_VLR_MAX_APROV_PED < parseInt(valTotal)) {

        throw new AppError(`Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar nesse CR`);
      }

    } else {

      if (existsUser.USUA_VALOR_APROVACAO > 0) {
        if (parseInt(valTotal) > existsUser.USUA_VALOR_APROVACAO) {

          throw new AppError(`Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar`);
        }
      }
    }

    const sqlTotalFornCerePedido = totalFornCerePedido(cereCod, fornCod, periodo);

    if (USCR_VLR_MAX_APROV_PED_FORN > 0) {
      console.log(sqlTotalFornCerePedido);

      const totalFornCerePedidoData = await PedidoEstoqueRepository.query(sqlTotalFornCerePedido);

      let totalFornCerePedidoValue = 0;
      for (let i = 0; i < totalFornCerePedidoData; i++) {
        totalFornCerePedidoValue += totalFornCerePedidoData[i].VALOR;
      }

      totalFornCerePedidoValue += parseInt(valTotal);

      if (USCR_VLR_MAX_APROV_PED_FORN < totalFornCerePedidoValue) {

        throw new AppError(`Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor mensal de aprovação para esse fornecedor`);

      }
    } else {
      if (existsUser.USUA_VALOR_APROVACAO_MENSAL > 0) {
        const sqlTotalUsuaPedido = totalUsuaPedido(userId + '', periodo);

        const totalUsuaPedidoData = await PedidoEstoqueRepository.query(sqlTotalUsuaPedido);
        let totalUsuaPedidoValue = 0;
        for (let i = 0; i < totalUsuaPedidoData; i++) {
          totalUsuaPedidoValue += totalUsuaPedidoData[i].VALOR;
        }
        totalUsuaPedidoValue += parseInt(valTotal);

        if (existsUser.USUA_VALOR_APROVACAO_MENSAL < totalUsuaPedidoValue) {
          throw new AppError(`Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar por mês`);
        }
      }
    }
  } else {
    if (USCR_VLR_MAX_APROV_PED < parseInt(valTotal)) {

      throw new AppError(`Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar nesse CR`);
    }

    if (existsUser.USUA_VALOR_APROVACAO_MENSAL > 0 || !existsUser.USUA_VALOR_APROVACAO_MENSAL) {
      const sqlTotalUsuaPedido = totalUsuaPedido(userId + '', periodo);

      const totalUsuaPedidoData = await PedidoEstoqueRepository.query(sqlTotalUsuaPedido);
      let totalUsuaPedidoValue = 0;
      for (let i = 0; i < totalUsuaPedidoData; i++) {
        totalUsuaPedidoValue += totalUsuaPedidoData[i].VALOR;
      }
      totalUsuaPedidoValue += parseInt(valTotal);

      if (existsUser.USUA_VALOR_APROVACAO_MENSAL < totalUsuaPedidoValue) {
        throw new AppError(`Pedido ${pediCod} não poderá ser aprovado poís valor do pedido acima do valor que o usuario pode aprovar por mês`);
      }
    }
  }

  return ({
    message: '',
    error: false,
    status: 200
  });
};

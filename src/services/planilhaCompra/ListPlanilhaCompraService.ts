import { PlanilhaCompraRepository } from '../../typeorm/repository/PlanilhaCompraRepository';

class ListPlanilhaCompraService {
  async execute (usua_cod: number) {
    try {

      const listPlanilha = await PlanilhaCompraRepository.query(
        `SELECT SECO_DESC, PLAC_COD FROM Setor_Compras AS SC
          INNER JOIN PLANILHA_COMPRA AS PC
          ON SC.SECO_COD = PC.PLAC_SECO_COD
            WHERE
              PC.PLAC_STATUS = 'A'
                AND
              (PC.PLAC_USUA_COD_ASS_1 = ${usua_cod}
                OR
              PC.PLAC_USUA_COD_ASS_2 = ${usua_cod})`
      );

      return listPlanilha;
    } catch (error) {
      return error;
    }
  }
}

export default ListPlanilhaCompraService;

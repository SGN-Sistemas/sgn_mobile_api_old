import { PlanilhaCompraRepository } from '../../../typeorm/repository/PlanilhaCompraRepository';

export default class AprovadoresPlanilhaService {
  async execute ( planilhaCod: string) {
    try {

      const getPlanilhaCompra = await PlanilhaCompraRepository
        .query(`
          SELECT
            plac_usua_cod_ass_1,
            plac_usua_cod_ass_2
          FROM PLANILHA_COMPRA
          WHERE PLAC_COD = ${Number(planilhaCod)}
          AND PLAC_STATUS = 'A'
            `);

      const aprovadores = await PlanilhaCompraRepository.query(`SELECT
          usua_nome
          FROM USUARIO
          WHERE USUA_COD = ${getPlanilhaCompra[0].plac_usua_cod_ass_1}
          OR USUA_COD = ${getPlanilhaCompra[0].plac_usua_cod_ass_2}
      `);

      return aprovadores;
    } catch (error) {
      return error;
    }
  }
}

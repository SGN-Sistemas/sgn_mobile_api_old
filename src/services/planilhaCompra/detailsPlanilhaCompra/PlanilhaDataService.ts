import { PlanilhaCompraRepository } from '../../../typeorm/repository/PlanilhaCompraRepository';

export default class PlanilhaDataService {
  async execute(planilhaCod: string) {
    try {
      const data = await PlanilhaCompraRepository.query(`
        Select              PLAC_COD,
                     PESS_NOME,
                     seco_desc
                     from  Planilha_Compra LEFT OUTER JOIN pessoal ON plac_pess_cod = pess_cod, Setor_Compras
                     where	seco_cod = plac_seco_cod
                     and     plac_COD = ${planilhaCod}
      `);

      return data;
    } catch (error) {
      return error;
    }
  }
}

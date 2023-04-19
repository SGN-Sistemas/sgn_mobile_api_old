import { PlanilhaCompraRepository } from '../../../typeorm/repository/PlanilhaCompraRepository';

export default class PlanilhaFornecedoresService {
  async execute (plac_cod: string) {
    try {
      const fornecedores = await PlanilhaCompraRepository.query(`
        Select 	 PLAF_COD,
                    				 PLAF_FORN_COD,
                    				 FORN_NOME
                    			  from   fornecedor,
                    				 planilha_fornecedor
                    			 where 	  forn_COD = PLaf_forn_COD
                                              and    PLAF_PLAC_COD  = ${plac_cod}
                    			order by FORN_NOME
      `);

      return fornecedores;
    } catch (error) {
      return error;
    }
  }
}

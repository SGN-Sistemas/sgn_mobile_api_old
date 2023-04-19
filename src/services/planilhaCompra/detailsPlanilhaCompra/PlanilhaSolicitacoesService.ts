import { PlanilhaCompraRepository } from '../../../typeorm/repository/PlanilhaCompraRepository';

export default class PlanilhaSolicitacoesService {
  async execute (plac_cod: string) {
    try {

      const repositorySolicitacoes = await PlanilhaCompraRepository.query(`Select 	  SOCO_COD,
                			  MATE_COD,
                    				  MATE_DESC,
                    				  ALMO_COD,
                    				  ALMO_DESC,
                    				  SOCO_DTNECE,
                    				  SOCO_QTD_NECE,
                    				  UNMA_SIGLA,
                    				  UNMA_COD,
                    				  SOCO_OBS,
                    				  MATE_REFERENCIA,
                    				  PESS_COD,
                    				  PESS_NOME,
                    				  SOCO_PLAC_OBS,
                    				  SOCO_DTPRAZORESP,
                    				  CERE_COD,
                    				  CERE_SIGLA + ' - ' + CERE_NOME as CERE,
                    				  ITPC_SIGLA + ' - ' + ITPC_DESC as ITPC,
                    				  ITPC_COD,
                    				 MATE_OBS,
                    				FORN_NOME, 'm' as TIPO
                    			 from 	  material,
                    				  unid_mat,
                    				  solicitacao_compra
                    					LEFT OUTER JOIN pessoal ON soco_pess_cod = pess_Cod
                    					LEFT OUTER JOIN  item_pcg ON SOCO_ITPC_RATEIO_COD = itpc_cod
                    					LEFT OUTER JOIN centro_resultado ON soco_cere_cod = cere_cod
                    					LEFT OUTER JOIN fornecedor ON SOCO_FORN_COD_SEL = forn_cod,
                               			  	almoxarifado
                    			 where 	  MATE_COD = SOCO_MATE_COD
                    			 AND      ALMO_COD = SOCO_ALMO_COD
                    			 AND      UNMA_COD = SOCO_UNMA_COD
                    			 AND	  SOCO_STATUS = 'PC'
                                  	 AND      SOCO_PLAC_COD = ${plac_cod}`);

      return repositorySolicitacoes;
    } catch (error) {
      return error;
    }
  }
}

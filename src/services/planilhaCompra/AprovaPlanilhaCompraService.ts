import { PlanilhaCompraRepository } from '../../typeorm/repository/PlanilhaCompraRepository';

interface IRequest {
  userId: number;
  planilhaId : string
}

class AprovaPlanilhaCompraService {
  async execute ({ userId, planilhaId }: IRequest) {
    try {

      const getPlanilhaUsua1 =
        await PlanilhaCompraRepository.createQueryBuilder('PLANILHA_COMPRA')
          .where('PLAC_STATUS = :status', { status: 'A' })
          .andWhere('PLAC_USUA_COD_ASS_1 = :id', { id: userId })
          .andWhere('PLAC_COD = :idPlanilha ', { idPlanilha: Number(planilhaId) })
          .andWhere('(PLAC_ASSINATURA_1 IS NULL OR PLAC_ASSINATURA_1 != \'S\' or PLAC_ASSINATURA_1 = \'\')')
          .getRawOne();

      const getPlanilhaUsua2 =
        await PlanilhaCompraRepository.createQueryBuilder('PLANILHA_COMPRA')
          .where('PLAC_STATUS = :status', { status: 'A' })
          .andWhere('PLAC_USUA_COD_ASS_2 = :id', { id: userId })
          .andWhere('PLAC_COD = :idPlanilha ', { idPlanilha: Number(planilhaId) })
          .andWhere('(PLAC_ASSINATURA_2 IS NULL OR PLAC_ASSINATURA_2 != \'S\' or PLAC_ASSINATURA_2 = \'\')')
          .getRawOne();

      // parametros
      const paramsAprovacao = await PlanilhaCompraRepository.query(`
        SELECT PAG2_NUM_APROVACOES_PLAC, PAG2_TODAS_APROVACOES_PLAC  FROM PARAMETROS_GERAIS_2
      `);

      if (
        paramsAprovacao[0].PAG2_NUM_APROVACOES_PLAC === 2 &&
        paramsAprovacao[0].PAG2_TODAS_APROVACOES_PLAC === 'S'

      ) {
        if (getPlanilhaUsua1) {
          if (
            getPlanilhaUsua1.PLANILHA_COMPRA_PLAC_COD === Number(planilhaId)
          ) {
            await PlanilhaCompraRepository.query(`UPDATE PLANILHA_COMPRA SET PLAC_ASSINATURA_1 = 'S',
            PLAC_DATA_APROVACAO1 = getDate() WHERE PLAC_USUA_COD_ASS_1 = ${userId}
            and PLAC_COD = ${planilhaId}`);
          }
        }

        if (getPlanilhaUsua2) {
          if (
            getPlanilhaUsua2.PLANILHA_COMPRA_PLAC_COD === Number(planilhaId)
          ) {
            await PlanilhaCompraRepository.query(`UPDATE PLANILHA_COMPRA SET PLAC_ASSINATURA_2 = 'S',
            PLAC_DATA_APROVACAO2 = getDate() WHERE PLAC_USUA_COD_ASS_2 = ${userId}
            and PLAC_COD = ${planilhaId}`);
          }
        }

        const planilhaUsua = await PlanilhaCompraRepository.query(`
          SELECT PLAC_COD,PLAC_ASSINATURA_1,PLAC_ASSINATURA_2 FROM PLANILHA_COMPRA
            WHERE PLAC_STATUS = 'A'
            and PLAC_COD = ${planilhaId} and (PLAC_USUA_COD_ASS_1 = ${userId} OR PLAC_USUA_COD_ASS_2 = ${userId})
        `);

        if (
          planilhaUsua[0].PLAC_ASSINATURA_1 === 'S' &&
          planilhaUsua[0].PLAC_ASSINATURA_2 === 'S'
        ) {
          await PlanilhaCompraRepository.query(`UPDATE PLANILHA_COMPRA SET PLAC_STATUS = 'P' WHERE PLAC_COD = ${planilhaId}`);
        }
      } else {
        if (getPlanilhaUsua1) {
          if (
            getPlanilhaUsua1.PLANILHA_COMPRA_PLAC_COD === Number(planilhaId)
          ) {
            await PlanilhaCompraRepository.query(`UPDATE PLANILHA_COMPRA SET PLAC_ASSINATURA_1 = 'S',
            PLAC_DATA_APROVACAO1 = getDate(),  PLAC_STATUS = 'P' WHERE PLAC_USUA_COD_ASS_1 = ${userId}
            and PLAC_COD = ${planilhaId}
        `);

          }
        }

        if (getPlanilhaUsua2) {
          if (
            getPlanilhaUsua2.PLANILHA_COMPRA_PLAC_COD === Number(planilhaId)
          ) {
            await PlanilhaCompraRepository.query(`UPDATE PLANILHA_COMPRA SET
            PLAC_ASSINATURA_2 = 'S',
            PLAC_DATA_APROVACAO2 = getDate(),
            PLAC_STATUS = 'P'
              WHERE PLAC_USUA_COD_ASS_2 = ${userId}
                and
              PLAC_COD = ${planilhaId}
        `);
          }
        }
      }

      return {
        message: 'Planilha aprovada com sucesso',
        error: false,
        status: 200
      };
    } catch (error) {
      return error;
    }
  }
}

export default AprovaPlanilhaCompraService;

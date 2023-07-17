export const selectCereSoliCompra = (cereCod: string) => {
  return `
    SELECT
      CERE_OBRIG_PROJETO
    FROM
      CENTRO_RESULTADO
    WHERE 
      CERE_COD = ${cereCod}
  `
}

export const selectCere = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT 
        CERE_NOME,
        CERE_SIGLA,
        CERE_PLCG_COD,
        CERE_COD
    FROM
        CENTRO_RESULTADO
    WHERE
        CERE_COD IN(${cod})
    ${queryString}
  `
}

export const detailsCR = (planoContas: string, codigo: string, dataFim: string, dataIni: string, database: string) => {
  return ` USE [${database}] select 1 as tipo, \n` +
    '       itpc_cod as cod, \n' +
    '       itpc_sigla as sigla, \n' +
    '       itpc_desc as descricao,   \n' +
    '       null  as valPago, \n' +
    '       null as dtvenc, \n' +
    '       itpc_nivel as nivel, \n' +
    '       itpc_cod_pai as cod_pai, \n' +
    "       '' as cliente_forn, \n" +
    '       null as valPrev, \n' +
    '       null as dtEmis, \n' +
    '       null as dtBaixa, \n' +
    '       null  as cod2,\n' +
    "       '' as indPrevisao,\n" +
    '       null as cod3,\n' +
    '       null  as cod4\n' +
    'from item_pcg\n' +
    'where itpc_plcg_cod =' + planoContas + ' \n' +
    '  union \n' +
    '\n' +
    'SELECT \n' +
    '2 , itpc_cod, itpc_sigla, ITPC_DESC, TRPP_VALPAGO, TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'FORN_NOME, TRPP_VALPREV, TRPG_DTEMIS, TRPP_DTBAIXA, TRPG_COD, TRPP_IND_PREVISAO, null, TRPP_COD\n' +
    'FROM TR_PARCELA_PG, TRANSACAO_PG, ITEM_PCG, FORNECEDOR\n' +
    'WHERE TRPP_TRPG_COD = TRPG_COD\n' +
    'AND TRPP_ITPC_COD = ITPC_COD\n' +
    'AND TRPG_FORN_COD = FORN_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND TRPP_CERE_COD in ( ' + codigo + ') \n' +
    "AND (TRPG_RETENCOESAPURADAS = 'N' or TRPG_RETENCOESAPURADAS IS NULL)\n" +
    ` AND (trpp_dtbaixa >= '${dataIni}')  AND (trpp_dtbaixa <=  '${dataFim}') \n` +
    '\n' +
    '\n' +
    'UNION  ALL\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_ISS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME   +   ' (ISS)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_ISS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_ISS = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_ISS = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    ' and itpc_plcg_cod = ' + planoContas + '\n' +
    `  AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}') \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME  ,  T1.TRPG_VALBRUTO , \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    'UNION  ALL\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_INSS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME   +   ' (INSS)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_INSS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_INSS = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_INSS = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    `AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}')  \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME  , T1.TRPG_VALBRUTO , \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    'UNION ALL\n' +
    '\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_PIS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME    +  ' (PIS)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_PIS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_PIS = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_PIS = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    `AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}') \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME  , T1.TRPG_VALBRUTO , \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    'UNION  ALL\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_COFINS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME  +   ' (COFINS)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_COFINS * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_COFINS = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COFINS = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    `AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}') \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME   , T1.TRPG_VALBRUTO ,  \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    'UNION ALL\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_IR * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME   +   ' (IR)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_IR * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_IR = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_IR = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    `AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}')  \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME  , T1.TRPG_VALBRUTO ,  \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    'UNION ALL\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_CSSL * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME   +   ' (CSSL)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_CSSL * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_CSSL = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_CSSL = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    ` AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}')  \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME  , T1.TRPG_VALBRUTO ,  \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    'UNION ALL\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_RETENC1 * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME  +  ' (PISCOFCS)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_RETENC1 * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_RETENC1 = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_RETENC1 = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    ` AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}')  \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME , T1.TRPG_VALBRUTO ,  \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    'UNION ALL\n' +
    '\n' +
    'SELECT \n' +
    '3, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'round( ( P2.TRPP_VALPAGO * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_RETENC2 * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai,  \n' +
    "FORN_NOME  +  ' (Retenção2)', \n" +
    '\n' +
    'round( ( P2.TRPP_VALPREV * 100 / sum(P3.TRPP_VALPREV)) / 100 * (T1.TRPG_VAL_RETENC2 * P1.TRPP_VALPREV / \n' +
    '(T1.TRPG_VALBRUTO - isnull(T1.TRPG_VAL_ISS,0)  - isnull(T1.TRPG_VAL_INSS,0) - isnull(T1.TRPG_VAL_PIS,0) - isnull(T1.TRPG_VAL_COFINS,0) - isnull(T1.TRPG_VAL_IR ,0)- isnull(T1.TRPG_VAL_CSSL,0) - isnull(T1.TRPG_VAL_RETENC1,0) - isnull\n' +
    '(T1.TRPG_VAL_RETENC2,0) )),2), \n' +
    '\n' +
    'T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, T1.TRPG_COD, P1.TRPP_IND_PREVISAO, null, P2.TRPP_COD\n' +
    'FROM TR_PARCELA_PG P1, TRANSACAO_PG T1, TR_PARCELA_PG P2, TRANSACAO_PG T2 , TR_PARCELA_PG P3, TRANSACAO_PG T3\n' +
    ', ITEM_PCG, FORNECEDOR\n' +
    'WHERE P1.TRPP_TRPG_RETENC2 = T2.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_RETENC2 = T3.TRPG_COD\n' +
    'AND P1.TRPP_TRPG_COD = T1.TRPG_COD\n' +
    'AND P2.TRPP_TRPG_COD = T2.TRPG_COD\n' +
    'AND P3.TRPP_TRPG_COD = T3.TRPG_COD\n' +
    'AND P1.TRPP_ITPC_COD = ITPC_COD\n' +
    'AND T1.TRPG_FORN_COD = FORN_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND P1.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P2.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    'AND P3.TRPP_CERE_COD in ( ' + codigo + ') \n' +
    `AND (P2.trpp_dtbaixa >= '${dataIni}')  AND(P2.trpp_dtbaixa <=  '${dataFim}') \n` +
    'group by itpc_cod, itpc_sigla, ITPC_DESC, itpc_cod_pai, FORN_NOME  , T1.TRPG_VALBRUTO ,  \n' +
    'P2.TRPP_VALPREV,T2.TRPG_VALBRUTO, T2.TRPG_DTEMIS, P2.TRPP_DTBAIXA, P2.TRPP_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'T1.TRPG_COD, P1.TRPP_IND_PREVISAO, \n' +
    'T1.TRPG_VAL_ISS , T1.TRPG_VAL_INSS, T1.TRPG_VAL_PIS, T1.TRPG_VAL_COFINS, T1.TRPG_VAL_IR, \n' +
    'T1.TRPG_VAL_CSSL, T1.TRPG_VAL_RETENC1, T1.TRPG_VAL_RETENC2, P1.TRPP_cod, P1.TRPP_VALPREV, P2.TRPP_VALPAGO, P2.TRPP_COD\n' +
    '\n' +
    ' union \n' +
    'SELECT \n' +
    '4, itpc_cod, itpc_sigla, ITPC_DESC, TRPR_VALPAGO, TRPR_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'CLIE_NOME, TRPR_VALPREV, TRRC_DTEMIS, TRPR_DTBAIXA, TRRC_COD, TRPR_IND_PREVISAO, null, TRPR_COD\n' +
    'FROM TR_PARCELA_RC, TRANSACAO_RC, ITEM_PCG, CLIENTE\n' +
    'WHERE TRPR_TRRC_COD = TRRC_COD\n' +
    'AND TRPR_ITPC_COD = ITPC_COD\n' +
    'AND TRRC_CLIE_COD = CLIE_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND TRPR_CERE_COD in ( ' + codigo + ') \n' +
    `AND (trpr_dtbaixa >= '${dataIni}')  AND (trpr_dtbaixa <=  '${dataFim}') \n` +
    ' union \n' +
    'SELECT \n' +
    '5, itpc_cod, itpc_sigla, ITPC_DESC, TRPA_VALPAGO, TRPA_DTVENC, itpc_nivel, itpc_cod_pai, \n' +
    'CLIE_NOME, ISNULL(TRPA_VALIND_PR * VAIN_VALOR_REAL,TRPA_VALPREV), TRPA_DTEMIS, TRPA_DTBAIXA, TRAP_COD, NULL, null, TRPA_COD\n' +
    'FROM TR_PARCELA_PR LEFT OUTER JOIN  valor_indice ON VAIN_INFI_COD = TRPA_INFI_COD, \n' +
    'TRANSACAO_PR, ITEM_PCG, CLIENTE, SUB_CONTRATO_PR, CONTRATO_PR, EMPREENDIMENTO\n' +
    'WHERE TRPA_TRAP_COD = TRAP_COD\n' +
    'AND TRAP_SUCP_COD = SUCP_COD\n' +
    'AND SUCP_COPR_COD = COPR_COD\n' +
    'AND COPR_EMPE_COD = EMPE_COD\n' +
    'AND SUCP_ITPC_COD = ITPC_COD\n' +
    'AND COPR_CLIE_COD = CLIE_COD\n' +
    'and itpc_plcg_cod = ' + planoContas + '\n' +
    'AND EMPE_CERE_COD in ( ' + codigo + ') \n' +
    "AND COPR_STCO_COD IN ('NO','QT', 'DI')\n" +
    "AND TRPA_STTP_COD IN ('NO','QT')\n" +
    ` AND (trpa_dtbaixa >= '${dataIni}')  AND (trpa_dtbaixa <=  '${dataFim}') \n` +
    ' AND  VAIN_DTVIGOR  = (SELECT max(vain_dtvigor)\n' +
    '            From valor_indice\n' +
    '   Where trpa_infi_cod = vain_infi_cod   ) union\n' +
    'Select  \n' +
    '7, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'trpi_valor * -1, \n' +
    '\n' +
    'TRIN_DATA, itpc_nivel, itpc_cod_pai,  \n' +
    "'TI Pagar - ' +  cere_nome, \n" +
    '\n' +
    'trpi_valor * -1, \n' +
    '\n' +
    "TRIN_DATA, TRIN_DATA, trin_cod, 'N', null, trpi_cod\n" +
    '\n' +
    'from item_pcg, transacao_interna, tr_parcela_interna, centro_resultado\n' +
    'Where   trin_itpc_cod = itpc_cod\n' +
    "and     trin_tipo = 'P'\n" +
    'and     trpi_trin_cod = trin_cod \n' +
    'and     trpi_cere_cod = cere_cod\n' +
    'and     itpc_plcg_cod = ' + planoContas + '\n' +
    'AND     trin_cere_cod in ( ' + codigo + ') \n' +
    ` AND (trin_data >= '${dataIni}')  AND (trin_data <=  '${dataFim}') \n ` +
    ' union \n' +
    'Select  \n' +
    '7, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    '\n' +
    'trpi_valor, \n' +
    '\n' +
    'TRIN_DATA, itpc_nivel, itpc_cod_pai,  \n' +
    " 'TI Pagar - ' +  cere_nome, \n" +
    ' trpi_valor, \n' +
    " TRIN_DATA, TRIN_DATA, trin_cod, 'N', null, trpi_cod\n" +
    ' from item_pcg, transacao_interna, tr_parcela_interna, centro_resultado\n' +
    ' Where   trpi_itpc_cod = itpc_cod\n' +
    " and     trin_tipo = 'P'\n" +
    ' and     trpi_trin_cod = trin_cod \n' +
    ' and     trin_cere_cod = cere_cod\n' +
    ' and     itpc_plcg_cod = ' + planoContas + '\n' +
    ' AND     trpi_cere_cod in ( ' + codigo + ') \n' +
    `  AND (trin_data >= '${dataIni}')  AND (trin_data <=  '${dataFim}') \n` +
    ' union\n' +
    ' Select  \n' +
    ' 8, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    ' trpi_valor * -1, \n' +
    ' TRIN_DATA, itpc_nivel, itpc_cod_pai,  \n' +
    " 'TI Receber - ' +  cere_nome, \n" +
    ' trpi_valor * -1, \n' +
    " TRIN_DATA, TRIN_DATA, trin_cod, 'N', null, trpi_cod\n" +
    ' from item_pcg, transacao_interna, tr_parcela_interna, centro_resultado\n' +
    ' Where   trin_itpc_cod = itpc_cod\n' +
    " and     trin_tipo = 'R'\n" +
    ' and     trpi_trin_cod = trin_cod \n' +
    ' and     trpi_cere_cod = cere_cod\n' +
    ' and     itpc_plcg_cod = ' + planoContas + '\n' +
    ' AND     trin_cere_cod in ( ' + codigo + ') \n' +
    ` AND (trin_data >= '${dataIni}')  AND (trin_data <=  '${dataFim}') \n` +
    ' union\n' +
    ' Select  \n' +
    ' 8, itpc_cod, itpc_sigla, ITPC_DESC,\n' +
    ' trpi_valor, \n' +
    ' TRIN_DATA, itpc_nivel, itpc_cod_pai,  \n' +
    " 'TI Receber - ' +  cere_nome, \n" +
    ' trpi_valor, \n' +
    " TRIN_DATA, TRIN_DATA, trin_cod, 'N', null, trpi_cod\n" +
    ' from item_pcg, transacao_interna, tr_parcela_interna, centro_resultado\n' +
    ' Where   trpi_itpc_cod = itpc_cod\n' +
    " and     trin_tipo = 'R'\n" +
    ' and     trpi_trin_cod = trin_cod \n' +
    ' and     trin_cere_cod = cere_cod\n' +
    ' and     itpc_plcg_cod = ' + planoContas + '\n' +
    ' AND     trpi_cere_cod in ( ' + codigo + ') \n' +
    ` AND (trin_data >= '${dataIni}')  AND (trin_data <=  '${dataFim}') \n` +
    ' order by tipo'
}

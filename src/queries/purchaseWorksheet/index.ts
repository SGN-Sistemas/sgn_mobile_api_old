export const selectPurchaseWorksheet = (cod: string, pos: string, database: string) => {
  return `
    USE [${database}]
    SELECT 
        PLAC_SECO_COD,
        PLAC_COD,
        PLAC_PESS_COD,
        PLAC_STATUS,
        '${pos}' AS ASS,
        SECO_DESC,
        PESS_NOME
    FROM
        PLANILHA_COMPRA
    INNER JOIN
        PESSOAL
    ON 
        PESS_COD = PLAC_PESS_COD
    INNER JOIN 
        SETOR_COMPRAS
    ON
        SECO_COD = PLAC_SECO_COD
    WHERE
        PLAC_USUA_COD_ASS_${pos} = ${cod}
  `
}

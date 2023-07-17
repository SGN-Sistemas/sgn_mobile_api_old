export const selectCRUsua = (cod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
        USCR_CERE_COD
    FROM
        USUARIO_CR
    WHERE
        USCR_USUA_COD = ${cod}
  `
}

export const selectUsuaCrParametros = (cod:string, cereCod:string, database: string) => {
  return `
    USE [${database}]
    SELECT
        USCR_VLR_MAX_APROV_PED,
        USCR_VLR_MAX_APROV_PED_FORN
    FROM
        USUARIO_CR
    WHERE
        USCR_USUA_COD = ${cod}
    AND
        USCR_CERE_COD = ${cereCod}
  `
}

export const selectUsuaCr = (cod:string, database: string) => {
  return `
    USE [${database}]
    SELECT
        USCR_CERE_COD
    FROM
        USUARIO_CR
    WHERE
        USCR_USUA_COD = ${cod}`
}

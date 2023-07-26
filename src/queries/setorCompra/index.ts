export const selectAllSetorCompras = (database: string) => {
  return `
        USE [${database}]
        SELECT
            SECO_DESC,
            SECO_COD
        FROM
            SETOR_COMPRAS
  `
}

export const selectSetorCompraUsua = (USUA_COD: string, database: string) => {
  return `
        USE [${database}]
        SELECT
            SECO_DESC,
            SECO_COD
        FROM
            REL_USUARIO_SETOR_COMPRAS
        INNER JOIN 
            SETOR_COMPRAS
        ON 
            RUSC_SECO_COD = SECO_COD
        WHERE
            RUSC_USUA_COD = ${USUA_COD}
    `
}

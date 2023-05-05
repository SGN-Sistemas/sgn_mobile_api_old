export const selectLevelRcUser = (cereCod: string, usuaCod: string) => {
  return `
    SELECT
        USCR_NIAC_COD_PG
    FROM
        USUARIO_CR
    WHERE   
        USCR_USUA_COD = ${usuaCod}
    AND
        USCR_CERE_COD = ${cereCod}
  `
}

export const selectCRUsua = (cod: number) => {
  return `
    SELECT
        USCR_CERE_COD
    FROM
        USUARIO_CR
    WHERE
        USCR_USUA_COD = ${cod}
  `;
};

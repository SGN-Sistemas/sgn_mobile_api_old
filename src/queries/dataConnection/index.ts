export const selectDataConnectionCompany = (cnpj: string) => {
  return `
    USE [MOBILE_CCONNECTION]
    SELECT
      DACO_URL,
      DACO_DATABASE
    FROM
      DATA_CONNECTION
    WHERE
      DACO_CNPJ = '${cnpj}'
  `
}

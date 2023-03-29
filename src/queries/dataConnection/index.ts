export const selectDataConnectionCompany = (cnpj: string) => {
  return `
    SELECT
      DACO_URL,
      DACO_DATABASE
    FROM
      [MOBILE_CCONNECTION].[dbo].DATA_CONNECTION
    WHERE
      DACO_CNPJ = '${cnpj}'
  `
}

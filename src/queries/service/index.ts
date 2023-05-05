export const selectAll = () => {
  return `
    SELECT
      SERV_COD AS MATE_COD,
      SERV_DESC AS MATE_DESC,
      SERV_UNMA_COD AS MATE_UNMA_COD,
      UNMA_DESC,
      UNMA_SIGLA
    FROM
      SERVICOS
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SERV_UNMA_COD
  `
}

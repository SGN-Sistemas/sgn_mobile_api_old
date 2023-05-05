export const selectAllUnidMat = () => {
  return `
    SELECT
      UNMA_SIGLA,
      UNMA_COD,
      UNMA_DESC
    FROM
      UNID_MAT
  `
}

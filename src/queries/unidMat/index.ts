export const selectAllUnidMat = (database: string) => {
  return `
    USE [${database}]
    SELECT
      UNMA_SIGLA,
      UNMA_COD,
      UNMA_DESC
    FROM
      UNID_MAT
  `
}

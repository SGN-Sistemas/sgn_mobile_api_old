export const sqlMaterial = (mateCod : string) => {
  return `
        SELECT
            MATE_OBS_SOLIC_OBRIG,
            MATE_OBS,
            MATE_UNMA_COD,
            UNMA_DESC,
            UNMA_SIGLA
        FROM
            MATERIAL
        INNER JOIN
            UNID_MAT
        ON
            UNMA_COD = MATE_UNMA_COD
        WHERE
            MATE_COD = ${mateCod}
    `
}

export const sqlMaterialAll = () => {
  return `
    SELECT
        MATE_DESC,
        MATE_SIGLA,
        MATE_COD,
        MATE_UNMA_COD,
        UNMA_DESC,
        UNMA_SIGLA
    FROM
        MATERIAL
    INNER JOIN
        UNID_MAT
    ON
        UNMA_COD = MATE_UNMA_COD
  `
}

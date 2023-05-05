export const selectAllCrFiliAlmo = (almoCod: string) => {
  return `
    SELECT
        CERE_COD,
        CERE_SIGLA,
        CERE_NOME,
        CERE_PLCG_COD,
        CERE_TICR_COD
    FROM
        CENTRO_RESULTADO
    INNER JOIN
        GRUPO_CR
    ON
        GRCR_COD = CERE_GRCR_COD
    INNER JOIN 
        FILIAL
    ON
        FILI_EMPR_COD = GRCR_EMPR_COD
    INNER JOIN 
        ALMOXARIFADO
    ON
        ALMO_FILI_COD = FILI_COD
    WHERE
        CERE_IND_BLOQ = 'N'
    AND
        CERE_CENTRO_CONSUMO = 'S'
    AND
        ALMO_COD = ${almoCod}
  `
}

export const selectAllCrFiliAlmoUsua = (almoCod: string, usuaCod: string) => {
  return `
    SELECT
        CERE_COD,
        CERE_SIGLA,
        CERE_NOME,
        CERE_PLCG_COD,
        CERE_TICR_COD
    FROM
        CENTRO_RESULTADO
    INNER JOIN
        GRUPO_CR
    ON
        GRCR_COD = CERE_GRCR_COD
    INNER JOIN 
        FILIAL
    ON
        FILI_EMPR_COD = GRCR_EMPR_COD
    INNER JOIN 
        ALMOXARIFADO
    ON
        ALMO_FILI_COD = FILI_COD
    WHERE
        CERE_IND_BLOQ = 'N'
    AND
        CERE_CENTRO_CONSUMO = 'S'
    AND
        ALMO_COD = ${almoCod}
    AND
        CERE_COD
    IN
        (
            SELECT
                USCR_CERE_COD
            FROM
                USUARIO_CR
            WHERE
                USCR_USUA_COD = ${usuaCod}
        )
  `
}

export const selectCrForAlmo = (almoCod: string) => {
  return `
    SELECT
        CERE_COD,
        CERE_SIGLA,
        CERE_NOME,
        CERE_PLCG_COD,
        CERE_TICR_COD
    FROM
        CENTRO_RESULTADO
    WHERE
        CERE_IND_BLOQ = 'N'
    AND
        CERE_CENTRO_CONSUMO = 'S'
    AND
        CERE_COD
    IN 
        (
            SELECT
                RECA_CERE_COD
            FROM
                REL_CERE_ALMOX
            WHERE
                RECA_ALMO_COD = ${almoCod}
        )
  `
}
export const selectCrForAlmoUsua = (almoCod: string, usuaCod: string) => {
  return `
    SELECT
        CERE_COD,
        CERE_SIGLA,
        CERE_NOME,
        CERE_PLCG_COD,
        CERE_TICR_COD
    FROM
        CENTRO_RESULTADO
    WHERE
        CERE_IND_BLOQ = 'N'
    AND
        CERE_CENTRO_CONSUMO = 'S'
    AND
        CERE_COD
    IN 
        (
            SELECT
                RECA_CERE_COD
            FROM
                REL_CERE_ALMOX
            WHERE
                RECA_ALMO_COD = ${almoCod}
        )
    AND
        CERE_COD
    IN
        (
            SELECT
                USCR_CERE_COD
            FROM
                USUARIO_CR
            WHERE
                USCR_USUA_COD = ${usuaCod}
        )
  `
}

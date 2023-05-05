export const selectAllAlmo = () => {
  return `
        SELECT
            ALMO_COD,
            ALMO_DESC
        FROM
            ALMOXARIFADO
        WHERE
            ALMO_IND_BLOQUEADO = 'N'
  `
}

export const selectAlmoRelCere = (codUsua: string) => {
  return `
    SELECT 
        DISTINCT  ALMO_COD, 
        ALMO_DESC
    FROM  
        ALMOXARIFADO
    INNER JOIN
        REL_CERE_ALMOX
    ON
        ALMO_COD = RECA_ALMO_COD
    WHERE  
        ALMO_IND_BLOQUEADO = 'N'
    AND  
        RECA_CERE_COD 
    IN 
        (
            SELECT 
                USCR_CERE_COD
            FROM 
                USUARIO_CR
            WHERE
                USCR_USUA_COD = ${codUsua}
        )
    `
}

export const SelectalmoRelUsuario = (codUsua: string) => {
  return `
    SELECT 
        DISTINCT  ALMO_COD,
        ALMO_DESC
    FROM  
        ALMOXARIFADO
    WHERE  
        ALMO_IND_BLOQUEADO = 'N'
    AND  
        ALMO_COD 
    IN 
        ( 
            SELECT 
                REUA_ALMO_COD 
            FROM 
                REL_USUARIO_ALMOX
            WHERE
                REUA_USUA_COD = ${codUsua}
        )
    `
}

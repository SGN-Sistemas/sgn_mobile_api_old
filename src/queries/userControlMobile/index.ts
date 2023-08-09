export const queryTransformN = (cnpj: string, sigla: string) => {
  return `
    USE [MOBILE_CCONNECTION]
    UPDATE
        USER_CONTROL_MOBILE
    SET 
        USCM_ATIVO = 'N'
    WHERE
        (
            SELECT 
            DATEDIFF
                (
                    HOUR,
                    USCM_DATA_HORA_ENTRADA,
                    GETDATE()
                ) 
            AS 
                HOUR 
            FROM 
                USER_CONTROL_MOBILE
            INNER JOIN
                DATA_CONNECTION
            ON
                DACO_COD = USCM_DACO_COD   
            WHERE
                USCM_USUA_SIGLA = '${sigla}'
            AND
                DACO_CNPJ = '${cnpj}'
        ) > 2
    `
}

export const licenseQuantity = (cnpj: string) => {
  return `
        USE [MOBILE_CCONNECTION]
        SELECT 
           ( (
                SELECT
                    COAC_LICENCA
                FROM
                    CONTROLE_ACESSO
                INNER JOIN
                    DATA_CONNECTION
                ON
                    DACO_COD = COAC_DACO_COD
                WHERE 
                    DACO_CNPJ = '${cnpj}'
            )
        -
            (
                SELECT
                    COUNT(USCM_USUA_SIGLA)
                FROM
                    USER_CONTROL_MOBILE
                INNER JOIN
                    DATA_CONNECTION
                ON
                    DACO_COD = USCM_DACO_COD    
                WHERE
                    USCM_ATIVO = 'S'
                AND
                    DACO_CNPJ = '${cnpj}'
                
            )) as FREE_LICENSE
        FROM
            CONTROLE_ACESSO
            INNER JOIN
            DATA_CONNECTION
        ON
            DACO_COD = USCM_DACO_COD    
        WHERE
            DACO_CNPJ = '${cnpj}'
                
    `
}

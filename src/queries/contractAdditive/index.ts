export const selectAditivoContrato1 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '1' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_APROVADO != 'S'
    AND
      ADCS_ASSINATURA_1 != 'S'
    AND
      ADCS_USUA_COD_ASS_1 = ${cod}
    ${queryString}
  `
}

export const selectAditivoContrato2 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '2' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_APROVADO != 'S'
    AND
      ADCS_ASSINATURA_1 = 'S'
    AND
      ADCS_ASSINATURA_2 != 'S'
    AND
      ADCS_USUA_COD_ASS_2 = ${cod}
    ${queryString}
  `
}

export const selectAditivoContrato3 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '3' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_APROVADO != 'S'
    AND
      ADCS_ASSINATURA_1 = 'S'
    AND
      ADCS_ASSINATURA_2 = 'S'
    AND
      ADCS_ASSINATURA_3 != 'S'
    AND
      ADCS_USUA_COD_ASS_3 = ${cod}
    ${queryString}
  `
}

export const selectAditivoContrato4 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      ADCS_COD,
      ADCS_QUANTIDADE,
      ADCS_VLR_UNIT,
      ADCS_DESC,
      ADCS_COCS_COD,
      ADCS_APROVADO,
      ADCS_SERV_COD,
      SERV_COD,
      ADCS_DATA_INI,
      ADCS_DATA_FIM,
      ADCS_OBS,
      ADCS_NUMERO,
      (ADCS_QUANTIDADE * ADCS_VLR_UNIT) 
    AS 
      VALOR_TOTAL,
      '4' 
    AS 
      ASS
    FROM
      ADITIVO_CONTRATO_SERVICO
    INNER JOIN 
      SERVICOS
    ON
      SERV_COD = ADCS_SERV_COD
    WHERE
      ADCS_APROVADO != 'S'
    AND
      ADCS_ASSINATURA_1 = 'S'
    AND
      ADCS_ASSINATURA_2 = 'S'
    AND
      ADCS_ASSINATURA_3 = 'S'
    AND
      ADCS_ASSINATURA_4 != 'S'
    AND
      ADCS_USUA_COD_ASS_4 = ${cod}
    ${queryString}
  `
}

export const updateAditivoContrato = (pos: string, cod: string, queryString: string) => {
  return `
    UPDATE 
      ADITIVO_CONTRATO_SERVICO
    SET 
      ADCS_ASSINATURA_${pos} = 'S'
      ${queryString}
    WHERE
      ADCS_COD = ${cod}
  `
}

export const countNumAprovAditivoContrato = (cod: string) => {
  return `
    SELECT
      (
        (
          SELECT
            COUNT(ADCS_ASSINATURA_1)
          FROM
            ADITIVO_CONTRATO_SERVICO
          WHERE
            ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_1 = 'S' 
        )
          +
        (
          SELECT
            COUNT(ADCS_ASSINATURA_2)
          FROM
            ADITIVO_CONTRATO_SERVICO
          WHERE
            ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_2 = 'S' 
        )
          +
        (
          SELECT
              COUNT(ADCS_ASSINATURA_3)
          FROM
              ADITIVO_CONTRATO_SERVICO
          WHERE
              ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
              COUNT(ADCS_ASSINATURA_4)
          FROM
              ADITIVO_CONTRATO_SERVICO
          WHERE
              ADCS_COD = ${cod}
          AND 
            ADCS_ASSINATURA_4 = 'S' 
        )
      ) AS NUM
    FROM
      ADITIVO_CONTRATO_SERVICO
    WHERE
        ADCS_COD = ${cod}
  `
}

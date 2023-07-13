export const updatePRCS = (pos: string, cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    UPDATE 
      PRAZO_CONTRATO_SERVICO 
    SET 
      PRCS_ASSINATURA_${pos} = 'S'
      ${queryString}
    WHERE
      PRCS_COD = ${cod}
  `
}

export const selectPrazoContratoServico1 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '1' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_APROVADO != 'S'
    AND    
      PRCS_USUA_COD_ASS_1 = ${cod}
    AND
      PRCS_ASSINATURA_1 != 'S'
    ${queryString}
  `
}

export const selectPrazoContratoServico2 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '2' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_APROVADO != 'S'
    AND    
      PRCS_USUA_COD_ASS_2 = ${cod}
    AND
      PRCS_ASSINATURA_1 = 'S'
    AND
      PRCS_ASSINATURA_2 != 'S'
    ${queryString}
  `
}

export const selectPrazoContratoServico3 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '3' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_APROVADO != 'S'
    AND    
      PRCS_USUA_COD_ASS_3 = ${cod}
    AND
      PRCS_ASSINATURA_1 = 'S'
    AND
      PRCS_ASSINATURA_2 = 'S'
    AND
      PRCS_ASSINATURA_3 != 'S'     
    ${queryString}
  `
}

export const selectPrazoContratoServico4 = (cod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      PRCS_COCS_COD,
      PRCS_COD,
      PRCS_DATA_INI,
      FORN_NOME,
      PRCS_DATA_CADASTRO,
      PRCS_DATA_FIM,
      PRCS_OBS,
      PRCS_NUMERO,
      '4' AS ASS
    FROM
      PRAZO_CONTRATO_SERVICO
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      PRCS_COCS_COD =  COCS_COD
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE
      PRCS_APROVADO != 'S'
    AND
      PRCS_USUA_COD_ASS_4 = ${cod}
    AND
      PRCS_ASSINATURA_1 = 'S'
    AND
      PRCS_ASSINATURA_2 = 'S'
    AND
      PRCS_ASSINATURA_3 = 'S'      
    AND
      PRCS_ASSINATURA_4 != 'S'
    ${queryString}
  `
}

export const countNumAprovAditivoContratoPR = (cod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      (
        (
          SELECT
            COUNT(PRCS_ASSINATURA_1)
          FROM
            PRAZO_CONTRATO_SERVICO
          WHERE
            PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_1 = 'S' 
        )
          +
        (
          SELECT
            COUNT(PRCS_ASSINATURA_2)
          FROM
            PRAZO_CONTRATO_SERVICO
          WHERE
            PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_2 = 'S' 
        )
          +
        (
          SELECT
              COUNT(PRCS_ASSINATURA_3)
          FROM
              PRAZO_CONTRATO_SERVICO
          WHERE
              PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
              COUNT(PRCS_ASSINATURA_4)
          FROM
              PRAZO_CONTRATO_SERVICO
          WHERE
              PRCS_COD = ${cod}
          AND 
            PRCS_ASSINATURA_4 = 'S' 
        )
      ) AS NUM
    FROM
      PRAZO_CONTRATO_SERVICO
    WHERE
        PRCS_COD = ${cod}
  `
}

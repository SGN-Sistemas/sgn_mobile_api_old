export const selectPurchaseWorksheet = (
  cod: string,
  pos: string,
  database: string,
  queryString: string,
  queryPos: string
) => {
  return `
    USE [${database}]
    SELECT 
        PLAC_SECO_COD,
        PLAC_COD,
        PLAC_PESS_COD,
        PLAC_STATUS,
        '${pos}' AS ASS,
        SECO_DESC,
        PESS_NOME
    FROM
        PLANILHA_COMPRA
    INNER JOIN
        PESSOAL
    ON 
        PESS_COD = PLAC_PESS_COD
    INNER JOIN 
        SETOR_COMPRAS
    ON
        SECO_COD = PLAC_SECO_COD
    WHERE
        PLAC_USUA_COD_ASS_${pos} = ${cod}
    ${queryPos}
    ${queryString}
  `
}

export const listSoliPlac = (placCod: string, database: string) => {
  return `
      USE [${database}]
      SELECT
        SOCO_COD,
        MATE_COD,
        MATE_DESC,
        ALMO_COD,
        ALMO_DESC,
        SOCO_DTNECE,
        SOCO_QTD_NECE,
        UNMA_SIGLA,
        UNMA_COD,
        SOCO_OBS,
        MATE_REFERENCIA,
        PESS_COD,
        PESS_NOME,
        SOCO_PLAC_OBS,
        SOCO_DTPRAZORESP,
        CERE_COD,
        CONCAT(CERE_SIGLA, ' - ', CERE_NOME) 
      AS 
        CERE,
        CONCAT(ITPC_SIGLA, ' - ', ITPC_DESC) 
      AS 
        ITPC, 
        ITPC_COD,
        FORN_NOME,
        'M' 
      AS 
        TIPO
      FROM
        MATERIAL,
        UNID_MAT,
        SOLICITACAO_COMPRA
      LEFT OUTER JOIN 
        PESSOAL 
      ON 
        SOCO_PESS_COD = PESS_COD
      LEFT OUTER JOIN  
        ITEM_PCG 
      ON 
        SOCO_ITPC_RATEIO_COD = ITPC_COD
      LEFT OUTER JOIN 
        CENTRO_RESULTADO 
      ON 
        SOCO_CERE_COD = CERE_COD
      LEFT OUTER JOIN 
        FORNECEDOR 
      ON 
        SOCO_FORN_COD_SEL = FORN_COD,
        ALMOXARIFADO
      where   
        MATE_COD = SOCO_MATE_COD
      AND     
        ALMO_COD = SOCO_ALMO_COD
      AND      
        UNMA_COD = SOCO_UNMA_COD
      AND  
        SOCO_STATUS = 'PC'
      AND      
        SOCO_PLAC_COD =  ${placCod} 
      ORDER BY
        MATE_DESC, 
        UNMA_sigla
      `
}

export const listSoliPlacServ = (placCod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      SOCO_COD,
      SERV_COD,
      SERV_DESC,
      ALMO_COD,
      ALMO_DESC,
      SOCO_DTNECE,
      SOCO_QTD_NECE,
      UNMA_SIGLA,
      UNMA_COD,
      SOCO_OBS,
      SERV_REFERENCIA,
      PESS_COD,
      PESS_NOME,
      SOCO_PLAC_OBS,
      SOCO_DTPRAZORESP,
      CERE_COD,
      CONCAT(CERE_SIGLA, ' - ', CERE_NOME) 
    AS 
      CERE,
      CONCAT(ITPC_SIGLA, ' - ', ITPC_DESC) 
    AS 
      ITPC, 
      ITPC_COD,
      FORN_NOME,
      'S' 
    AS 
      TIPO
    FROM
      SERVICOS,
      UNID_MAT,
      SOLICITACAO_COMPRA
    LEFT OUTER JOIN 
      PESSOAL 
    ON 
      SOCO_PESS_COD = PESS_COD
    LEFT OUTER JOIN  
      ITEM_PCG 
    ON 
      SOCO_ITPC_RATEIO_COD = ITPC_COD
    LEFT OUTER JOIN 
      CENTRO_RESULTADO 
    ON 
      SOCO_CERE_COD = CERE_COD
    LEFT OUTER JOIN 
      FORNECEDOR 
    ON 
      SOCO_FORN_COD_SEL = FORN_COD,
      ALMOXARIFADO
    where   
      SERV_COD = SOCO_SERV_COD
    AND     
      ALMO_COD = SOCO_ALMO_COD
    AND      
      UNMA_COD = SOCO_UNMA_COD
    AND  
      SOCO_STATUS = 'PC'
    AND      
      SOCO_PLAC_COD =  ${placCod} 
    ORDER BY
      SERV_DESC, 
      UNMA_sigla
    `
}

export const countNumAprovaPlacCompra = (cod:string, database:string) => {
  return `
    USE [${database}]
    SELECT
      (      
        (
        SELECT
          COUNT(PLAC_USUA_COD_ASS_1)
        FROM
          PLANILHA_COMPRA
        WHERE
          PLAC_COD = ${cod}
        AND 
          PLAC_ASSINATURA_1 = 'S' 
        )
          +
        ( 
          SELECT
            COUNT(PLAC_USUA_COD_ASS_2)
          FROM
            PLANILHA_COMPRA
          WHERE
            PLAC_COD = ${cod}
          AND
            PLAC_ASSINATURA_2 = 'S'
        )
      ) as NUM
    FROM
      PLANILHA_COMPRA
    WHERE
      PLAC_COD = ${cod}
`
}

export const updateAssPlac = (
  placCod: string,
  posCod: string,
  sqlQuery: string,
  database: string
) => {
  return `
  USE [${database}]
  UPDATE 
      PLANILHA_COMPRA
  SET
      PLAC_ASSINATURA_${posCod} = 'S',
      ${sqlQuery}
      PLAC_DATA_APROVACAO${posCod} = GETDATE()

  WHERE
      PLAC_COD = ${placCod}
`
}

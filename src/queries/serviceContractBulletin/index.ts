
export const selectBoletim1 = (usuaCod: string) => {
  return `
    SELECT
      BOCS_COD,
      FORN_NOME,
      BOCS_DATA,
      BOCS_DT_INICIO,
      BOCS_DT_FIM,
      BOCS_STATUS,
      BOCS_OBS,
      BOCS_USUA_COD_ASS_1,
      BOCS_ASSINATURA_1,
      BOCS_NUMERO,
      BOCS_DT_VENC,
      '1' AS ASS,
      (
        SELECT
          SUM(BCSI_QUANTIDADE)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) AS QTD,
           (
        SELECT
          SUM(BCSI_VLR_UNIT)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) 
    AS 
      VAL_UNIT
    FROM
      BOLETIM_CONTRATO_SERVICO
    INNER JOIN
      CONTRATO_COMPRA_SERVICO
    ON
      BOCS_COCS_COD =  COCS_COD 
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE 
      BOCS_USUA_COD_ASS_1 = ${usuaCod}
  `
}

export const selectBoletim2 = (usuaCod: string) => {
  return `
    SELECT
      BOCS_COD,
      FORN_NOME,
      BOCS_DATA,
      BOCS_DT_INICIO,
      BOCS_DT_FIM,
      BOCS_STATUS,
      BOCS_OBS,
      BOCS_USUA_COD_ASS_2,
      BOCS_ASSINATURA_2,
      BOCS_NUMERO,
      BOCS_DT_VENC,
      '2' AS ASS,
      (
        SELECT
          SUM(BCSI_QUANTIDADE)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) AS QTD,
           (
        SELECT
          SUM(BCSI_VLR_UNIT)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) 
    AS 
      VAL_UNIT
    FROM
      BOLETIM_CONTRATO_SERVICO
    INNER JOIN
      CONTRATO_COMPRA_SERVICO
    ON
      BOCS_COCS_COD =  COCS_COD 
    INNER JOIN
      FORNECEDOR
    ON
      COCS_FORN_COD =  FORN_COD
    WHERE 
      BOCS_USUA_COD_ASS_2 = ${usuaCod}
    AND
      BOCS_ASSINATURA_1 = 'S'
  `
}

export const boletimMedicaoDetalhe = (codigo: string) => {
  return `
    SELECT
      BCSI_SERV_COD,
      SERV_DESC,
      BCSI_BOCS_COD,
      BCSI_QUANTIDADE,
      BCSI_VLR_UNIT
    FROM 
      BOLETIM_CONTRATO_SERVICO_ITENS
    INNER JOIN
      SERVICOS
    ON 
      BCSI_SERV_COD = SERV_COD
    WHERE
      BCSI_BOCS_COD = ${codigo}
  `
}

export const updateBoletim = (pos: string, statusUpdate: string, cod: string) => {
  return `
    UPDATE 
      BOLETIM_CONTRATO_SERVICO
    SET 
      BOCS_ASSINATURA_${pos} = 'S',
      ${statusUpdate}
      BOCS_DATA_APROVACAO${pos} = GETDATE()
    WHERE
      BOCS_COD = ${cod}
  `
}

export const countNumAprovaBoletim = (cod: string) => {
  return `
    SELECT
      (      
        (
        SELECT
          COUNT(BOCS_USUA_COD_ASS_1)
        FROM
          BOLETIM_CONTRATO_SERVICO
        WHERE
          BOCS_COD = ${cod}
        AND 
          BOCS_ASSINATURA_1 = 'S' 
        )
          +
        ( 
          SELECT
            COUNT(BOCS_USUA_COD_ASS_2)
          FROM
            BOLETIM_CONTRATO_SERVICO
          WHERE
            BOCS_COD = ${cod}
          AND
            BOCS_ASSINATURA_2 = 'S'
        )
      ) as NUM
    FROM
      BOLETIM_CONTRATO_SERVICO
    WHERE
      BOCS_COD = ${cod}
  `
}

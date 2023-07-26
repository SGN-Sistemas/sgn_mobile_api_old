import data1Mes from '../../utils/pega1Mes'
import dataAtual from '../../utils/pegaDataAtual'

export const selectBoletimApprovaded = (usuaCod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      BOCS_COD,
      FORN_NOME,
      BOCS_DATA,
      BOCS_DT_INICIO,
      BOCS_DT_FIM,
      BOCS_STATUS,
      BOCS_OBS,
      BOCS_NUMERO,
      BOCS_DT_VENC,
      COCS_COD,
      COCS_CERE_COD,
      COCS_FORN_COD,
      (
        SELECT
          ISNULL(SUM(BCSI_QUANTIDADE),0)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) AS QTD,
      (
        SELECT
          ISNULL(SUM(BCSI_VLR_UNIT),0)
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
      (
          BOCS_USUA_COD_ASS_1 = ${usuaCod}
        AND
          BOCS_ASSINATURA_1 = 'S'
      )
    OR
      (
          BOCS_USUA_COD_ASS_2 = ${usuaCod}
        AND
          BOCS_ASSINATURA_2 = 'S'
      )
    AND 
    EXISTS (
      SELECT
        1
      FROM
        BOLETIM_CONTRATO_SERVICO_ITENS
      WHERE
        BCSI_BOCS_COD = BOCS_COD
    )
  `
}

export const selectBoletim1 = (usuaCod: string, database: string, queryString: string) => {
  return `
    USE [${database}]
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
      COCS_COD,
      COCS_CERE_COD,
      COCS_FORN_COD,
      (
        SELECT
          ISNULL(SUM(BCSI_QUANTIDADE),0)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) AS QTD,
      (
        SELECT
          ISNULL(SUM(BCSI_VLR_UNIT),0)
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
    AND 
      BOCS_ASSINATURA_1 != 'S'
    AND
      BOCS_STATUS
    IN
      ('CA','')

    AND

    EXISTS (
      SELECT
        1
      FROM
        BOLETIM_CONTRATO_SERVICO_ITENS
      WHERE
        BCSI_BOCS_COD = BOCS_COD
    )
    ${queryString}
  `
}

export const selectBoletim2 = (usuaCod: string, database: string, queryString: string) => {
  return `
    USE [${database}]
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
      COCS_COD,
      COCS_CERE_COD,
      COCS_FORN_COD,
      (
        SELECT
          ISNULL(SUM(BCSI_QUANTIDADE),0)
        FROM
          BOLETIM_CONTRATO_SERVICO_ITENS
        WHERE
          BCSI_BOCS_COD = BOCS_COD
      ) AS QTD,
           (
        SELECT
          ISNULL(SUM(BCSI_VLR_UNIT),0)
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
    AND 
      BOCS_ASSINATURA_2 != 'S'
    AND 
      BOCS_STATUS
    IN
      ('CA','')
    
      AND

    EXISTS (
      SELECT
        1
      FROM
        BOLETIM_CONTRATO_SERVICO_ITENS
      WHERE
        BCSI_BOCS_COD = BOCS_COD
    )
    ${queryString}
  `
}

export const boletimMedicaoDetalhe = (codigo: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      BCSI_SERV_COD,
      SERV_DESC,
      BCSI_BOCS_COD,
      BCSI_QUANTIDADE,
      BCSI_VLR_UNIT,
      CONCAT(UNMA_SIGLA, ' - ', UNMA_DESC) AS UNID
    FROM 
      BOLETIM_CONTRATO_SERVICO_ITENS
    INNER JOIN
      SERVICOS
    ON 
      BCSI_SERV_COD = SERV_COD
    INNER JOIN 
      UNID_MAT
    ON
      SERV_UNMA_COD = UNMA_COD
    WHERE
      BCSI_BOCS_COD = ${codigo}
  `
}

export const updateBoletim = (pos: string, statusUpdate: string, cod: string, database: string) => {
  return `
    USE [${database}]
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

export const countNumAprovaBoletim = (cod: string, database: string) => {
  return `
    USE [${database}]
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

const dataIni = data1Mes()

const dataFim = dataAtual()

export const pegaValorAprovCrSql = (cereCod: string, usuaCod: string, database: string) => {
  return `
  USE [${database}]
  SELECT
    DISTINCT(COCS_COD),
  SUM((
      BCSI_QUANTIDADE
    *
      BCSI_VLR_UNIT
    )) 
  as 
    valorTotal
  FROM
    BOLETIM_CONTRATO_SERVICO_ITENS
  INNER JOIN
    BOLETIM_CONTRATO_SERVICO
  ON
    BOCS_COD = BCSI_BOCS_COD
  INNER JOIN 
    CONTRATO_COMPRA_SERVICO
  ON
    COCS_COD = BOCS_COCS_COD
  WHERE
    COCS_CERE_COD = ${cereCod}
  AND
    (
      BOCS_USUA_COD_ASS_1 = ${usuaCod}
  OR
      BOCS_USUA_COD_ASS_2 = ${usuaCod}
    )
  AND
    BOCS_DATA <= '${dataIni}'
  AND   
    BOCS_DATA >= '${dataFim}'
  AND
    BOCS_STATUS = 'AP'
  GROUP BY
    COCS_COD
  `
}

export const pegaValorAprovCrFornSql = (cereCod: string, fornCod: string, usuaCod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      DISTINCT(COCS_COD),
    SUM((
        BCSI_QUANTIDADE
      *
        BCSI_VLR_UNIT
      )) 
    as 
      valorTotal
    FROM
      BOLETIM_CONTRATO_SERVICO_ITENS
    INNER JOIN
      BOLETIM_CONTRATO_SERVICO
    ON
      BOCS_COD = BCSI_BOCS_COD
    INNER JOIN 
      CONTRATO_COMPRA_SERVICO
    ON
      COCS_COD = BOCS_COCS_COD
    WHERE
      COCS_CERE_COD = ${cereCod}
    AND 
      COCS_FORN_COD = ${fornCod}
    AND
      (
        BOCS_USUA_COD_ASS_1 = ${usuaCod}
    OR
        BOCS_USUA_COD_ASS_2 = ${usuaCod}
      )
    AND
      BOCS_DATA <= '${dataIni}'
    AND   
      BOCS_DATA >= '${dataFim}'
    AND
      BOCS_STATUS = 'AP'
    GROUP BY
      COCS_COD
  `
}

// <ButtonSelectFilter
// text={crDesc}
// handleClick={
//     () => {
//       setModalCr(!modalCr)
//     }
// }
// />


export const queryPegaTokenUserCocs = (cocsCod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      COCS_USUA_COD_ASS_1,
      COCS_USUA_COD_ASS_2,
      COCS_USUA_COD_ASS_3,
      COCS_USUA_COD_ASS_4,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = COCS_USUA_COD_ASS_1
      ) 
    AS
      EXPO_TOKEN_1,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = COCS_USUA_COD_ASS_2
      ) 
    AS 
      EXPO_TOKEN_2,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = COCS_USUA_COD_ASS_3
      ) 
    AS 
      EXPO_TOKEN_3,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = COCS_USUA_COD_ASS_4
      ) 
    AS 
      EXPO_TOKEN_4
    FROM 
      CONTRATO_COMPRA_SERVICO
    WHERE 
      COCS_COD = ${cocsCod}
  `
}

export const selectServiceContract1 = (usuaCod: string, queryString: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '1' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA,
      LOCA_DESC,
      COCS_LOCA_COD                                                          
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
        INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    INNER JOIN
      LOCAL
    ON 
      LOCA_COD = COCS_LOCA_COD
    WHERE
      COCS_STATUS = 'CA'
    AND
      COCS_USUA_COD_ASS_1 = ${usuaCod}
    AND 
      COCS_ASSINATURA_1 != 'S'
    AND
      COCS_STATUS != 'AP'
    ${queryString}
  `
}

export const selectServiceContract2 = (usuaCod: string, queryString: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '2' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA,
      LOCA_DESC,
      COCS_LOCA_COD                                                                      
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
        INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    INNER JOIN
      LOCAL
    ON 
      LOCA_COD = COCS_LOCA_COD
    WHERE
      COCS_STATUS = 'CA'
    AND    
      COCS_USUA_COD_ASS_2 = ${usuaCod}
    AND 
      COCS_ASSINATURA_2 != 'S'
    AND 
      COCS_ASSINATURA_1 = 'S'
    AND
      COCS_STATUS != 'AP'
    ${queryString}
  `
}

export const selectServiceContract3 = (usuaCod: string, queryString: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '3' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA,
      LOCA_DESC,
      COCS_LOCA_COD                                                          
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
          INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    INNER JOIN
      LOCAL
    ON 
      LOCA_COD = COCS_LOCA_COD
    WHERE
      COCS_STATUS = 'CA'
    AND
      COCS_USUA_COD_ASS_3 = ${usuaCod}
    AND 
      COCS_ASSINATURA_3 != 'S'
    AND 
      COCS_ASSINATURA_1 = 'S'
    AND
      COCS_ASSINATURA_2 = 'S'
    AND
      COCS_STATUS != 'AP'
    ${queryString}
  `
}
export const selectServiceContract4 = (usuaCod: string, queryString: string) => {
  return `
    SELECT 
      COCS_DT_INICIO,
      COCS_DT_FIM,
      COCS_FORN_COD,
      COCS_TERC_COD,
      COCS_CERE_COD,
      COCS_SERV_COD,
      COCS_QUANTIDADE,
      COCS_VLR_UNIT,
      COCS_FORMA_PAGAMENTO,
      COCS_PRAZO,
      COCS_EMPR_COD,
      COCS_FILI_COD,
      COCS_DATA_APROVACAO1,
      COCS_DT_CONTRATO,
      COCS_TIPO_MEDICAO,
      SERV_DESC,
      FORN_NOME,
      '4' AS ASS,
      COCS_COD,
      (
        SELECT 
          SUM(ICCS_QUANTIDADE * ICCS_VLR_UNIT)
        FROM
          ITEM_CONTRATO_COMPRA_SERVICO
        WHERE
          ICCS_COCS_COD = COCS_COD     
      ) AS VALOR_TOTAL,
      EMPR_NOME,
      FILI_NOME_FANTASIA,
      LOCA_DESC,
      COCS_LOCA_COD
    FROM
      CONTRATO_COMPRA_SERVICO
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = COCS_FORN_COD
    INNER JOIN
      SERVICOS
    ON
      SERV_COD = COCS_SERV_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = COCS_CERE_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = COCS_EMPR_COD
    INNER JOIN
      FILIAL
    ON
      FILI_COD = COCS_FILI_COD
    INNER JOIN
      LOCAL
    ON 
      LOCA_COD = COCS_LOCA_COD
    WHERE
      COCS_STATUS = 'CA'
    AND
      COCS_USUA_COD_ASS_4 = ${usuaCod}
    AND 
      COCS_ASSINATURA_4 != 'S'
    AND 
      COCS_ASSINATURA_1 = 'S'
    AND
      COCS_ASSINATURA_2 = 'S'
    AND
      COCS_ASSINATURA_3 = 'S'
    AND
      COCS_STATUS != 'AP'
    ${queryString}
  `
}

export const countNumAprov = (cod: string) => {
  return `
    SELECT
      (
        (
          SELECT
            COUNT(COCS_ASSINATURA_1)
          FROM
            CONTRATO_COMPRA_SERVICO
          WHERE
            COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_1 = 'S' 
        )
          +
        (
          SELECT
            COUNT(COCS_ASSINATURA_2)
          FROM
            CONTRATO_COMPRA_SERVICO
          WHERE
            COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_2 = 'S' 
        )
          +
        (
          SELECT
              COUNT(COCS_ASSINATURA_3)
          FROM
              CONTRATO_COMPRA_SERVICO
          WHERE
              COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
              COUNT(COCS_ASSINATURA_4)
          FROM
              CONTRATO_COMPRA_SERVICO
          WHERE
              COCS_COD = ${cod}
          AND 
            COCS_ASSINATURA_4 = 'S' 
        )
      ) AS NUM
    FROM
      CONTRATO_COMPRA_SERVICO
    WHERE
        COCS_COD = ${cod}
  `
}

export const attContratoCompraServico = (cod: string, ass: string, statusQuery: string) => {
  return `
    UPDATE
      CONTRATO_COMPRA_SERVICO
    SET 
      COCS_ASSINATURA_${ass} = 'S',
      ${statusQuery}
      COCS_DATA_APROVACAO${ass} = GETDATE()
    WHERE
      COCS_COD = ${cod}
  `
}

export const selectDetailsServiceContract = (cod: string) => {
  return `
    SELECT 
      ICCS_ITPC_COD_FINANC,
      ICCS_VLR_UNIT_ATUAL,
      ICCS_DESCONTO,
      ICCS_DATA_CONCLUSAO,
      ICCS_OBS,
      ICCS_UNMA_COD,
      ICCS_VLR_UNIT,
      ICCS_QUANTIDADE,
      ICCS_PROJ_COD,
      ICCS_ETPR_COD,
      ICCS_DECO_COD,
      ICCS_SEFE_COD,
      SERV_DESC,
      UNMA_DESC,
      UNMA_SIGLA,
      (
        SELECT
          PROJ_DESC
        FROM 
          PROJETO
        WHERE
          PROJ_COD = ICCS_PROJ_COD
      ) AS PROJETO,
      (
        SELECT
          ETPR_DESC
        FROM
          ETAPA_PROJETO
        WHERE
          ETPR_COD  = ICCS_ETPR_COD
      ) AS ETAPA_PROJETO,
      (
        SELECT
          DECO_DESC
        FROM
          DESCONTO
        WHERE
          DECO_COD  = ICCS_DECO_COD
      ) AS DESCONTO,
      (
        SELECT
          SEFE_DESC
        FROM
          SERVICOS_FINS_ESPECIFICOS
        WHERE
          SEFE_COD = ICCS_SEFE_COD
      ) AS SERVICOS_FINS_ESPECIFICOS
    FROM
      ITEM_CONTRATO_COMPRA_SERVICO
    INNER JOIN
      SERVICOS
    ON
      SERV_COD  = ICCS_SERV_COD
    INNER JOIN 
      UNID_MAT
    ON 
      UNMA_COD  = ICCS_UNMA_COD
    WHERE
      ICCS_COCS_COD = ${cod}
  `
}

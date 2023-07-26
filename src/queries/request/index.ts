export const queryPegaTokenUserSql = (pediCod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      PEDI_USUA_COD_ASS_1,
      PEDI_USUA_COD_ASS_2,
      PEDI_USUA_COD_ASS_3,
      PEDI_USUA_COD_ASS_4,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = PEDI_USUA_COD_ASS_1
      ) 
    AS
      EXPO_TOKEN_1,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = PEDI_USUA_COD_ASS_2
      ) 
    AS 
      EXPO_TOKEN_2,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = PEDI_USUA_COD_ASS_3
      ) 
    AS 
      EXPO_TOKEN_3,
      (
        SELECT 
          USUA_APP_TOKEN
        FROM
          USUARIO
        WHERE
          USUA_COD = PEDI_USUA_COD_ASS_4
      ) 
    AS 
      EXPO_TOKEN_4
    FROM 
      PEDIDO_ESTOQUE
    WHERE 
      PEDI_COD = ${pediCod}
  `
}
export const countNumAprovaPedido = (cod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
      (      
        (
          SELECT
            COUNT(PEDI_USUA_COD_ASS_1)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_1 = 'S' 
        )
          +
        ( 
          SELECT
            COUNT(PEDI_USUA_COD_ASS_2)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_2 = 'S' 
        ) 
          +
        (
          SELECT
            COUNT(PEDI_USUA_COD_ASS_3)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_3 = 'S' 
        )
          +
        (
          SELECT
            COUNT(PEDI_USUA_COD_ASS_4)
          FROM
            PEDIDO_ESTOQUE
          WHERE
            PEDI_COD = ${cod}
          AND 
            PEDI_ASSINATURA_4 = 'S' 
        )
      ) as NUM
    FROM
      PEDIDO_ESTOQUE
    WHERE
      PEDI_COD = ${cod}
  `
}

export const updatePedidoASS = (pediCod: string, pos: string, sqlQuery: string, database: string) => {
  return `
    USE [${database}]
    UPDATE 
        PEDIDO_ESTOQUE
    SET
        PEDI_ASSINATURA_${pos} = 'S',
        ${sqlQuery}
        PEDI_DATA_APROVACAO${pos} = GETDATE()

    WHERE
        PEDI_COD = ${pediCod}
  `
}

export const selectPedidosItemServico = (pediCod: string, database: string) => {
  return `
    USE [${database}]
    SELECT 
        PEIT_VALORUNI AS VALOR_UNITARIO,
        UNMA_DESC AS DESCRICAO_MEDIDA,
        PEIT_DESCONTO AS DESCONTO ,
        PEIT_QTD AS QUANTIDADE,
        MATE_DESC AS DESCRICAO,
        PEIT_DTENTREGA AS DTENTREGA,
        PEIT_OBS AS OBSERVACAO,
        'PRODUTO' AS TIPO,
        PEIT_PEDI_COD AS CODIGO,
        (PEIT_VALORUNI * PEIT_QTD) AS VALOR_TOTAL,
        CONCAT(CERE_SIGLA, ' - ',CERE_NOME) AS CR,
        ALMO_DESC AS ALMOXARIFADO
    FROM 
        PEDIDO_ITEM
    INNER JOIN 
        UNID_MAT
    ON
        UNMA_COD = PEIT_UNMA_COD
    INNER JOIN
        MATERIAL
    ON
        MATE_COD = PEIT_MATE_COD
    INNER JOIN
        CENTRO_RESULTADO
    ON
        CERE_COD = PEIT_CERE_COD
    INNER JOIN
        ALMOXARIFADO
    ON
        PEIT_ALMO_COD = ALMO_COD
    WHERE 
        PEIT_PEDI_COD = ${pediCod}

    UNION ALL

    SELECT 
        PESE_VALOR_UNITARIO  AS VALOR_UNITARIO,
        UNMA_DESC AS DESCRICAO_MEDIDA,
        PESE_DESCONTO AS DESCONTO,
        PESE_QUANTIDADE AS QUANTIDADE,
        SERV_DESC AS DESCRICAO,
        GETDATE() AS DTENTREGA,
        PESE_OBS AS OBSERVACAO,
        'SERVICO' AS TIPO,
        PESE_PEDI_COD AS CODIGO,
        (PESE_VALOR_UNITARIO * PESE_QUANTIDADE) AS VALOR_TOTAL,
        CONCAT(CERE_SIGLA, ' - ',CERE_NOME) AS CR,
        ALMO_DESC AS ALMOXARIFADO
    FROM 
        PEDIDO_SERVICO
    INNER JOIN 
        UNID_MAT
    ON
        UNMA_COD = PESE_UNMA_COD
    INNER JOIN
        SERVICOS
    ON
        SERV_COD = PESE_SERV_COD
    INNER JOIN
        CENTRO_RESULTADO
    ON
        CERE_COD = PESE_CERE_COD
    INNER JOIN
        ALMOXARIFADO
    ON
        PESE_ALMO_COD = ALMO_COD
    WHERE 
        PESE_PEDI_COD = ${pediCod}
        ORDER BY 
    CODIGO
    `
}

export const selectPedidoEstoque1 = (usuaCod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT  TOP 100
      PEDI_TOTAL_MERC,
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO,0) 
                * 
              ISNULL(PESE_QUANTIDADE,0)
              -
              ISNULL(PESE_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PEIT_VALORUNI,0) 
                * 
              ISNULL(PEIT_QTD,0)
                -
              ISNULL(PEIT_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_ITEM
        WHERE
          PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    WHERE
      PEDI_USUA_COD_ASS_1 =   ${usuaCod}
    AND 
      PEDI_ASSINATURA_1 != 'S'
    AND
      PEDI_STATUS != 'A' 
    AND 
      PEDI_STATUS != 'C' 
    ${queryString}
    ORDER BY
      PEDI_DATA DESC
  `
}

export const selectPedidoEstoque2 = (usuaCod: string, queryString: string, database: string) => {
  return ` 
    USE [${database}]
    SELECT  TOP 100
      PEDI_OBS, 
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      2 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,  
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO,0) 
                * 
              ISNULL(PESE_QUANTIDADE,0)
              -
              ISNULL(PESE_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PEIT_VALORUNI,0) 
                * 
              ISNULL(PEIT_QTD,0)
                -
              ISNULL(PEIT_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_ITEM
        WHERE
          PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
        PEDIDO_ESTOQUE
    INNER JOIN
        FORNECEDOR
    ON
        FORN_COD = PEDI_FORN_COD
    INNER JOIN
        EMPRESA
    ON
        EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    WHERE
        PEDI_USUA_COD_ASS_2 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_2 != 'S'
    AND 
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A' 
    AND 
      PEDI_STATUS != 'C' 
    ${queryString}
    ORDER BY
      PEDI_DATA DESC
  `
}

export const selectPedidoEstoque3 = (usuaCod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      3 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD, 
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO,0) 
                * 
              ISNULL(PESE_QUANTIDADE,0)
                -
              ISNULL(PESE_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PEIT_VALORUNI,0) 
                * 
              ISNULL(PEIT_QTD,0)
                -
              ISNULL(PEIT_DESCONTO,0)
            )
          ,0)
          FROM
            PEDIDO_ITEM
          WHERE
            PEIT_PEDI_COD = PEDI_COD
        ) 
      AS  
        VALOR_TOTAL_ITEM
    FROM
        PEDIDO_ESTOQUE
    INNER JOIN
        FORNECEDOR
    ON
        FORN_COD = PEDI_FORN_COD
    INNER JOIN
        EMPRESA
    ON
        EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD        
    WHERE
        PEDI_USUA_COD_ASS_3 =   ${usuaCod}
    AND 
        PEDI_ASSINATURA_3 != 'S'
    AND 
      PEDI_ASSINATURA_2 = 'S'
    AND 
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A' 
    AND 
      PEDI_STATUS != 'C' 
    ${queryString}
    ORDER BY
        PEDI_DATA DESC`
}

export const selectPedidoEstoque4 = (usuaCod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      4 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,  
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO,0) 
                * 
              ISNULL(PESE_QUANTIDADE,0)
                -
              ISNULL(PESE_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PEIT_VALORUNI,0) 
                * 
              ISNULL(PEIT_QTD,0)
                -
              ISNULL(PEIT_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_ITEM
        WHERE
          PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD      
    WHERE
      PEDI_USUA_COD_ASS_4 =   ${usuaCod}
    AND 
      PEDI_ASSINATURA_4 != 'S'
    AND 
      PEDI_ASSINATURA_3 = 'S'
    AND 
      PEDI_ASSINATURA_2 = 'S'
    AND 
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A' 
    AND 
      PEDI_STATUS != 'C'   
    ${queryString}
    ORDER BY
        PEDI_DATA DESC
    `
}

export const totalFornCerePedido = (cereCod: string, fornCod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT 
      AUX.FORNECEDOR,
      AUX.CR,
      SUM(AUX.VALOR) AS VALOR
    FROM 
      (
        SELECT 
          PEDI_FORN_COD AS FORNECEDOR,
          PEIT_CERE_COD AS CR,
          (
            ISNULL(PEIT_VALORUNI,0)
              * 
            ISNULL(PEIT_QTD,0)
              - 
            ISNULL(PEIT_DESCONTO,0) AS VALOR
          ) 
        FROM 
          PEDIDO_ITEM
        INNER JOIN 
          PEDIDO_ESTOQUE 
        ON 
          PEDI_COD = PEIT_PEDI_COD
        WHERE
          PEDI_FORN_COD = ${fornCod}
        AND
          PEIT_CERE_COD = ${cereCod}
          ${queryString}  
        
        UNION
        
        SELECT 
          PEDI_FORN_COD,
          PESE_CERE_COD,
          (
            ISNULL(PESE_VALOR_UNITARIO,0) 
              * 
            ISNULL(PESE_QUANTIDADE,0)
              - 
            ISNULL(PESE_DESCONTO,0) AS VALOR
          ) 
        FROM 
          PEDIDO_SERVICO
        INNER JOIN 
          PEDIDO_ESTOQUE 
        ON 
          PEDI_COD = PESE_PEDI_COD
        WHERE
          PEDI_FORN_COD = ${fornCod}
        AND
          PESE_CERE_COD = ${cereCod}
          ${queryString}
      ) AUX
    GROUP BY
      AUX.FORNECEDOR,AUX.CR
    ORDER BY
      AUX.FORNECEDOR,AUX.CR
  `
}

export const totalUsuaPedido = (usuaCod: string, queryString: string, database: string) => {
  return `
    USE [${database}]
    SELECT 
      PEDI_COD AS COD,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PEIT_VALORUNI,0)
                *
              ISNULL(PEIT_QTD,0)
                -
              ISNULL(PEIT_DESCONTO,0)
            )
          ,0)
        FROM
          PEDIDO_ITEM
        WHERE
          PEIT_PEDI_COD = PEDI_COD
      )
        +
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO,0) 
                * 
              ISNULL(PESE_QUANTIDADE,0)
                -
              ISNULL(PESE_DESCONTO,0)            
            )
          ,0)
        FROM 
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR
    FROM 
      PEDIDO_ESTOQUE
    WHERE
      PEDI_USUA_COD_ASS_4 = ${usuaCod}
    OR
      PEDI_USUA_COD_ASS_3 = ${usuaCod}
    OR
      PEDI_USUA_COD_ASS_2 = ${usuaCod}
    OR
      PEDI_USUA_COD_ASS_1 = ${usuaCod}      
    AND 
      PEDI_STATUS = 'AP'
    ${queryString}
  `
}

export const selectCerePeitPedi = (cod: string) => {
  return `
    SELECT
      PEIT_CERE_COD AS CERE_COD
    FROM
      PEDIDO_ITEM
    WHERE
      PEIT_PEDI_COD = ${cod}

    UNION

    SELECT
      PESE_CERE_COD AS CERE_COD
    FROM
      PEDIDO_SERVICO
    WHERE
      PESE_PEDI_COD = ${cod}
  `
}

export const selectPedidoEstoqueCere1 = (usuaCod: string, queryString: string, queryStringPese: string, queryStringPeit: string, database: string) => {
  return `
    USE [${database}] 
    SELECT  TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_SERVICO
    ON
      PESE_PEDI_COD = PEDI_COD
    WHERE
      PEDI_USUA_COD_ASS_1 = ${usuaCod}
    AND
      PEDI_ASSINATURA_1 != 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
      ${queryStringPese}
      ${queryString}

    UNION

    SELECT  TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_ITEM
    ON
      PEIT_PEDI_COD = PEDI_COD
    WHERE
      PEDI_USUA_COD_ASS_1 = ${usuaCod}
    AND
      PEDI_ASSINATURA_1 != 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
      ${queryStringPeit}
      ${queryString}
  `
}

export const selectPedidoEstoqueCere2 = (usuaCod: string, queryString: string, queryStringPese: string, queryStringPeit: string, database: string) => {
  return `
  USE [${database}] 
    SELECT  TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_SERVICO
    ON
      PESE_PEDI_COD = PEDI_COD
    WHERE
      PEDI_USUA_COD_ASS_2 = ${usuaCod}
    AND
      PEDI_ASSINATURA_2 != 'S'
    AND
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
      ${queryStringPese}
      ${queryString}


    UNION

    SELECT  TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_ITEM
    ON
      PEIT_PEDI_COD = PEDI_COD    
    WHERE
      PEDI_USUA_COD_ASS_2 = ${usuaCod}
    AND
      PEDI_ASSINATURA_2 != 'S'
    AND
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
      ${queryStringPeit}
      ${queryString}
  `
}

export const selectPedidoEstoqueCere3 = (usuaCod: string, queryString: string, queryStringPese: string, queryStringPeit: string, database: string) => {
  return `
    USE [${database}]
    SELECT  TOP 100
      PEDI_OBS, 
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_SERVICO
    ON
      PESE_PEDI_COD = PEDI_COD
    WHERE
      PEDI_USUA_COD_ASS_3 = ${usuaCod}
    AND
      PEDI_ASSINATURA_3 != 'S'    
    AND    
      PEDI_ASSINATURA_2 = 'S'
    AND
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
    ${queryStringPese}
    ${queryString}

    UNION

    SELECT  TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_ITEM
    ON
      PEIT_PEDI_COD = PEDI_COD
    WHERE
      PEDI_USUA_COD_ASS_3 = ${usuaCod}
    AND
      PEDI_ASSINATURA_3 != 'S'      
    AND
      PEDI_ASSINATURA_2 = 'S'
    AND
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
      ${queryStringPeit}
      ${queryString}
  `
}

export const selectPedidoEstoqueCere4 = (usuaCod: string, queryString: string, queryStringPese: string, queryStringPeit: string, database: string) => {
  return `
    USE [${database}]
    SELECT TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_SERVICO
    ON
      PESE_PEDI_COD = PEDI_COD
    WHERE
      PEDI_USUA_COD_ASS_4 = ${usuaCod}
    AND
      PEDI_ASSINATURA_4 != 'S'    
    AND
      PEDI_ASSINATURA_3 = 'S'    
    AND    
      PEDI_ASSINATURA_2 = 'S'
    AND
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
      ${queryStringPese}
      ${queryString}

    UNION

    SELECT  TOP 100
      PEDI_OBS,
      PEDI_DESCONTO,
      PEDI_STATUS,
      PEDI_FRETE,
      PEDI_VALOR_APROVADO,
      PEDI_VALOR_TOTAL,
      PEDI_COD,
      PEDI_NUMERO,
      FORN_NOME,
      PEDI_DATA,
      1 AS ASS,
      EMPR_NOME,
      PEDI_FORN_COD,
      PEDI_TOTAL_MERC,
      PESS_NOME,
      (
        SELECT
          ISNULL(
            SUM(
              ISNULL(PESE_VALOR_UNITARIO, 0)
              *
              ISNULL(PESE_QUANTIDADE, 0)
              -
              ISNULL(PESE_DESCONTO, 0)
            )
          ,0)
        FROM
          PEDIDO_SERVICO
        WHERE
          PESE_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_SERVICO,
      (
      SELECT
        ISNULL(
          SUM(
            ISNULL(PEIT_VALORUNI, 0)
            *
            ISNULL(PEIT_QTD, 0)
            -
            ISNULL(PEIT_DESCONTO, 0)
          )
        ,0)
      FROM
        PEDIDO_ITEM
      WHERE
        PEIT_PEDI_COD = PEDI_COD
      ) AS VALOR_TOTAL_ITEM
    FROM
      PEDIDO_ESTOQUE
    INNER JOIN
      FORNECEDOR
    ON
      FORN_COD = PEDI_FORN_COD
    INNER JOIN
      EMPRESA
    ON
      EMPR_COD = PEDI_EMPR_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = PEDI_PESS_COD
    INNER JOIN
      PEDIDO_ITEM
    ON
      PEIT_PEDI_COD = PEDI_COD
    WHERE
      PEDI_USUA_COD_ASS_4 = ${usuaCod}
    AND
      PEDI_ASSINATURA_4 != 'S'    
    AND
      PEDI_ASSINATURA_3 = 'S'      
    AND
      PEDI_ASSINATURA_2 = 'S'
    AND
      PEDI_ASSINATURA_1 = 'S'
    AND
      PEDI_STATUS != 'A'
    AND
      PEDI_STATUS != 'C'
      ${queryStringPeit}
      ${queryString}
  `
}

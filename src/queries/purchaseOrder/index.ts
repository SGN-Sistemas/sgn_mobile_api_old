export const selectSoliComp1 = (usuaCod: number) => {
  return `
    SELECT
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_1,
      SOCO_USUA_COD_ASS_1,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '1' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND
      SOCO_ASSINATURA_1 != 'S'
    AND
      SOCO_STATUS = ''
    OR
      SOCO_STATUS = NULL
    AND
      SOCO_USUA_COD_ASS_1 = ${usuaCod}
  `;
};

export const selectSoliComp2 = (usuaCod: number) => {
  return `
    SELECT
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_2,
      SOCO_USUA_COD_ASS_2,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '2' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC,
      SECO_DESC ,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND
      SOCO_ASSINATURA_2 != 'S'
    AND
      SOCO_STATUS = ''
    OR
      SOCO_STATUS = NULL
    AND
      SOCO_ASSINATURA_1 = 'S'
    AND
      SOCO_USUA_COD_ASS_2 = ${usuaCod}
  `;
};

export const selectSoliCompNumero = (usuaCod: number, socoNUMERO: string, pos: string) => {
  return `
    SELECT
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_1,
      SOCO_USUA_COD_ASS_1,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '${pos}' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND
      SOCO_ASSINATURA_${pos} != 'S'
    AND
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND
      SOCO_NUMERO = '${socoNUMERO}'
    AND
      SOCO_STATUS = ''
    OR
      SOCO_STATUS = NULL
  `;
};

export const selectSoliCompAlmoxarifado = (usuaCod: number, almoDesc: string, pos: string) => {
  return `
    SELECT
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_1,
      SOCO_USUA_COD_ASS_1,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '${pos}' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND
      SOCO_ASSINATURA_${pos} != 'S'
    AND
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND
      ALMO_DESC LIKE '%${almoDesc}%'
    AND
      SOCO_STATUS = ''
    OR
      SOCO_STATUS = NULL
  `;
};

export const selectSoliCompCR = (usuaCod: number, cereNome: string, pos: string) => {
  return `
    SELECT
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_1,
      SOCO_USUA_COD_ASS_1,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '${pos}' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND
      SOCO_ASSINATURA_${pos} != 'S'
    AND
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND
      CERE_NOME LIKE '%${cereNome}%'
    AND
      SOCO_STATUS = ''
    OR
      SOCO_STATUS = NULL
  `;
};

export const selectSoliCompSetorCompras = (usuaCod: number, SECO_DESC: string, pos: string) => {
  return `
    SELECT
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_1,
      SOCO_USUA_COD_ASS_1,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '${pos}' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND
      SOCO_ASSINATURA_${pos} != 'S'
    AND
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND
      SOCO_STATUS = ''
    OR
      SOCO_STATUS = NULL
    AND
      SECO_DESC LIKE '%${SECO_DESC}%'
  `;
};

export const selectSoliCompData = (usuaCod: number, SOCO_DTSOLI: string, pos: string) => {
  return `
    SELECT
      SOCO_COD,
      SOCO_DTSOLI,
      SOCO_OBS,
      SOCO_ASSINATURA_1,
      SOCO_USUA_COD_ASS_1,
      SOCO_NUMERO,
      SOCO_QTD_NECE,
      SOCO_ALMO_COD,
      SOCO_MATE_COD,
      ESTO_CUSTO_MEDIO,
      (
        SELECT
          (ISNULL(ESTO_CUSTO_MEDIO,0) * SOCO_QTD_NECE)
      ) as valor_total,
      '${pos}' AS ASS,
      CERE_SIGLA,
      CERE_NOME,
      PESS_NOME,
      SOCO_SERV_COD,
      (
        SELECT
          SERV_DESC
        FROM
          SERVICOS
        WHERE
          SERV_COD = SOCO_SERV_COD
      ) AS SERV_DESC,
      (
        SELECT
          MATE_DESC
        FROM
          MATERIAL
        WHERE
          MATE_COD = SOCO_MATE_COD
      ) AS MATE_DESC,
      SECO_DESC,
      UNMA_SIGLA,
      ALMO_DESC,
      UNMA_DESC
    FROM
      SOLICITACAO_COMPRA
    INNER JOIN
      ESTOQUE
    ON
      ESTO_ALMO_COD = SOCO_ALMO_COD
    INNER JOIN
      CENTRO_RESULTADO
    ON
      CERE_COD = SOCO_CERE_COD
    INNER JOIN
      PESSOAL
    ON
      PESS_COD = SOCO_PESS_COD
    INNER JOIN
      UNID_MAT
    ON
      UNMA_COD = SOCO_UNMA_COD
    INNER JOIN
      SETOR_COMPRAS
    ON
      SECO_COD = SOCO_SECO_COD
    INNER JOIN
      ALMOXARIFADO
    ON
      ALMO_COD = SOCO_ALMO_COD
    WHERE
      ESTO_ALMO_COD = SOCO_ALMO_COD
    AND
      ESTO_MATE_COD = SOCO_MATE_COD
    AND
      SOCO_ASSINATURA_${pos} != 'S'
    AND
      SOCO_USUA_COD_ASS_${pos} = ${usuaCod}
    AND
      SOCO_STATUS = ''
    OR
      SOCO_STATUS = NULL
    AND
      SOCO_DTSOLI = '${SOCO_DTSOLI}'
  `;
};

export const updateASSSolicitacao = (socoCod: string, posCod: string, sqlQuery: string) => {
  return `
    UPDATE
        SOLICITACAO_COMPRA
    SET
        SOCO_ASSINATURA_${posCod} = 'S',
        ${sqlQuery}
        SOCO_DATA_APROVACAO${posCod} = GETDATE()

    WHERE
        SOCO_COD = ${socoCod}
  `;
};

export const countNumAprovaSoliCompra = (cod: string) => {
  return `
    SELECT
      (
        (
        SELECT
          COUNT(SOCO_USUA_COD_ASS_1)
        FROM
          SOLICITACAO_COMPRA
        WHERE
          SOCO_COD = ${cod}
        AND
          SOCO_ASSINATURA_1 = 'S'
        )
          +
        (
          SELECT
            COUNT(SOCO_USUA_COD_ASS_2)
          FROM
            SOLICITACAO_COMPRA
          WHERE
            SOCO_COD = ${cod}
          AND
            SOCO_ASSINATURA_2 = 'S'
        )
      ) as NUM
    FROM
      SOLICITACAO_COMPRA
    WHERE
      SOCO_COD = ${cod}
  `;
};

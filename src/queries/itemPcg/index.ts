export const selectForPlgc = (niacCod: string, tipoCr: string, plgcCod: string, database: string) => {
  return `
    USE [${database}]
    SELECT
        ITPC_COD,
        ITPC_SIGLA,
        ITPC_DESC
    FROM
        ITEM_PCG
    WHERE
        ITPC_IND_BLOQ = 'N'
    AND
        ITPC_TIPO = 'P'
    AND
        ITPC_CENTRO_CONSUMO = 'S'
    AND
        (
            ITPC_RETENCAO = 'N' OR ITPC_RETENCAO IS NULL
        )
    AND
        ITPC_NIAC_COD <= ${niacCod}
    AND
        ITPC_TIIP_COD
    IN
        (
            SELECT
                TCTP_TIIP_COD
            FROM
                TIPO_CR_TIPO_PCG
            WHERE   
                TCTP_TICR_COD = ${tipoCr}
        )
    AND
        ITPC_PLCG_COD = ${plgcCod}
  `
}

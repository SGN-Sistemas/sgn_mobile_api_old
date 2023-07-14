export const selectPag2ContrUsuaSmpCrPedCom = () => {
  return `
    SELECT 
        PAG2_CONTR_USUA_SMP_CR_PED_COM 
    FROM 
        PARAMETROS_GERAIS_2
  `
}

export const sqlPag2Page = () => {
  return `
    SELECT
      PAG2_OBRIGA_NUMERO_SOLICITACAO,
      PAG2_UTILIZ_PROJETO_ETAPA_REQ,
      PAGE_ESTO_DATA_TRAS,
      PAGE_ESTO_DATA_FRENTE
    FROM
      PARAMETROS_GERAIS_2,PARAMETROS_GERAIS
  `
}

export const sqlPageControleUsuarioCrAlmox = () => {
  return `
    SELECT
      PAG2_CONTROLE_USUARIO_CR_ALMOX,
      PAG2_REL_USUA_ALMOX
    FROM
      PARAMETROS_GERAIS_2,
      PARAMETROS_GERAIS 
  `
}

export const selectPagePag2StartAddPage = (database: string) => {
  return `
    USE [${database}]
    SELECT
      PAGE_NUM_APROVACOES_SOLIC,
      PAGE_TODAS_APROVACOES_SOLIC
    FROM
      PARAMETROS_GERAIS
  `
}

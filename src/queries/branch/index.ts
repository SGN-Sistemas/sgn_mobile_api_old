export const searchEmprUsua = (usuaCod: string) => {
  return `SELECT 
            DISTINCT (EMPR_COD),
            EMPR_NOME
          FROM 
            EMPRESA
          INNER JOIN
            GRUPO_CR
          ON 
            EMPR_COD = GRCR_EMPR_COD
          INNER JOIN
            CENTRO_RESULTADO
          ON 
            GRCR_COD = CERE_GRCR_COD
          INNER JOIN
            USUARIO_CR
          ON
            CERE_COD = USCR_CERE_COD
          WHERE
            EMPR_IND_BLOQ = 'N'
          AND
            USCR_USUA_COD = ${usuaCod}`
}

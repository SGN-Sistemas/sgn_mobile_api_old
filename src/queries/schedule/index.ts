export const selectPefiPejuPess = () => {
  return `
    SELECT
      PESS_NOME AS NOME,
      PESS_END AS ENDERECO, 
      CIDA_DESC AS CIDADE,
      CIDA_UNFE_SIGLA AS UF,
      PESS_EMAIL AS EMAIL,
      PESS_FONE AS TELEFONE
    FROM 
      PESSOAL
    INNER JOIN 
      CIDADE
    ON
      PESS_CIDA_COD = CIDA_COD 
    WHERE
      PESS_FONE != ''
      
    UNION

    SELECT
      PEFI_NOME AS NOME,
      BAIR_DESC AS ENDERECO, 
      CIDA_DESC AS CIDADE,
      CIDA_UNFE_SIGLA AS UF,
      PEFI_EMAIL AS EMAIL,
      PEFI_TEL AS TELEFONE
    FROM 
      PESSOA_FISICA
    INNER JOIN 
      CIDADE
    ON
      CIDA_COD = PEFI_CIDA_COD
    INNER JOIN
      BAIRRO
    ON
      BAIR_COD = PEFI_BAIR_COD
    WHERE
      PEFI_TEL != ''

    UNION

    SELECT 
      PEJU_RAZAO_SOCIAL AS NOME,
      BAIR_DESC AS ENDERECO, 
      CIDA_DESC AS CIDADE,
      CIDA_UNFE_SIGLA AS UF,
      PEJU_EMAIL AS EMAIL,
      PEJU_TEL AS TELEFONE
    FROM 
      PESSOA_JURIDICA 
    INNER JOIN 
      CIDADE
    ON
      CIDA_COD = PEJU_CIDA_COD
    INNER JOIN
      BAIRRO
    ON
      BAIR_COD = PEJU_BAIR_COD
    WHERE
      PEJU_TEL != ''
  `
}

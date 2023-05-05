export const selectAllPessoal = () => {
  return `
        SELECT
            PESS_NOME,
            PESS_COD
        FROM 
            PESSOAL    
    `
}

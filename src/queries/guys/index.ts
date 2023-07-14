export const selectAllPessoal = (database: string) => {
  return `
        USE [${database}]
        SELECT
            PESS_NOME,
            PESS_COD
        FROM 
            PESSOAL    
    `
}

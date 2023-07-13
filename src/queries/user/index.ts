export const verifyPassword = (cod: string) => {
  return `
    SELECT 
      USUA_SENHA_APP
    FROM 
      USUARIO
    WHERE
      USUA_COD = ${cod}
  `
}

export const verifyUserQuery = (user: string, database: string): string => {
  return `
    USE [${database}]
    SELECT 
      USUA_COD,
      USUA_NOME,
      USUA_SENHA_APP,
      USUA_BLOQ
    FROM 
      USUARIO
    WHERE
      USUA_SIGLA = '${user}'
  `
}

export const verifyUserCodQuery = (cod: string, database: string): string => {
  return `
    USE [${database}]
    SELECT 
      USUA_COD,
      USUA_NOME,
      USUA_SENHA_APP,
      USUA_BLOQ
    FROM 
      USUARIO
    WHERE
      USUA_COD = '${cod}'
  `
}

export const verifyUserSpecial = (cod : string) => {
  return `
    SELECT 
      USUA_TIPO
    FROM
      USUARIO
    WHERE
      USUA_COD = ${cod}
  `
}

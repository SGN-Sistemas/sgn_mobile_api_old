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

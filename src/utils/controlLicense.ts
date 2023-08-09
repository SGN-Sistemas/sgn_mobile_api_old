import { licenseQuantity, queryTransformN } from '../queries/userControlMobile'
import { UsuarioRepository } from '../typeorm/repository/usuarioRepositories'

export const ControlLicense = async (sigla: string, cnpj: string) => {
  try {
    const logado = await UsuarioRepository.query(`
      USE [MOBILE_CCONNECTION]
      SELECT 
        COUNT(USCM_USUA_SIGLA) AS LOGGED
      FROM
        USER_CONTROL_MOBILE
      INNER JOIN
        DATA_CONNECTION
      ON
        DACO_COD = USCM_DACO_COD
      WHERE
        USCM_USUA_SIGLA = '${sigla}'
      AND
        USCM_ATIVO = 'S'
      AND
        DACO_CNPJ = '${cnpj}'        
    `)

    if (logado[0].LOGGED === 0) {
      const usuarios = await UsuarioRepository.query(`
        USE [MOBILE_CCONNECTION]
        SELECT
          DISTINCT(USCM_USUA_SIGLA)
        FROM
          USER_CONTROL_MOBILE
        INNER JOIN
          DATA_CONNECTION
        ON
          DACO_COD = USCM_DACO_COD          
        WHERE
          USCM_USUA_SIGLA != '${sigla}'
        AND
          DACO_CNPJ = '${cnpj}'                
      `)

      usuarios.forEach(async (element: {USCM_USUA_SIGLA: string}) => {
        const sqlQueryTransformN = queryTransformN(cnpj, element.USCM_USUA_SIGLA)

        await UsuarioRepository.query(sqlQueryTransformN)
      })

      const licenseFree = await UsuarioRepository.query(licenseQuantity(cnpj))

      if (licenseFree[0].FREE_LICENSE > 0) {
        return {
          error: false,
          message: '',
          status: 200
        }
      }
      return {
        error: true,
        message: 'Máximo de licenças ocupada',
        status: 403
      }
    }

    return {
      error: false,
      message: '',
      status: 200
    }
  } catch (e) {
    return {
      error: true,
      message: 'Internal server error' + e,
      status: 500
    }
  }
}

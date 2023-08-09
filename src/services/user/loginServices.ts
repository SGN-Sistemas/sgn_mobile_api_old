import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { verifyUserLogin } from '../../utils/verifyUser'
import { ControlLicense } from '../../utils/controlLicense'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'

dotenv.config()

interface Ilogin {
  USUA_SIGLA: string;
  USUA_SENHA_APP: string;
  DATABASE: string;
  CNPJ: string;
}

interface ILoginReturn {
  message: string,
  error: boolean,
  status: number,
  refreshToken: string
}

export class LoginService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_SENHA_APP,
      DATABASE,
      CNPJ
    } : Ilogin
  ): Promise<ILoginReturn> {
    const Tokenuuid = process.env.TOKEN_SECRET_REFRESH + ''
    try {
      const VerifyEmprBlock = await UsuarioRepository.query(`
        USE [MOBILE_CCONNECTION]
        SELECT  
          COAC_BLOCK
        FROM
          CONTROLE_ACESSO
        INNER JOIN
          DATA_CONNECTION
        ON
          DACO_COD = COAC_DACO_COD
        WHERE
          DACO_CNPJ = '${CNPJ}'
    `)

      if (VerifyEmprBlock[0].COAC_BLOCK === 'S') {
        return ({
          message: 'Empresa bloqueada',
          error: true,
          status: 403,
          refreshToken: ''
        })
      }

      const {
        message,
        error,
        status,
        userCod
      } = await verifyUserLogin(USUA_SIGLA, USUA_SENHA_APP, DATABASE)
      if (error) {
        return ({
          message,
          error,
          status,
          refreshToken: ''
        })
      }
      const refreshToken = jwt.sign(
        {
          USUA_SIGLA,
          USUA_COD: userCod,
          DATABASE
        },
        Tokenuuid,
        {
          expiresIn: '2h'
        }
      )
      const {
        error: validLicenseError,
        message: validLicenseMessage,
        status: validLicenseStatus
      } = await ControlLicense(USUA_SIGLA, CNPJ)
      if (validLicenseError) {
        return ({
          message: validLicenseMessage,
          error: validLicenseError,
          status: validLicenseStatus,
          refreshToken: ''
        })
      }
      const searchUser = await UsuarioRepository.query(`
        USE [MOBILE_CCONNECTION]
        SELECT 
          COUNT(USCM_USUA_SIGLA) AS CREATED
        FROM
          USER_CONTROL_MOBILE
        INNER JOIN
          DATA_CONNECTION
        ON
          DACO_COD = USCM_DACO_COD
        WHERE
          USCM_USUA_SIGLA = '${USUA_SIGLA}'
        AND
          DACO_CNPJ = '${CNPJ}' 
      `)

      if (searchUser[0].CREATED > 0) {
        await UsuarioRepository.query(`
          USE [MOBILE_CCONNECTION]
          UPDATE 
            USER_CONTROL_MOBILE
          SET
            USCM_ATIVO = 'S',
            USCM_DATA_HORA_ENTRADA = GETDATE()
          WHERE
            USCM_USUA_SIGLA = '${USUA_SIGLA}'
        `)
      } else {
        const dacoCod = await UsuarioRepository.query(`
          SELECT
            DACO_COD
          FROM
            DATA_CONNECTION
          WHERE
            DACO_CNPJ = '${CNPJ}'
        `)
        await UsuarioRepository.query(`
          USE [${DATABASE}]
          INSERT INTO
            USER_CONTROL_MOBILE
            (
              USCM_DATA_HORA_ENTRADA,
              USCM_ATIVO,
              USCM_USUA_SIGLA,
              USCM_DACO_COD
            )
          VALUES 
            (
              GETDATE(),
              'S',
              '${USUA_SIGLA}',
              ${dacoCod}
            )
        `)
      }
      return ({
        message: 'Login efetuado',
        error: false,
        status: 200,
        refreshToken
      })
    } catch (e) {
      return ({
        message: 'Internal server error' + e,
        error: true,
        status: 500,
        refreshToken: ''
      })
    }
  }
}

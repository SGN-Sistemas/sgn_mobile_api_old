import { verifyUserCodQuery, verifyUserQuery } from '../queries/user'
import { UsuarioRepository } from '../typeorm/repository/usuarioRepositories'
import bcrypt from 'bcrypt'
import validPassword from './validPassword'

interface IVerifyUser {
  message: string;
  error: boolean;
  status: number;
  userCod: number | string;
  usua_valor_aprov_solic: string;
  USUA_VALOR_APROVACAO_MENSAL: string;
  USUA_VALOR_APROVACAO: string;
  USUA_TIPO?: string;
  USUA_VALOR_APROVA_CONT_SERV?: string;
}

interface IVerifyUserWithout {
  message: string;
  error: boolean;
  status: number;
  userTipo: number | string;
}

interface IVerifyUserPassword {
    message: string;
    error: boolean;
    status: number;
}

export const verifyUserLogin =
 async (acronym: string, password: string, database: string):Promise<IVerifyUser> => {
   const sqlVerifyUser = verifyUserQuery(acronym, database)
   const existsUser = await UsuarioRepository.query(sqlVerifyUser)

   if (!existsUser[0]) {
     return ({
       message: 'Login ou senha incorreto',
       error: true,
       status: 400,
       userCod: '',
       usua_valor_aprov_solic: '',
       USUA_VALOR_APROVACAO: '',
       USUA_VALOR_APROVACAO_MENSAL: ''
     })
   }

   if (!existsUser[0].USUA_SENHA_APP || existsUser[0].USUA_SENHA_APP === '') {
     return ({
       message: 'Úsuario sem senha cadastrada',
       error: true,
       status: 400,
       userCod: '',
       usua_valor_aprov_solic: '',
       USUA_VALOR_APROVACAO: '',
       USUA_VALOR_APROVACAO_MENSAL: ''
     })
   }

   const passwordBD = existsUser[0].USUA_SENHA_APP

   const comparePassword = await bcrypt.compare(password, passwordBD)

   if (!comparePassword) {
     return ({
       message: 'Login ou senha incorreto',
       error: true,
       status: 400,
       userCod: '',
       usua_valor_aprov_solic: '',
       USUA_VALOR_APROVACAO: '',
       USUA_VALOR_APROVACAO_MENSAL: ''
     })
   }

   if (existsUser[0].USUA_BLOQ !== 'N') {
     return ({
       message: 'Úsuario bloqueado',
       error: true,
       status: 400,
       userCod: '',
       usua_valor_aprov_solic: '',
       USUA_VALOR_APROVACAO: '',
       USUA_VALOR_APROVACAO_MENSAL: ''
     })
   }
   return ({
     message: '',
     error: false,
     userCod: existsUser[0].USUA_COD,
     status: 0,
     usua_valor_aprov_solic: '',
     USUA_VALOR_APROVACAO: existsUser[0].USUA_VALOR_APROVACAO,
     USUA_VALOR_APROVACAO_MENSAL: existsUser[0].USUA_VALOR_APROVACAO_MENSAL
   })
 }

export const verifyUserApproval =
  async (acronym: string, password: string, database: string): Promise<IVerifyUser> => {
    try {
      const sqlVerifyUser = verifyUserQuery(acronym, database)

      const existsUser = await UsuarioRepository.query(sqlVerifyUser)

      if (!existsUser[0]) {
        return ({
          message: 'Usuario inexistente',
          error: true,
          status: 400,
          userCod: '',
          usua_valor_aprov_solic: '',
          USUA_VALOR_APROVACAO: '',
          USUA_VALOR_APROVACAO_MENSAL: '',
          USUA_VALOR_APROVA_CONT_SERV: ''
        })
      }

      if (!existsUser[0].USUA_SENHA_APP || existsUser[0].USUA_SENHA_APP === '') {
        return ({
          message: 'Úsuario sem senha cadastrada',
          error: true,
          status: 400,
          userCod: '',
          usua_valor_aprov_solic: '',
          USUA_VALOR_APROVACAO: '',
          USUA_VALOR_APROVACAO_MENSAL: '',
          USUA_VALOR_APROVA_CONT_SERV: ''
        })
      }

      const passwordBD = existsUser[0].USUA_SENHA_APP

      const comparePassword = await bcrypt.compare(password, passwordBD)
      console.log('====================================')
      console.log(sqlVerifyUser)
      console.log('====================================')
      if (!comparePassword) {
        return ({
          message: 'Senha incorreta',
          error: true,
          status: 400,
          userCod: '',
          usua_valor_aprov_solic: '',
          USUA_VALOR_APROVACAO: '',
          USUA_VALOR_APROVACAO_MENSAL: '',
          USUA_VALOR_APROVA_CONT_SERV: ''
        })
      }

      if (existsUser[0].USUA_BLOQ !== 'N') {
        return ({
          message: 'Úsuario bloqueado',
          error: true,
          status: 400,
          userCod: '',
          usua_valor_aprov_solic: '',
          USUA_VALOR_APROVACAO: '',
          USUA_VALOR_APROVACAO_MENSAL: '',
          USUA_VALOR_APROVA_CONT_SERV: ''
        })
      }

      return ({
        message: '',
        error: false,
        userCod: existsUser[0].USUA_COD,
        status: 200,
        usua_valor_aprov_solic: existsUser[0].usua_valor_aprov_solic,
        USUA_VALOR_APROVACAO: existsUser[0].USUA_VALOR_APROVACAO,
        USUA_VALOR_APROVACAO_MENSAL: existsUser[0].USUA_VALOR_APROVACAO_MENSAL,
        USUA_VALOR_APROVA_CONT_SERV: existsUser[0].USUA_VALOR_APROVA_CONT_SERV
      })
    } catch (e) {
      return ({
        message: 'Internal server error: ' + e,
        error: true,
        status: 500,
        userCod: '',
        usua_valor_aprov_solic: '',
        USUA_VALOR_APROVACAO: '',
        USUA_VALOR_APROVACAO_MENSAL: '',
        USUA_VALOR_APROVA_CONT_SERV: ''
      })
    }
  }

export const verifyUserSignUp =
    async (acronym: string, password: string, database: string): Promise<IVerifyUserPassword> => {
      const sqlVerifyUser = verifyUserQuery(acronym, database)
      const existsUser = await UsuarioRepository.query(sqlVerifyUser)

      if (!existsUser[0]) {
        return ({
          message: 'Login ou senha incorreto',
          error: true,
          status: 400
        })
      }

      if (existsUser[0].USUA_BLOQ !== 'N') {
        return ({
          message: 'Úsuario bloqueado',
          error: true,
          status: 400
        })
      }

      const {
        message,
        error,
        status
      } = validPassword(password)

      if (error) {
        return ({
          message,
          error,
          status
        })
      }

      return ({
        message: '',
        error: false,
        status: 0
      })
    }

export const verifyUsercod =
  async (cod: string, password: string, database: string): Promise<IVerifyUser> => {
    const sqlVerifyUser = verifyUserCodQuery(cod, database)
    const existsUser = await UsuarioRepository.query(sqlVerifyUser)

    if (!existsUser[0]) {
      return ({
        message: 'Login ou senha incorreto',
        error: true,
        status: 400,
        userCod: '',
        usua_valor_aprov_solic: '',
        USUA_VALOR_APROVACAO: '',
        USUA_VALOR_APROVACAO_MENSAL: ''
      })
    }

    if (!existsUser[0].USUA_SENHA_APP || existsUser[0].USUA_SENHA_APP === '') {
      return ({
        message: 'Úsuario sem senha cadastrada',
        error: true,
        status: 400,
        userCod: '',
        usua_valor_aprov_solic: '',
        USUA_VALOR_APROVACAO: '',
        USUA_VALOR_APROVACAO_MENSAL: ''
      })
    }

    const passwordBD = existsUser[0].USUA_SENHA_APP

    const comparePassword = await bcrypt.compare(password, passwordBD)

    if (!comparePassword) {
      return ({
        message: 'Login ou senha incorreto',
        error: true,
        status: 400,
        userCod: '',
        usua_valor_aprov_solic: '',
        USUA_VALOR_APROVACAO: '',
        USUA_VALOR_APROVACAO_MENSAL: ''
      })
    }

    if (existsUser[0].USUA_BLOQ !== 'N') {
      return ({
        message: 'Úsuario bloqueado',
        error: true,
        status: 400,
        userCod: '',
        usua_valor_aprov_solic: '',
        USUA_VALOR_APROVACAO: '',
        USUA_VALOR_APROVACAO_MENSAL: ''
      })
    }
    return ({
      message: '',
      error: false,
      userCod: existsUser[0].USUA_COD,
      status: 0,
      usua_valor_aprov_solic: '',
      USUA_VALOR_APROVACAO: existsUser[0].USUA_VALOR_APROVACAO,
      USUA_VALOR_APROVACAO_MENSAL: existsUser[0].USUA_VALOR_APROVACAO_MENSAL
    })
  }

export const verifyUsercodWithoutPassword =
  async (cod: string, database: string): Promise<IVerifyUser> => {
    const sqlVerifyUser = verifyUserCodQuery(cod, database)
    const existsUser = await UsuarioRepository.query(sqlVerifyUser)

    if (!existsUser[0]) {
      return ({
        message: 'Login incorreto',
        error: true,
        status: 400,
        userCod: '',
        usua_valor_aprov_solic: '',
        USUA_VALOR_APROVACAO: '',
        USUA_VALOR_APROVACAO_MENSAL: '',
        USUA_TIPO: ''
      })
    }

    if (existsUser[0].USUA_BLOQ !== 'N') {
      return ({
        message: 'Úsuario bloqueado',
        error: true,
        status: 400,
        userCod: '',
        usua_valor_aprov_solic: '',
        USUA_VALOR_APROVACAO: '',
        USUA_VALOR_APROVACAO_MENSAL: '',
        USUA_TIPO: ''
      })
    }
    return ({
      message: '',
      error: false,
      userCod: existsUser[0].USUA_COD,
      status: 0,
      usua_valor_aprov_solic: '',
      USUA_VALOR_APROVACAO: existsUser[0].USUA_VALOR_APROVACAO,
      USUA_VALOR_APROVACAO_MENSAL: existsUser[0].USUA_VALOR_APROVACAO_MENSAL,
      USUA_TIPO: existsUser[0].USUA_TIPO
    })
  }

export const verifyUsercodWithOutSignUp =
  async (cod: string, database: string): Promise<IVerifyUserWithout> => {
    const sqlVerifyUser = verifyUserCodQuery(cod, database)
    const existsUser = await UsuarioRepository.query(sqlVerifyUser)

    if (existsUser[0].USUA_BLOQ !== 'N') {
      return ({
        message: 'Úsuario bloqueado',
        error: true,
        status: 400,
        userTipo: existsUser[0].USUA_TIPO
      })
    }
    return ({
      message: '',
      error: false,
      userTipo: existsUser[0].USUA_TIPO,
      status: 0
    })
  }

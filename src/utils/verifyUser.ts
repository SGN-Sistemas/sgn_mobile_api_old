import { verifyUserQuery } from '../queries/user'
import { UsuarioRepository } from '../typeorm/repository/usuarioRepositories'
import bcrypt from 'bcrypt'

interface IVerifyUser {
    message: string;
    error: boolean;
    status: number;
    userCod: number | string;
}

export const verifyUser = async (acronym: string, password: string, database: string):Promise<IVerifyUser> => {
  const sqlVerifyUser = verifyUserQuery(acronym, database)
  const existsUser = await UsuarioRepository.query(sqlVerifyUser)

  if (!existsUser[0]) {
    return ({
      message: 'Login ou senha incorreto',
      error: true,
      status: 400,
      userCod: ''
    })
  }

  if (!existsUser[0].USUA_SENHA_APP || existsUser[0].USUA_SENHA_APP === '') {
    return ({
      message: 'Úsuario sem senha cadastrada',
      error: true,
      status: 400,
      userCod: ''
    })
  }

  const passwordBD = existsUser[0].USUA_SENHA_APP

  const comparePassword = await bcrypt.compare(password, passwordBD)

  if (!comparePassword) {
    return ({
      message: 'Login ou senha incorreto',
      error: true,
      status: 400,
      userCod: ''
    })
  }

  if (existsUser[0].USUA_BLOQ !== 'N') {
    return ({
      message: 'Úsuario bloqueado',
      error: true,
      status: 400,
      userCod: ''
    })
  }
  return ({
    message: '',
    error: false,
    userCod: existsUser[0].USUA_COD,
    status: 0
  })
}

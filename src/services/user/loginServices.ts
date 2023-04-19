import bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface Ilogin {
  USUA_SIGLA: string,
  USUA_SENHA_APP: string,

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
      USUA_SENHA_APP
    } : Ilogin
  ): Promise<ILoginReturn> {
    const existsUser = await UsuarioRepository.findOneBy({ USUA_SIGLA });

    if (!existsUser) {
      return ({
        message: 'Login incorreto',
        error: true,
        status: 400,
        refreshToken: ''
      });
    }

    const Tokenuuid = process.env.TOKEN_SECRET_REFRESH + '';

    if (!existsUser.USUA_SENHA_APP || existsUser.USUA_SENHA_APP === '') {
      return ({
        message: 'Úsuario sem senha cadastrada',
        error: true,
        status: 400,
        refreshToken: ''
      });
    }

    const passwordBD = existsUser.USUA_SENHA_APP;

    const sigla = existsUser.USUA_SIGLA;

    const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD);

    if (!comparePassword) {
      return ({
        message: 'Senha incorreta',
        error: true,
        status: 400,
        refreshToken: ''
      });
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      return ({
        message: 'Úsuario bloqueado',
        error: true,
        status: 400,
        refreshToken: ''
      });
    }
    const refreshToken = jwt.sign(
      {
        sigla
      },
      Tokenuuid,
      {
        expiresIn: '1d'
      }
    );

    return ({
      message: 'Login efetuado',
      error: false,
      status: 200,
      refreshToken
    });
  }
}

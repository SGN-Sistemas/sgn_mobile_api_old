import bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import jwt from 'jsonwebtoken';
import AppError from '../../errors/AppError';


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
      throw new AppError('usuario ou senha incorreto!');
    }

    const Tokenuuid = process.env.TOKEN_SECRET_REFRESH + '';


    const passwordBD = existsUser.USUA_SENHA_APP;

    const sigla = existsUser.USUA_SIGLA;

    const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD);

    if (!comparePassword || !existsUser.USUA_SENHA_APP || existsUser.USUA_SENHA_APP === '') {
      throw new AppError('usuario ou senha incorreto!');
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      throw new AppError('Usuario bloqueado!');
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

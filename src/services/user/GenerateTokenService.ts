import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IdecodeAcessToken {
  sigla: string,
}

export class GenerateTokenService {
  public async execute (TOKEN:string): Promise<string> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + '';

    const secretRefresh = process.env.TOKEN_SECRET_REFRESH + '';

    const decodeToken = jwt.verify(TOKEN, secretRefresh) as IdecodeAcessToken;

    const USUA_SIGLA = decodeToken.sigla;

    const existsUser = await UsuarioRepository.findOneBy({ USUA_SIGLA });

    const refreshToken = TOKEN;

    if (!existsUser) {
      return 'usuario invalido';
    }

    const codUser = existsUser.USUA_COD;

    const acessToken = jwt.sign(
      {
        refreshToken,
        USUA_SIGLA,
        codUser
      },
      secretAcess,
      {
        expiresIn: '1h'
      }
    );

    return acessToken;
  }
}

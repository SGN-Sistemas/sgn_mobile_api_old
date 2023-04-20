import bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import validPassword from '../../utils/validPassword';
import AppError from '../../errors/AppError';

interface Itrade{
    USUA_SIGLA: string,
    USUA_SENHA_APP: string
}

interface IReturn {
  message: string,
  error: boolean,
  status: number,
}

export class TradePasswordService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_SENHA_APP
    } : Itrade
  ): Promise<IReturn> {
    const existsUser = await UsuarioRepository.findOneBy({ USUA_SIGLA });

    if (!existsUser) {
      throw new AppError('Usuario não existe');
    }

    if (USUA_SENHA_APP.length < 10) {
      throw new AppError('Senha de conter mais de 10 caracteres');
    }
    const valid = validPassword(USUA_SENHA_APP);

    if (!valid) {
      throw new AppError('Senha conter caracteres especiais,número, letra maiuscula e minuscula');
    }

    const saltRounds = 2;
    const passwordHash = await bcrypt.hash(USUA_SENHA_APP, saltRounds);

    existsUser.USUA_SENHA_APP = passwordHash;

    await UsuarioRepository.save(existsUser);

    return {
      message: 'Senha trocada com sucesso ',
      error: false,
      status: 200
    };
  }
}

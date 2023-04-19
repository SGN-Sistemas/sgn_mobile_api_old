import AppError from '../errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsuarioRepository } from '../typeorm/repository/usuarioRepositories';

type JwtPayload = {
  codUser: string;
};

const Authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new AppError('Não autorizado', 401);
    }

    const token = authToken.split(' ')[1];

    const { codUser } = verify(
      token,
      process.env.TOKEN_SECRET_ACESS ?? ''
    ) as JwtPayload;

    console.log(codUser);
    const user = await UsuarioRepository.findOne({
      where: { USUA_COD: Number(codUser) }
    });

    if (!user) {
      throw new AppError('Não autorizado', 401);
    }

    const { USUA_SENHA_APP: _, USUA_SENHA: __, ...loggedUser } = user;

    req.user = loggedUser;
    next();
  } catch (e) {
    throw new AppError(e.message, 401);
  }
};

export default Authenticated;

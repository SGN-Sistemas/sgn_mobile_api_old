import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import { USUARIO } from '../../typeorm/entities/usuario';
import AppError from '../../errors/AppError';

class ListUserService {
  public async execute (): Promise<USUARIO[]> {
    const user = await UsuarioRepository.find();

    if (!user) {
      throw new AppError('Position not found');
    }
    return user;
  }
}

export default ListUserService;

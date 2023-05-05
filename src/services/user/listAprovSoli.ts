import { USUARIO } from '../../typeorm/entities/usuario'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
interface IPromise {
    error: boolean,
    message: USUARIO[],
    status: number
}

export class ListUserAprovSoliService {
  public async execute (): Promise<IPromise> {
    const users = await UsuarioRepository.find({
      select: {
        USUA_COD: true,
        USUA_SIGLA: true
      },
      where: {
        usua_aprova_solic: 'S'
      }
    })
    return ({
      message: users,
      error: false,
      status: 200
    })
  }
}

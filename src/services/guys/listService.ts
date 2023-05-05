import { selectAllPessoal } from '../../queries/guys'
import { USUARIO } from '../../typeorm/entities/usuario'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
interface IPromise {
    error: boolean,
    message: USUARIO[],
    status: number
}

export class ListGuysService {
  public async execute (): Promise<IPromise> {
    const pessoalSql = selectAllPessoal()
    const users = await UsuarioRepository.query(pessoalSql)
    return ({
      message: users,
      error: false,
      status: 200
    })
  }
}

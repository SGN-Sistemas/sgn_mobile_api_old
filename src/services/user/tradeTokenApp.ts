import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'

interface Itrade{
    USUA_SIGLA: string,
    USUA_APP_TOKEN: string
}

interface IReturn {
  message: string,
  error: boolean,
  status: number,
}

export class TradeTokenAppService {
  public async execute (
    {
      USUA_SIGLA,
      USUA_APP_TOKEN
    }: Itrade
  ): Promise<IReturn> {
    try {
      const existsUser = await UsuarioRepository.findOneBy({ USUA_SIGLA })

      if (!existsUser) {
        return {
          message: 'Usuario não existe',
          error: true,
          status: 400
        }
      }

      existsUser.USUA_APP_TOKEN = USUA_APP_TOKEN

      await UsuarioRepository.save(existsUser)

      return {
        message: 'Token adicionado com sucesso',
        error: false,
        status: 200
      }
    } catch (e) {
      return {
        message: e + '',
        error: false,
        status: 200
      }
    }
  }
}

import { AppDataSource } from '../index'
import { USUARIO } from '../entities/usuario'

export const UsuarioRepository = AppDataSource.getRepository(USUARIO)

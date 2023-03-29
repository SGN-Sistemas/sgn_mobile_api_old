import { AppDataSource } from '../index'
import { REL_USUARIO_SUBCONTA } from '../entities/RelUsuarioSubConta'

export const RelUsuarioSubConta = AppDataSource.getRepository(REL_USUARIO_SUBCONTA)

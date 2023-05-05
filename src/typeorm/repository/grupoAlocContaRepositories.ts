import { AppDataSource } from '../index'
import { GRUPO_ALOC_CONTA } from '../entities/grupoAlocConta'

export const GrupoAlocContaRepository = AppDataSource.getRepository(GRUPO_ALOC_CONTA)

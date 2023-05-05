import { AppDataSource } from '../index'
import { MOVIMENTO_DIARIO } from '../entities/movimentoDiario'

export const MovimentoDiarioRepository = AppDataSource.getRepository(MOVIMENTO_DIARIO)

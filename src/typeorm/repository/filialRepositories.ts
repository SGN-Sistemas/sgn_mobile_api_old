import { AppDataSource } from '../index'
import { FILIAL } from '../entities/filial'

export const FilialRepository = AppDataSource.getRepository(FILIAL)

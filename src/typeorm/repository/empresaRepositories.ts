import { AppDataSource } from '../index'
import { EMPRESA } from '../entities/empresa'

export const EmpresaContaRepository = AppDataSource.getRepository(EMPRESA)

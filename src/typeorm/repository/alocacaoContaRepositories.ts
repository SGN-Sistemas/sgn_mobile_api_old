import { AppDataSource } from '../index'
import { ALOCACAO_CONTA } from '../entities/alocacaoConta'

export const AlocacaoContaRepository = AppDataSource.getRepository(ALOCACAO_CONTA)

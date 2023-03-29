import { AppDataSource } from '../index'
import { ALOCACAO_CONTA } from '../entities/aplicacaoConta'

export const AplicacaoContaRepository = AppDataSource.getRepository(ALOCACAO_CONTA)

import { AppDataSource } from '../index'
import { APLICACAO_CONTA } from '../entities/aplicacaoConta'

export const AplicacaoContaRepository = AppDataSource.getRepository(APLICACAO_CONTA)

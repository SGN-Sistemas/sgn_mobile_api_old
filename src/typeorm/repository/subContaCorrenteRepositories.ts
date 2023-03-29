import { AppDataSource } from '../index'
import { SUB_CONTA_CORRENTE } from '../entities/subContaCorrente'

export const SubContaCorrenteRepository = AppDataSource.getRepository(SUB_CONTA_CORRENTE)


import { PlanilhaCompra } from '../entities/PlanilhaCompra'
import { AppDataSource } from '../index'

export const PlanilhaCompraRepository = AppDataSource.getRepository(PlanilhaCompra)

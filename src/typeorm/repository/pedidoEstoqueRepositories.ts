import { AppDataSource } from '../index'
import { PEDIDO_ESTOQUE } from '../entities/pedidoEstoque'

export const PedidoEstoqueRepository = AppDataSource.getRepository(PEDIDO_ESTOQUE)

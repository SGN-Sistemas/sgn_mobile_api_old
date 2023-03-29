import { AppDataSource } from '../index'
import { PEDIDO_ITEM } from '../entities/pedidoItem'

export const PedidoItemRepository = AppDataSource.getRepository(PEDIDO_ITEM)

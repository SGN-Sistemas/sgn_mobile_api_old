import { Request, Response } from 'express';
import { PedidoEstoqueRepository } from '../typeorm/repository/pedidoEstoqueRepositories';

export class SeeControllers {
  public async notificationPedido (request: Request, response: Response) {
    const { id } = request.params;

    console.log('notificationPedido');
  }
}

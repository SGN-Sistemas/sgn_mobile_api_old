import { selectPedidosItemServico } from '../../queries/request';
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';

export class GetDetailsRequestServices {
  public async execute (PEDI_COD : string) {
    const sql = selectPedidosItemServico(PEDI_COD);
    console.log(sql);

    const requestItens = await PedidoEstoqueRepository.query(sql);
    return requestItens;
  }
}

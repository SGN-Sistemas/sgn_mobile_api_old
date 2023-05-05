import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectDetailsServiceContract } from '../../queries/serviceContract'

export class ListDetailsServiceContract {
  public async execute (cod: string) {
    const selectDetailsServiceContractSql = selectDetailsServiceContract(cod)
    const selectDetailsServiceContractData = await PedidoEstoqueRepository.query(selectDetailsServiceContractSql)

    return selectDetailsServiceContractData
  }
}

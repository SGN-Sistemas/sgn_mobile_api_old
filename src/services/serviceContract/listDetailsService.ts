import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { selectDetailsServiceContract } from '../../queries/serviceContract'

export class ListDetailsServiceContract {
  public async execute (cod: string, database: string) {
    try {
      const selectDetailsServiceContractSql = selectDetailsServiceContract(cod, database)
      const selectDetailsServiceContractData = await PedidoEstoqueRepository.query(selectDetailsServiceContractSql)

      return {
        message: selectDetailsServiceContractData,
        status: 200
      }
    } catch (error) {
      return {
        message: 'Internal server error',
        status: 500
      }
    }
  }
}

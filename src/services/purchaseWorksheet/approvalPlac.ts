import { countNumAprovaPlacCompra, updateAssPlac } from '../../queries/purchaseWorksheet'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { verifyUserApproval } from '../../utils/verifyUser'

export class ApprovalPlac {
  public async execute (
    sigla: string,
    placCod: string,
    password:string,
    pos:string,
    database: string
  ) {
    try {
      const {
        error,
        message,
        status
      } = await verifyUserApproval(sigla, password, database)
      if (error) {
        return ({
          message,
          error,
          status
        })
      }
      const sqlCount = countNumAprovaPlacCompra(placCod, database)
      const resultCount = await UsuarioRepository.query(sqlCount)
      const resultPage = await UsuarioRepository.query(`
        USE [${database}]
        SELECT 
            page_num_aprovacoes_solic,
            page_todas_aprovacoes_solic
        FROM 
            PARAMETROS_GERAIS
      `)

      let statusSql = ''

      if (resultPage[0].page_todas_aprovacoes_solic === 'S') {
        if (resultPage[0].page_num_aprovacoes_solic === 1) {
          statusSql = "PLAC_STATUS = 'P',"
        } else if (resultPage[0].page_num_aprovacoes_solic === 2 && resultCount[0].NUM === 1) {
          statusSql = "PLAC_STATUS = 'P',"
        }
      } else {
        statusSql = "PLAC_STATUS = 'P',"
      }

      const sqlApproval = updateAssPlac(placCod, pos, statusSql, database)
      await UsuarioRepository.query(sqlApproval)
      return {
        message: `Planilha ${placCod} aprovada com sucesso`,
        status: 200,
        error: false
      }
    } catch (e) {
      return ({
        message: `Erro na planilha ${placCod}  ${e}`,
        error: true,
        status: 500
      })
    }
  }
}

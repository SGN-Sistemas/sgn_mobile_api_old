import dotenv from 'dotenv'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { countNumAprovaBoletim, pegaValorAprovCrFornSql, pegaValorAprovCrSql, updateBoletim } from '../../queries/serviceContractBulletin'
import { verifyUserApproval } from '../../utils/verifyUser'
dotenv.config()

interface IResponse {
    status: number;
    message: string;
    erro: boolean;
}

export class ApprovalBulletinService {
  public async execute (
    cod: string,
    codBulletin: string,
    ass: string,
    password: string,
    cereCod: string,
    valueBulletin: string,
    fornCod: string,
    database: string,
    sigla: string
  ): Promise<IResponse> {
    try {
      const {
        error,
        message,
        status
      } = await verifyUserApproval(sigla, password, database)

      if (error) {
        return ({
          message,
          erro: error,
          status
        })
      }

      const pag2Aprovs = await UsuarioRepository.query(
      `
      USE [${database}]
      SELECT
        PAG2_APROV_USUA_CR_VALOR,
        PAG2_APROV_USUA_CR_VALOR_FORN
      FROM
        PARAMETROS_GERAIS_2
      `
      )

      if (pag2Aprovs[0].PAG2_APROV_USUA_CR_VALOR === 'S') {
        const pegaValorAprovQuery = pegaValorAprovCrSql(cereCod, cod, database)
        const pegaValorAprov = await UsuarioRepository.query(pegaValorAprovQuery)
        let valorTotal = 0
        if (pegaValorAprov[0]) {
          valorTotal = pegaValorAprov[0].valorTotal
        }
        const valorTotalMes = valorTotal + parseFloat(valueBulletin)
        const pegarValorUscrMax = await UsuarioRepository.query(`
      USE [${database}]
        SELECT
          USCR_VLR_MAX_APROV_PED
        FROM 
          USUARIO_CR
        WHERE 
          USCR_CERE_COD = ${cereCod}
        AND
          USCR_USUA_COD = ${cod}
      `)
        if (!pegarValorUscrMax[0]) {
          return ({
            message: 'Úsuario sem valor configurado para esse CR',
            erro: true,
            status: 400
          })
        }
        if (!pegarValorUscrMax[0].USCR_VLR_MAX_APROV_PED) {
          return ({
            message: 'Usuário não tem acesso ao cr ou valor de aprovação não foi informado.',
            erro: true,
            status: 400
          })
        }
        if (valorTotalMes > pegarValorUscrMax[0].USCR_VLR_MAX_APROV_PED) {
          return ({
            message: 'Usuário não pode aprovar um valor tão alto para esse cr.',
            erro: true,
            status: 400
          })
        }
      } else if (pag2Aprovs[0].PAG2_APROV_USUA_CR_VALOR_FORN === 'S') {
        const pegaValorAprovQuery = pegaValorAprovCrFornSql(cereCod, fornCod, cod, database)
        const pegaValorAprov = await UsuarioRepository.query(pegaValorAprovQuery)
        const valorTotalMes = pegaValorAprov[0].valorTotal + parseFloat(valueBulletin)
        let nValorAprovUsuaMensal = 0

        const pegarValorUscrMax = await UsuarioRepository.query(`
        USE [${database}]
        SELECT
          USCR_VLR_MAX_APROV_PED_FORN
        FROM 
          USUARIO_CR
        WHERE 
          USCR_CERE_COD = ${cereCod}
        AND
          USCR_USUA_COD = ${cod}
      `)
        const pegarValorFucvMax = await UsuarioRepository.query(`
        USE [${database}]
        SELECT
          FUCV_VALOR_MAXIMO
        FROM 
          FORN_USUA_CR_VALOR
        WHERE 
          FUCV_CERE_COD = ${cereCod}
        AND
          FUCV_USUA_COD = ${cod}
        AND
          FUCV_FORN_COD = ${fornCod}
      `)
        if (!pegarValorFucvMax[0].FUCV_VALOR_MAXIMO) {
          if (!pegarValorUscrMax[0].USCR_VLR_MAX_APROV_PED_FORN) {
            return ({
              message: 'Usuário não tem acesso ao cr ou valor de aprovação não foi informado.',
              erro: true,
              status: 400
            })
          }
          nValorAprovUsuaMensal = pegarValorUscrMax[0].USCR_VLR_MAX_APROV_PED_FORN
        } else {
          nValorAprovUsuaMensal = pegarValorFucvMax[0].FUCV_VALOR_MAXIMO
        }

        if (valorTotalMes > nValorAprovUsuaMensal) {
          return ({
            message: 'Usuário não pode aprovar um valor tão alto para esse cr.',
            erro: true,
            status: 400
          })
        }
      }

      let statusSQL = ''

      const sql = countNumAprovaBoletim(codBulletin, database)

      const countNumAprovaBole = await PedidoEstoqueRepository.query(sql)

      const selectPageNumAprova = await PedidoEstoqueRepository.query(`
      USE [${database}]
       SELECT 
        PAG2_NUM_APROVACOES_BOLETIM,
        PAG2_TODAS_APROVACOES_BOLETIM
      FROM 
        PARAMETROS_GERAIS_2
    `)
      if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_BOLETIM === 'S') {
        if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_BOLETIM === 1) {
          statusSQL = "BOCS_STATUS = 'AP',"
        } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_BOLETIM === 2 && countNumAprovaBole[0].NUM === 1) {
          statusSQL = "BOCS_STATUS = 'AP',"
        }
      } else {
        statusSQL = "BOCS_STATUS = 'AP',"
      }

      const sqlUpdate = updateBoletim(ass, statusSQL, codBulletin, database)

      await PedidoEstoqueRepository.query(
        sqlUpdate
      )

      return {
        status: 200,
        message: 'Boletim contrato serviço aprovado ',
        erro: false

      }
    } catch (e) {
      return ({
        message: 'Internal server error',
        erro: true,
        status: 500
      })
    }
  }
}

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import { countNumAprovaBoletim, pegaValorAprovCrFornSql, pegaValorAprovCrSql, updateBoletim } from '../../queries/serviceContractBulletin'
dotenv.config()

interface IResponse {
    status: number;
    message: string;
    erro: boolean;
}

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}

export class ApprovalBulletinService {
  public async execute (token: string, codBulletin: string, ass: string, password: string, cereCod: string, valueBulletin: string, fornCod: string): Promise<IResponse> {
    console.log('====================================')
    console.log(token, codBulletin, ass, password, cereCod, valueBulletin, fornCod)
    console.log('====================================')
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(token, secretAcess) as IdecodeAcessToken

    const cod = parseInt(decodeToken.codUser)

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: cod })

    if (!existsUser) {
      return ({
        status: 400,
        message: 'Codigo incorreto',
        erro: true
      })
    }

    const passwordBD = existsUser.USUA_SENHA_APP

    const comparePassword = await bcrypt.compare(password, passwordBD)

    if (!comparePassword) {
      return ({
        message: 'Senha incorreta',
        erro: true,
        status: 400
      })
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      return ({
        message: 'Úsuario bloqueado',
        erro: true,
        status: 400
      })
    }

    const pag2Aprovs = await UsuarioRepository.query(
      `
      SELECT
        PAG2_APROV_USUA_CR_VALOR,
        PAG2_APROV_USUA_CR_VALOR_FORN
      FROM
        PARAMETROS_GERAIS_2
      `
    )

    if (pag2Aprovs[0].PAG2_APROV_USUA_CR_VALOR === 'S') {
      const pegaValorAprovQuery = pegaValorAprovCrSql(cereCod, cod + '')
      const pegaValorAprov = await UsuarioRepository.query(pegaValorAprovQuery)
      let valorTotal = 0
      if (pegaValorAprov[0]) {
        valorTotal = pegaValorAprov[0].valorTotal
      }
      const valorTotalMes = valorTotal + parseFloat(valueBulletin)
      const pegarValorUscrMax = await UsuarioRepository.query(`
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
      const pegaValorAprovQuery = pegaValorAprovCrFornSql(cereCod, fornCod, cod + '')
      const pegaValorAprov = await UsuarioRepository.query(pegaValorAprovQuery)
      const valorTotalMes = pegaValorAprov[0].valorTotal + parseFloat(valueBulletin)
      let nValorAprovUsuaMensal = 0

      const pegarValorUscrMax = await UsuarioRepository.query(`
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

    const sql = countNumAprovaBoletim(codBulletin)

    const countNumAprovaBole = await PedidoEstoqueRepository.query(sql)

    const selectPageNumAprova = await PedidoEstoqueRepository.query(`
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

    const sqlUpdate = updateBoletim(ass, statusSQL, codBulletin)

    await PedidoEstoqueRepository.query(
      sqlUpdate
    )

    return {
      status: 200,
      message: 'Boletim contrato serviço aprovado ',
      erro: false
    }
  }
}

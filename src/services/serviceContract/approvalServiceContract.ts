import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { attContratoCompraServico, countNumAprov } from '../../queries/serviceContract'
dotenv.config()

interface ICocsResponse {
    status: number;
    message: string;
    erro: boolean;
}
interface IdecodeAcessToken {
  refreshToken: string,
  USUA_SIGLA: string,
  codUser: string
}
export class ApprovalServiceContract {
  public async execute (TOKEN: string, ass: string, codCocs: string, password:string, valTotal: string): Promise<ICocsResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + ''

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken

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

    if (existsUser.USUA_VALOR_APROVA_CONT_SERV < parseFloat(valTotal)) {
      return ({
        message: `Contrato ${codCocs} não pode ser aprovado valor acima do de aprovação do úsuario`,
        erro: true,
        status: 401
      })
    }

    const selectPageNumAprova = await PedidoEstoqueRepository.query(`
      SELECT 
        PAG2_NUM_APROVACOES_CONTR,
        PAG2_TODAS_APROVACOES_CONTR
      FROM 
        PARAMETROS_GERAIS_2
    `)

    const sql = countNumAprov(codCocs)

    const selectQtdAprova = await PedidoEstoqueRepository.query(sql)

    let statusSQL = ''

    if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_CONTR === 'S') {
      if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 1) {
        statusSQL = "COCS_STATUS = 'AP',"
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 2 && selectQtdAprova[0].NUM === 1) {
        statusSQL = "COCS_STATUS = 'AP',"
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 3 && selectQtdAprova[0].NUM === 2) {
        statusSQL = "COCS_STATUS = 'AP',"
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 4 && selectQtdAprova[0].NUM === 3) {
        statusSQL = "COCS_STATUS = 'AP',"
      }
    } else {
      statusSQL = "COCS_STATUS = 'AP',"
    }

    const sql2 = attContratoCompraServico(codCocs, ass, statusSQL)
    await PedidoEstoqueRepository.query(
      sql2
    )
    return {
      status: 200,
      message: `Contrato ${codCocs} aprovado com sucesso`,
      erro: false
    }
  }
}

import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';
import bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import { attContratoCompraServico, countNumAprov } from '../../queries/serviceContract';
import AppError from '../../errors/AppError';

interface ICocsResponse {
    status: number;
    message: string;
    erro: boolean;
}

export class ApprovalServiceContract {
  public async execute (userId: number, ass: string, codCocs: string, password:string, valTotal: string): Promise<ICocsResponse> {

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: userId });

    if (!existsUser) {
      throw new AppError('usuario ou senha incorreto!');
    }

    const passwordBD = existsUser.USUA_SENHA_APP;

    const comparePassword = await bcrypt.compare(password, passwordBD);

    if (!comparePassword) {
      throw new AppError('usuario ou senha incorreto!');
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      throw new AppError('Úsuario bloqueado');
    }

    if (existsUser.USUA_VALOR_APROVA_CONT_SERV < parseFloat(valTotal)) {
      throw new AppError(`Contrato ${codCocs} não pode ser aprovado valor acima do de aprovação do úsuario`,401);
    }

    const selectPageNumAprova = await PedidoEstoqueRepository.query(`
      SELECT
        PAG2_NUM_APROVACOES_CONTR,
        PAG2_TODAS_APROVACOES_CONTR
      FROM
        PARAMETROS_GERAIS_2
    `);

    const sql = countNumAprov(codCocs);

    const selectQtdAprova = await PedidoEstoqueRepository.query(sql);

    let statusSQL = '';

    if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_CONTR === 'S') {
      if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 1) {
        statusSQL = 'COCS_STATUS = \'AP\',';
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 2 && selectQtdAprova[0].NUM === 1) {
        statusSQL = 'COCS_STATUS = \'AP\',';
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 3 && selectQtdAprova[0].NUM === 2) {
        statusSQL = 'COCS_STATUS = \'AP\',';
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 4 && selectQtdAprova[0].NUM === 3) {
        statusSQL = 'COCS_STATUS = \'AP\',';
      }
    } else {
      statusSQL = 'COCS_STATUS = \'AP\',';
    }

    const sql2 = attContratoCompraServico(codCocs, ass, statusSQL);
    await PedidoEstoqueRepository.query(
      sql2
    );
    return {
      status: 200,
      message: `Contrato ${codCocs} aprovado com sucesso`,
      erro: false
    };
  }
}

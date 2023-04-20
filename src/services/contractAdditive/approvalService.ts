import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';
import bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import { countNumAprovAditivoContrato, updateAditivoContrato } from '../../queries/contractAdditive';
import AppError from '../../errors/AppError';

interface IAdcsResponse {
    status: number;
    message: string;
    erro: boolean;
}

export class ApprovalContractAdditive {
  public async execute (userId: number, ass: string, codCocs: string, password: string): Promise<IAdcsResponse> {

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
      throw new AppError('Usúario bloqueado!');

    }

    const selectPageNumAprova = await PedidoEstoqueRepository.query(`
      SELECT
        PAG2_NUM_APROVACOES_CONTR,
        PAG2_TODAS_APROVACOES_CONTR
      FROM
        PARAMETROS_GERAIS_2
    `);

    const sql = countNumAprovAditivoContrato(codCocs);

    const selectQtdAprova = await PedidoEstoqueRepository.query(sql);

    let statusSQL = '';

    if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_CONTR === 'S') {
      if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 1) {
        statusSQL = ',ADCS_APROVADO = \'S\'';
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 2 && selectQtdAprova[0].NUM === 1) {
        statusSQL = ',ADCS_APROVADO = \'S\'';
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 3 && selectQtdAprova[0].NUM === 2) {
        statusSQL = ',ADCS_APROVADO = \'S\'';
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_CONTR === 4 && selectQtdAprova[0].NUM === 3) {
        statusSQL = ',ADCS_APROVADO = \'S\'';
      }
    } else {
      statusSQL = ',ADCS_APROVADO = \'S\'';
    }

    const sql2 = updateAditivoContrato(codCocs, ass, statusSQL);

    await PedidoEstoqueRepository.query(
      sql2
    );

    return {
      status: 200,
      message: `Aditivo de contrato ${codCocs} aprovado com sucesso`,
      erro: false
    };
  }
}

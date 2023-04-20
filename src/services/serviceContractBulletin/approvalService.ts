import bcrypt from 'bcrypt';
import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';
import { countNumAprovaBoletim, updateBoletim } from '../../queries/serviceContractBulletin';
import AppError from '../../errors/AppError';

interface IResponse {
    status: number;
    message: string;
    erro: boolean;
}

export class ApprovalBulletinService {
  public async execute (userId: number, codBulletin: string, ass: string, password: string): Promise<IResponse> {

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: userId });

    if (!existsUser) {
      throw new AppError('usuario ou senha incorretos!');
    }

    const passwordBD = existsUser.USUA_SENHA_APP;

    const comparePassword = await bcrypt.compare(password, passwordBD);

    if (!comparePassword) {
      throw new AppError('usuario ou senha incorretos!');
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      throw new AppError('Úsuario bloqueado');

    }

    let statusSQL = '';

    const sql = countNumAprovaBoletim(codBulletin);

    const countNumAprovaBole = await PedidoEstoqueRepository.query(sql);

    const selectPageNumAprova = await PedidoEstoqueRepository.query(`
       SELECT
        PAG2_NUM_APROVACOES_BOLETIM,
        PAG2_TODAS_APROVACOES_BOLETIM
      FROM
        PARAMETROS_GERAIS_2
    `);
    if (selectPageNumAprova[0].PAG2_TODAS_APROVACOES_BOLETIM === 'S') {
      if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_BOLETIM === 1) {
        statusSQL = 'BOCS_STATUS = \'AP\',';
      } else if (selectPageNumAprova[0].PAG2_NUM_APROVACOES_BOLETIM === 2 && countNumAprovaBole[0].NUM === 1) {
        statusSQL = 'BOCS_STATUS = \'AP\',';
      }
    } else {
      statusSQL = 'BOCS_STATUS = \'AP\',';
    }

    const sqlUpdate = updateBoletim(ass, statusSQL, codBulletin);

    await PedidoEstoqueRepository.query(
      sqlUpdate
    );

    return {
      status: 200,
      message: 'Boletim contrato serviço aprovado ',
      erro: false
    };
  }
}

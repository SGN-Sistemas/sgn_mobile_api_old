import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import bcrypt from 'bcrypt';
import { PedidoEstoqueRepository } from '../../typeorm/repository/pedidoEstoqueRepositories';
import { countNumAprovaSoliCompra, updateASSSolicitacao } from '../../queries/purchaseOrder';
import AppError from '../../errors/AppError';


interface IResponse {
    message: string,
    error: boolean,
    status: number,
}

export class ApprovalPurchaseOrderService {
  public async execute(
    userId: number,
    USUA_SENHA_APP: string,
    posUsuaCod: string,
    socoCod: string,
    valorTotalSoco: number
  ): Promise<IResponse> {

    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: userId });

    if (!existsUser) {
      throw new AppError('usuário ou senha incorreto!');
    }

    const passwordBD = existsUser.USUA_SENHA_APP;

    const comparePassword = await bcrypt.compare(USUA_SENHA_APP, passwordBD);

    if (!comparePassword) {
      throw new AppError('usuário ou senha incorreto!');
    }

    if (existsUser.USUA_BLOQ !== 'N') {
      throw new AppError('usuário bloqueado');
    }

    if (existsUser.usua_valor_aprov_solic < valorTotalSoco) {
      throw new AppError('Úsuario não pode aprovar um valor tão alto');

    }

    const sqlContNumAprovaS = countNumAprovaSoliCompra(socoCod);

    const countNumAprovaS = await PedidoEstoqueRepository.query(
      sqlContNumAprovaS
    );

    const sqlAprovaNumPage = await PedidoEstoqueRepository.query(`
    SELECT
      page_num_aprovacoes_solic,
      page_todas_aprovacoes_solic
    FROM
      PARAMETROS_GERAIS
    `);

    let statusSQL = '';

    if (sqlAprovaNumPage[0].page_todas_aprovacoes_solic === 'S') {
      if (sqlAprovaNumPage[0].page_num_aprovacoes_solic === 1) {
        statusSQL = 'SOCO_STATUS = \'AP\',';
      } else if (
        sqlAprovaNumPage[0].page_num_aprovacoes_solic === 2 &&
        countNumAprovaS[0].NUM === 1
      ) {
        statusSQL = 'SOCO_STATUS = \'AP\',';
      }
    } else {
      statusSQL = 'SOCO_STATUS = \'AP\',';
    }

    const sql = updateASSSolicitacao(socoCod, posUsuaCod, statusSQL);

    await PedidoEstoqueRepository.query(sql);
    return {
      message: 'Solicitação aprovada com sucesso',
      error: false,
      status: 200,
    };
  }
}

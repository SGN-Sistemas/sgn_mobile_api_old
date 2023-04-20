import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories';
import { selectCRUsua } from '../../queries/relUserResultCenter';
import { selectCere } from '../../queries/resultCenter';
import AppError from '../../errors/AppError';

interface IPromise {
  error: boolean,
  message: string,
  status: number
}

type IArray = {
  USCR_CERE_COD:string
}

export class ListResultCenterService {
  public async execute (userId: number): Promise<IPromise> {


    const existsUser = await UsuarioRepository.findOneBy({ USUA_COD: userId });

    if (!existsUser) {
      throw new AppError('Usuario não existe');
    }

    if (existsUser.USUA_TIPO === 'E') {
      const sqlSpecial = await UsuarioRepository.query(`
        SELECT
          CERE_NOME,
          CERE_SIGLA,
          CERE_PLCG_COD,
          CERE_COD
        FROM
          CENTRO_RESULTADO
      `);
      return {
        error: false,
        message: sqlSpecial,
        status: 200
      };
    }

    const selectCRUsuaQuery = selectCRUsua(userId);

    const verifyCR = await UsuarioRepository.query(selectCRUsuaQuery);

    let cods = '';

    verifyCR.forEach((element: IArray) => {
      if (cods === '') {
        cods = element.USCR_CERE_COD;
      } else {
        cods = cods + ',' + element.USCR_CERE_COD;
      }
    });

    const selectCereQuery = selectCere(cods, '');

    const resultQueryCereSelect = await UsuarioRepository.query(selectCereQuery);

    return {
      error: false,
      message: resultQueryCereSelect,
      status: 400
    };
  }
}

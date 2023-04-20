import { Request, Response } from 'express';
import { GetDailyMovimentServices } from '../services/dayleMoviment/GetDailyMovimentServices';
import { GetDailyMovimentComboAplicacaoServices } from '../services/dayleMoviment/GetDailyMovimentComboAplicacaoServices';
import { FilterAplicacao } from '../services/dayleMoviment/FilterAplicacaoService';
import { FilterDataAndAplMovimentService } from '../services/dayleMoviment/FilterDataAndAplMovimentService';
import { DetailsMoivmentService } from '../services/dayleMoviment/DetailsMoivmentService';

export default class DailyMovimentController {

  public async list(request: Request, response: Response): Promise<Response> {
    const userSigla = request.user.USUA_SIGLA;
    const getDailyMovimentServices = new GetDailyMovimentServices();

    const execute = await getDailyMovimentServices.execute(userSigla);

    return response.json(execute);
  }

  public async listCmb (request: Request, response: Response): Promise<Response> {
    const userSigla = request.user.USUA_SIGLA;

    const getDailyMovimentComboAplicacaoServices = new GetDailyMovimentComboAplicacaoServices();

    const execute = await getDailyMovimentComboAplicacaoServices.execute(userSigla);

    return response.json(execute);
  }

  public async FilterAplicacaoNome (request: Request, response: Response): Promise<Response> {
    const userSigla = request.user.USUA_SIGLA;

    const { aplicacao } = request.params;

    const filterAplicacao = new FilterAplicacao();

    const execute = await filterAplicacao.execute(userSigla, aplicacao);

    return response.json(execute);
  }

  public async FilterAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const userSigla = request.user.USUA_SIGLA;

    const { aplicacao, dataIni, dataFim } = request.body;

    const filterDataAndAplMovimentService = new FilterDataAndAplMovimentService();

    const execute = await filterDataAndAplMovimentService.execute(userSigla, dataIni, dataFim, aplicacao);

    return response.json(execute);
  }

  public async DetailsAplicacaoDataAndApl (request: Request, response: Response): Promise<Response> {
    const userSigla = request.user.USUA_SIGLA;
    const { aplicacao, date } = request.query;

    const detailsMoivmentService = new DetailsMoivmentService();

    if (!aplicacao) {
      const execute = await detailsMoivmentService.execute(userSigla, date.toString(), '');

      return response.json(execute);
    }

    const execute = await detailsMoivmentService.execute(userSigla, date.toString(), aplicacao.toString());

    return response.json(execute);
  }
}

import { Request, Response } from 'express';
import { VerfifyVersion } from '../services/update/verify';

export class UpdateController {
  public async verify (request: Request, response: Response): Promise<Response> {
    const { platform, version } = request.params;
    const verfifyVersion = new VerfifyVersion();
    const execute = await verfifyVersion.execute(parseInt(version), platform);
    return response.json(execute);
  }
}

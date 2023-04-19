import dotenv from 'dotenv';
import { EmpresaContaRepository } from '../../typeorm/repository/empresaRepositories';
import jwt from 'jsonwebtoken';
import { searchEmprUsua } from '../../queries/branch';

dotenv.config();

interface IdecodeAcessToken {
    refreshToken: string,
    USUA_SIGLA: string,
    codUser: string
}
interface IResponse {
    DEBITO: number,
    CREDITO: number,
    SALDO: number,
    DATA: string
}

export class ListCompanyUserService {
  public async execute (TOKEN: string): Promise<IResponse> {
    const secretAcess = process.env.TOKEN_SECRET_ACESS + '';

    const decodeToken = jwt.verify(TOKEN, secretAcess) as IdecodeAcessToken;

    const codUser = decodeToken.codUser;

    const sql = searchEmprUsua(codUser);

    const empresaQuery = await EmpresaContaRepository.query(sql);

    return empresaQuery;
  }
}

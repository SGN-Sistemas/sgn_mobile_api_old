import { USUARIO } from '../typeorm/entities/usuario';

declare global {
  namespace Express {
    export interface Request {
      user: Partial<USUARIO>;
    }
  }
}

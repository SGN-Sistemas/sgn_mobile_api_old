import {Router} from 'express';
import { DataConnectionControllers } from '../../controllers/dataConnection';

export const routerDataConnection = Router();

const dataConnectionControllers = new DataConnectionControllers();

routerDataConnection.get('/:cnpj', dataConnectionControllers.list);

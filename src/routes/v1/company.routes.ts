import { Router } from 'express';
import CompanyController from '../../controllers/empresaController';

const routerCompany = Router();

const company = new CompanyController();

routerCompany.get('/', company.list);

export default routerCompany;

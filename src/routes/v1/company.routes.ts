import express from 'express'
import CompanyController from '../../controllers/empresaController'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'

const routerCompany = express.Router()

const company = new CompanyController()

routerCompany.get('/', isAuthenticatedAcess, company.list)

export default routerCompany

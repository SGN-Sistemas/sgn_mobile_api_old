import express from 'express'
import isAuthenticatedAcess from '../../middlewares/isAuthenticatedAcess'
import { BranchControllers } from '../../controllers/branchControllers'

export const routerBranch = express.Router()

const branchControllers = new BranchControllers()

routerBranch.get('/', isAuthenticatedAcess, branchControllers.list)

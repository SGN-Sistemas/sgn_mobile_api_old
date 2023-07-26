import express from 'express'
import { routerUser } from './user.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from '../../swagger/swagger.json'
import { routerDailyMoviment } from './dailyMoviment.routes'
import { routerRequest } from './request.routes'
import routerCompany from './company.routes'
import { routerPurchaseOrder } from './purchaseOrder.routes'
import { routerServiceContract } from './serviceContract.routes'
import { routerBulletin } from './bulletinService.routes'
import { routerSchedule } from './schedule.routes'
import { routerContractAdditive } from './additiveContract.routes'
import { routerContractAdditiveTerm } from './additiveContractTerm.routes'
import { routerResultCenter } from './resultCenter.routes'
import { routerDataConnection } from './dataConnection.routes'
import { routerUpdate } from './update.routes'
import { routerSector } from './sectorPurchase.routes'
import { routerMaterial } from './material.routes'
import { routerWarehouse } from './warehouse.routes'
import { routerServices } from './service.routes'
import { routerCr } from './cr.routes'
import { routerUnidMat } from './unidMat.routes'
import { routerGuys } from './guys.routes'
import { routerItemPgc } from './itemPcg.routes'
import { routerPage } from './page.routes'
import { routerNotification } from './notification.routes'
import routerPurchaseWorksheet from './purchaseWorksheet.routes'
import { routerPay } from './pay.routes'
import { routerBranch } from './branch.routes'
import { routerLocal } from './local.routes'
import { routerSupplier } from './supplier.routes'

export const routerV1 = express.Router()

routerV1.use('/dataConnection', routerDataConnection)

routerV1.use('/usuario', routerUser)

routerV1.use('/dailyMoviment', routerDailyMoviment)

routerV1.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

routerV1.use('/pedido', routerRequest)

routerV1.use('/empresa', routerCompany)

routerV1.use('/solicitacaoCompra', routerPurchaseOrder)

routerV1.use('/contratoServico', routerServiceContract)

routerV1.use('/boletimServico', routerBulletin)

routerV1.use('/agenda', routerSchedule)

routerV1.use('/contratoAditivo', routerContractAdditive)

routerV1.use('/contratoAditivoPR', routerContractAdditiveTerm)

routerV1.use('/atualizacao', routerUpdate)

routerV1.use('/cr', routerResultCenter)

routerV1.use('/setorCompra', routerSector)

routerV1.use('/material', routerMaterial)

routerV1.use('/almoxarifado', routerWarehouse)

routerV1.use('/servicos', routerServices)

routerV1.use('/cr', routerCr)

routerV1.use('/unidMat', routerUnidMat)

routerV1.use('/pessoal', routerGuys)

routerV1.use('/itemPcg', routerItemPgc)

routerV1.use('/page', routerPage)

routerV1.use('/notification', routerNotification)

routerV1.use('/planilhaDeCompra', routerPurchaseWorksheet)

routerV1.use('/pagar', routerPay)

routerV1.use('/filial', routerBranch)

routerV1.use('/local', routerLocal)

routerV1.use('/fornecedor', routerSupplier)

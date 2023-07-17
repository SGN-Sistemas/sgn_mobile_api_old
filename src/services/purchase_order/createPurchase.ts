import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { insertSoco } from '../../queries/purchaseOrder'

interface IResponse {
    message: string,
    status: number,
    error: boolean
}

interface Iparametros {
  secoCod: string,
  servCod: string,
  itpcCod: string,
  cereCod: string,
  unmaCod: string,
  almoCod: string,
  dtNece: string,
  qtd: string,
  mateCod: string,
  pessCodSoli: string,
  ass1: string,
  ass2: string,
  cod: string,
  database: string
}

export class CreatePurchase {
  public async execute ({
    secoCod,
    servCod,
    itpcCod,
    cereCod,
    unmaCod,
    almoCod,
    dtNece,
    qtd,
    mateCod,
    pessCodSoli,
    ass1,
    ass2,
    cod,
    database
  }: Iparametros): Promise<IResponse> {
    try {
      const dt = new Date()

      let data: number | string

      dt.getDate() > 10 ? data = dt.getDate() : data = '0' + dt.getDate()

      let month: number | string = dt.getMonth() + 1

      month < 10 ? month = '0' + (dt.getMonth() + 1) : month = dt.getMonth() + 1

      const dtSoli = dt.getFullYear() + '-' + month + '-' + data

      const sqlSocoCodMax1 = `
      USE [${database}]
      SELECT 
        MAX(SOCO_COD) + 1 as COD
      FROM 
        SOLICITACAO_COMPRA
      `

      const dataSocoCodMax1 = await UsuarioRepository.query(sqlSocoCodMax1)

      const socoCod = dataSocoCodMax1[0].COD

      const socoCodUltimo = socoCod - 1

      const sqlSocoNum = `
      USE [${database}]
        SELECT
          (ISNULL(SOCO_NUMERO,0) + 1) AS SOCO_NUMERO
        FROM
          SOLICITACAO_COMPRA
        WHERE
          SOCO_COD = ${socoCodUltimo}
      `

      const dataSocoNumMax1 = await UsuarioRepository.query(sqlSocoNum)

      const socoNum = dataSocoNumMax1[0].SOCO_NUMERO

      console.log('====================================')
      console.log(socoNum)
      console.log('====================================')

      const sqlInsertSoco = insertSoco({
        socoCod,
        itpcCod,
        servCod,
        userLogged: cod + '',
        cereCod,
        secoCod,
        unmaCod,
        almoCod,
        dtSoli,
        dtNece,
        qtd,
        mateCod,
        socoNum,
        pessCodSoli,
        ass1,
        ass2,
        database
      })

      console.log('====================================')
      console.log(sqlInsertSoco)
      console.log('====================================')

      await UsuarioRepository.query(sqlInsertSoco)
      return ({
        message: `Solicitação ${socoCod} inserida com sucesso`,
        status: 200,
        error: false
      })
    } catch (e) {
      return ({
        message: 'Intertanl server error',
        status: 500,
        error: true
      })
    }
  }
}

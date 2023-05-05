import { UsuarioRepository } from '../../typeorm/repository/usuarioRepositories'
import { detailsCR } from '../../queries/resultCenter'

interface IPromise {
  error: boolean,
  message: object,
  status: number;
}
interface IQuery {
  tipo: string;
  sigla: string;
  desc: string;
  valPago: string;
  dtVenc: string;
  nivel: string;
  codPai: string;
  clientForn: string;
  valPrev: string;
  dtEmis: string;
  dtBaixa: string;
  cod2: string;
  indPrevisao: string;
  cod3: string;
  cod4: string;
}

export class DetailsResultCenterService {
  public async execute (cod: string, planoContasCod: string, dataIni: string, dataFim: string): Promise<IPromise> {
    const sqlSelectDetails = detailsCR(
      planoContasCod,
      cod,
      dataFim,
      dataIni
    )

    const resultSelectDetails = await UsuarioRepository.query(sqlSelectDetails)

    // receitas

    let totalReceita = 0
    let baixadoReceita = 0
    let abertoReceita = 0

    // despesas

    let baixadoDespesa = 0
    let totalDespesa = 0
    let abertoDespesa = 0

    // valor totais

    let baixado = 0
    let total = 0
    let aberto = 0

    resultSelectDetails.forEach((element: IQuery) => {
      let valPago = parseFloat(element.valPago)
      let tipo = parseInt(element.tipo)
      let valPrev = parseFloat(element.valPrev)

      if (!valPago) {
        valPago = 0
      }
      if (!tipo) {
        tipo = 0
      }
      if (!valPrev) {
        valPrev = 0
      }

      if (parseInt(element.tipo) === 4 || parseInt(element.tipo) === 5 ||
        parseInt(element.tipo) === 8) {
        if (parseFloat(element.valPago) !== null) {
          baixadoReceita += valPago
        }
        if (parseFloat(element.valPrev) !== null) {
          if (parseFloat(element.valPago) !== null) {
            totalReceita += valPago
          } else {
            totalReceita += valPrev
          }
        } else {
          totalReceita += valPago
        }
      } else {
        if (parseFloat(element.valPago) !== null) {
          baixadoDespesa += valPago
        }
        if (parseFloat(element.valPrev) !== null) {
          if (parseFloat(element.valPago) !== null) {
            totalDespesa = baixadoDespesa
          } else {
            totalDespesa = baixadoDespesa + valPrev
          }
        } else {
          totalDespesa += baixadoDespesa
        }
      }
    })

    console.log('====================================')
    console.log(totalReceita)
    console.log('====================================')

    abertoReceita = totalReceita - baixadoReceita
    abertoDespesa = totalDespesa - baixadoDespesa

    aberto = abertoReceita - abertoDespesa
    baixado = baixadoReceita - baixadoDespesa
    total = totalReceita - totalDespesa

    const responseDados = {
      receita: {
        abertoReceita: abertoReceita.toFixed(2),
        totalReceita: totalReceita.toFixed(2),
        baixadoReceita: baixadoReceita.toFixed(2)
      },
      despesa: {
        totalDespesa: totalDespesa.toFixed(2),
        baixadoDespesa: baixadoDespesa.toFixed(2),
        abertoDespesa: abertoDespesa.toFixed(2)
      },
      totais: {
        baixado: baixado.toFixed(2),
        aberto: aberto.toFixed(2),
        total: total.toFixed(2)
      }
    }

    return {
      error: false,
      message: responseDados,
      status: 200
    }
  }
}

export const pegaPeriodo = (colunaTabela : string) => {
  let dataInic = ''
  let dataFim = ''

  const dateNow = new Date()
  const month = dateNow.getMonth()
  const year = dateNow.getFullYear()

  switch (month) {
    case 0:
      dataInic = `${year}-01-01 00:00:00.000`
      dataFim = `${year}-01-31 00:00:00.000`
      break
    case 1:
      dataInic = `${year}-02-01 00:00:00.000`
      dataFim = `${year}-02-28 00:00:00.000`
      break
    case 2:
      dataInic = `${year}-03-01 00:00:00.000`
      dataFim = `${year}-03-31 00:00:00.000`
      break
    case 3:
      dataInic = `${year}-04-01 00:00:00.000`
      dataFim = `${year}-04-30 00:00:00.000`
      break
    case 4:
      dataInic = `${year}-05-01 00:00:00.000`
      dataFim = `${year}-05-31 00:00:00.000`
      break
    case 5:
      dataInic = `${year}-06-01 00:00:00.000`
      dataFim = `${year}-06-30 00:00:00.000`
      break
    case 6:
      dataInic = `${year}-07-01 00:00:00.000`
      dataFim = `${year}-07-31 00:00:00.000`
      break
    case 7:
      dataInic = `${year}-08-01 00:00:00.000`
      dataFim = `${year}-08-31 00:00:00.000`
      break
    case 8:
      dataInic = `${year}-09-01 00:00:00.000`
      dataFim = `${year}-09-30 00:00:00.000`
      break
    case 9:
      dataInic = `${year}-10-01 00:00:00.000`
      dataFim = `${year}-10-31 00:00:00.000`
      break
    case 10:
      dataInic = `${year}-11-01 00:00:00.000`
      dataFim = `${year}-11-30 00:00:00.000`
      break
    case 11:
      dataInic = `${year}-12-01 00:00:00.000`
      dataFim = `${year}-12-31 00:00:00.000`
      break
    default:
      dataInic = `${year}-01-01 00:00:00.000`
      dataFim = `${year}-01-31 00:00:00.000`
      break
  }

  return `
    AND
        ${colunaTabela} >= '${dataInic}'
    AND
        ${colunaTabela} <= '${dataFim}'
  `
}

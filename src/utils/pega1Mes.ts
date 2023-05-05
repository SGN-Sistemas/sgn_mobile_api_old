/* eslint-disable @typescript-eslint/no-explicit-any */
const data1Mes = () => {
  const date = new Date()

  date.setDate(date.getDate() - 30)

  let data:any

  date.getDate() > 10 ? data = date.getDate() : data = '0' + date.getDate()

  let month:any = date.getMonth() + 1

  month < 10 ? month = '0' + (date.getMonth() + 1) : month = date.getMonth() + 1

  const dateFormated = date.getFullYear() + '-' + month + '-' + data

  return dateFormated
}

export default data1Mes

export default {
  parseDatePtBr: (dt) => {
    let hoje = new Date()
    let splited = dt.split("/")
    let dia = splited[0] || hoje.getDate()
    let mes = splited[1] || (hoje.getMonth() + 1)
    let ano = splited[2] || hoje.getFullYear()

    if (isFinite(ano) && ano > 0) {
      if (ano < 1000) ano = parseInt(ano) + 2000
      if (ano < 1900) ano = 1900
      if (ano > 2100) ano = 2100
    }

    return new Date(ano, mes - 1, dia)
  },
  stringIsoToDate: (str) => {
    let splited = str.split("-")
    let ano = splited[0]
    let mes = splited[1]
    let dia = splited[2]

    return new Date(ano, mes, dia)
  }
}
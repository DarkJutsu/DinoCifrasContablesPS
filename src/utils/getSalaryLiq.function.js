import { getAFP } from "./getAFP.function"
import { getISSS } from "./getISSS.function"
import { getRenta } from "./getRenta.function"

export function getSalaryLiq(salario){
  let salarioLiq=0.00

  salarioLiq=salario-(parseFloat(getAFP(salario))+parseFloat(getISSS(salario))+parseFloat(getRenta(salario)))

  return salarioLiq.toFixed(2)
}
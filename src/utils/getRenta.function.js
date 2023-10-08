import { getAFP } from "./getAFP.function";
import { getISSS } from "./getISSS.function";

export function getRenta(salario) {
  let renta = 0.0;
  let salarioSinAFPISSS = 0.0;

  salarioSinAFPISSS =
    salario - (parseFloat(getISSS(salario)) + parseFloat(getAFP(salario)));

  const TRAMOI = salarioSinAFPISSS >= 0.01 && salarioSinAFPISSS <= 472.0;
  const TRAMOII = salarioSinAFPISSS >= 472.01 && salarioSinAFPISSS <= 895.24;
  const TRAMOIII = salarioSinAFPISSS >= 895.25 && salarioSinAFPISSS <= 2038.1;
  const TRAMOVI = salarioSinAFPISSS >= 2038.11;

  if (TRAMOI) {
    renta = 0.0;
  } else if (TRAMOII) {
    renta = salarioSinAFPISSS - 472.0;
    renta = renta * 0.1 + 17.67;
  } else if (TRAMOIII) {
    renta = salarioSinAFPISSS - 895.24;
    renta = renta * 0.2 + 60.0;
  } else if (TRAMOVI) {
    renta = salarioSinAFPISSS - 2038.1;
    renta = renta * 0.3 + 288.57;
  }

  return renta.toFixed(2);
}

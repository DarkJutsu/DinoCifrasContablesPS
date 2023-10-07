import { ISSS, ISSSFIJO } from "./inpuestos";

export function getISSS(salario) {
  let isss = 0.0;

  if (salario >= 1000) {
    isss = ISSSFIJO;
  } else {
    isss = salario * ISSS;
  }

  return isss.toFixed(2);
}

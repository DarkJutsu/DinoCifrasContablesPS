import { AFP } from "./inpuestos";

export function getAFP(salario) {
  let afp = 0.0;

  afp = salario * AFP;

  return afp.toFixed(2);
}

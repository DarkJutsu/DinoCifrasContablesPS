import { getYearMonth } from "./getYearMonth.function";

export const getRenuncia = (salario, fechaIngreso) => {
  let renu = 0.0;
  let salQuincena = salario / 2;
  const { yearsElapsed } = getYearMonth(fechaIngreso);

  if (salQuincena < 600) {
    renu = salQuincena * yearsElapsed;
  } else {
    renu = 600 * yearsElapsed;
  }

  return renu.toFixed(2);
};

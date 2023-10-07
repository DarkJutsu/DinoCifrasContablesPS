import { getDays } from "./getDays.function";
import { getYearMonth } from "./getYearMonth.function";

export const getAguinaldoEqui = (salario, fechaIngreso) => {
  let agui = 0.0;
  let diasAgui = 15;

  let { yearsElapsed } = getYearMonth(fechaIngreso);
  const diasTranscurridos = getDays(fechaIngreso);

  if (yearsElapsed >= 1 && yearsElapsed <= 3) {
    diasAgui = 15;
  } else if (yearsElapsed > 3 && yearsElapsed <= 10) {
    diasAgui = 19;
  } else if (yearsElapsed > 10) {
    diasAgui = 21;
  }

  agui = (salario / 30) * diasAgui;

  const diasEqui =
    diasTranscurridos > 365
      ? diasTranscurridos - 365 * yearsElapsed
      : diasTranscurridos;

  agui = (agui / 365) * diasEqui;

  return agui.toFixed(2);
};

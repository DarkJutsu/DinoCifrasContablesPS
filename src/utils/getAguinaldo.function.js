import { getYearMonth } from "./getYearMonth.function";

export const getAguinaldo = (salario, fechaIngreso) => {
  let agui = 0.0;
  let diasAgui = 15;

  let { yearsElapsed } = getYearMonth(fechaIngreso);

  if (yearsElapsed >= 1 && yearsElapsed <= 3) {
    diasAgui = 15;
  } else if (yearsElapsed > 3 && yearsElapsed <= 10) {
    diasAgui = 19;
  } else if (yearsElapsed > 10) {
    diasAgui = 21;
  }

  agui = (salario / 30) * diasAgui;

  return agui.toFixed(2);
};

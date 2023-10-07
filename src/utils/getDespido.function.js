import { getDays } from "./getDays.function";
import { getYearMonth } from "./getYearMonth.function";

export const getDespido = (salario, fechaIngreso) => {
  let despi = 0.0;
  let despiFrac = 0.0;

  const { yearsElapsed } = getYearMonth(fechaIngreso);
  const diasTranscurridos = getDays(fechaIngreso);
  const diasEqui =
    diasTranscurridos > 365
      ? diasTranscurridos - 365 * yearsElapsed
      : diasTranscurridos;

  despi = salario * yearsElapsed;
  despiFrac = (diasEqui * salario) / 360;

  despi = despi + despiFrac;

  return despi.toFixed(2);
};

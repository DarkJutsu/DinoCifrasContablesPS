import { getDays } from "./getDays.function";
import { getVacaciones } from "./getVacaciones.function";
import { getYearMonth } from "./getYearMonth.function";

export const getVacacionesEqui = (salario, fechaIngreso) => {
  let vacaEqui = 0.0;
  let diasEqui = 0;
  let vacaCompleta = getVacaciones(salario);

  let { yearsElapsed } = getYearMonth(fechaIngreso);

  const diasTranscurridos = getDays(fechaIngreso);

  diasEqui =
    diasTranscurridos > 365
      ? diasTranscurridos - 365 * yearsElapsed
      : diasTranscurridos;

  vacaEqui = (diasEqui * vacaCompleta) / 360;

  return vacaEqui.toFixed(2);
};

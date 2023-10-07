export function getFchFormat(fecha) {
  const fch = new Date(fecha);

  const dia = fch.getDate();
  const mes = fch.getMonth() + 1; // Meses comienzan desde 0, sumamos 1
  const anio = fch.getFullYear();

  // Asegúrate de que el día y el mes tengan dos dígitos
  const diaFormateado = dia < 10 ? "0" + dia : dia;
  const mesFormateado = mes < 10 ? "0" + mes : mes;

  // Formatea la fecha en el formato "DD/MM/YYYY"
  const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
}

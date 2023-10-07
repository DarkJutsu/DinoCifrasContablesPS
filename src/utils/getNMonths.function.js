export function getNMonths(fechaInicio) {
  const fchIni = new Date(fechaInicio);
  const fchNow = new Date();

  const diferenciaEnMilisegundos = fchNow - fchIni;

  // Convertir la diferencia a meses
  const meses = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 30.44);

  return Math.floor(meses);
}

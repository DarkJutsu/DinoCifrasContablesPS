export function getYearMonth(fecha) {
    // Parsea la fecha de entrada
    const fchIni = new Date(fecha);
  
    // Obtiene la fecha actual
    const fchNow = new Date();
  
    // Calcula la diferencia en milisegundos
    const diferencia = fchNow - fchIni;
  
    // Calcula los años y meses
    const yearsElapsed = Math.floor(diferencia / (365.25 * 24 * 60 * 60 * 1000));
    const monthElapsed = Math.floor((diferencia % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
  
    return { yearsElapsed, monthElapsed };
  }
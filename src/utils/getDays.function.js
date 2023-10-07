export const getDays = (fechaIngreso) => {
  const fechaInicio = new Date(fechaIngreso);
  const fechaNow = new Date();

  const diferenciaEnMilisegundos = fechaNow - fechaInicio;

  const diasTranscurridos = Math.floor(
    diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
  );

  return diasTranscurridos;
};

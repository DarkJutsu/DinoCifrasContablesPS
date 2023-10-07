export const MiComponente = () => {
  // Definir las fechas (ignorando el año)
  const fechaInicio = new Date("2022-05-28"); // 0 representa enero, 8 representa septiembre (meses basados en 0)
  const fechaFin = new Date("2023-10-6"); // 9 representa octubre

  // Calcular la diferencia en milisegundos
  const diferenciaEnMilisegundos = fechaFin - fechaInicio;

  // Convertir la diferencia a días
  const diasTranscurridos = Math.floor(
    diferenciaEnMilisegundos / (1000 * 60 * 60 * 24)
  );

  return (
    <div>
      <h1>
        {diasTranscurridos > 365 ? diasTranscurridos - 365 : diasTranscurridos}
      </h1>
    </div>
  );
};

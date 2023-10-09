import { useState } from "react";

export const MiComponente = () => {
  // Definir estados para los valores de los inputs
  const [inputTexto, setInputTexto] = useState("");
  const [inputNumero, setInputNumero] = useState(0);
  let nn = 190;
  nn = nn * inputNumero;

  // Manejar el cambio en el input de texto
  const handleChangeTexto = (event) => {
    setInputTexto(event.target.value);
  };

  // Manejar el cambio en el input de número
  const handleChangeNumero = (event) => {
    setInputNumero(event.target.value);
  };

  return (
    <div>
      {/* Input de Texto */}
      <input type="text" value={inputTexto} onChange={handleChangeTexto} />
      <p>Texto ingresado: {inputTexto}</p>

      {/* Input de Número */}
      <input type="number" value={inputNumero} onChange={handleChangeNumero} />
      <p>Número ingresado: {nn}</p>
    </div>
  );
};

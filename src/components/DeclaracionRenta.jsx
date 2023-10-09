import { Link, useLocation } from "react-router-dom";
import { getVacaciones } from "../utils/getVacaciones.function";
import { getAFP } from "../utils/getAFP.function";
import { getISSS } from "../utils/getISSS.function";
import { getRenta } from "../utils/getRenta.function";
import { MdArrowBack } from "react-icons/md";
import { BsFiletypePdf } from "react-icons/bs";
import { getAguinaldo } from "../utils/getAguinaldo.function";
import { getFchFormat } from "../utils/getFchFormat.function";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/img/logo.png";
import { useState } from "react";

export const DeclaracionRenta = () => {
  const param = useLocation().state.state;

  const [cDedu, setCDedu] = useState(0);
  const [mDedu, setMDedu] = useState(0);

  const setColeg = (event) => {
    setCDedu(event.target.value);
  };
  const setMedi = (event) => {
    setMDedu(event.target.value);
  };

  let totalDedu = 0.0;
  totalDedu = (parseFloat(cDedu) + parseFloat(mDedu)).toFixed(2);

  let rentaEneJun = 0.0;
  let rentaJunDife = 0.0;
  let rentaEneMay = 0.0;

  let totalDic = 0.0;
  let rentaDic = 0.0;
  let rentaAnual = 0.0;

  const salaComi = parseFloat(param.salario);

  const salVaca = parseFloat(salaComi) + parseFloat(getVacaciones(salaComi));
  const afpIsssV = parseFloat(getAFP(salVaca)) + parseFloat(getISSS(salVaca));
  const salarioVAI = salVaca - afpIsssV;

  const afpIsss = parseFloat(getAFP(salaComi)) + parseFloat(getISSS(salaComi));
  const salarioF = salaComi - afpIsss;

  const totalEneJun = salarioF * 5 + salarioVAI;
  rentaEneMay = getRenta(salaComi) * 5;

  const TRAMOI = totalEneJun >= 0.01 && totalEneJun <= 2832.0;
  const TRAMOII = totalEneJun >= 2832.01 && totalEneJun <= 5371.44;
  const TRAMOIII = totalEneJun >= 5371.45 && totalEneJun <= 12228.6;
  const TRAMOVI = totalEneJun >= 12228.61;

  if (TRAMOI) {
    rentaEneJun = 0.0;
  } else if (TRAMOII) {
    rentaEneJun = totalEneJun - 2832.0;
    rentaEneJun = rentaEneJun * 0.1 + 106.2;
  } else if (TRAMOIII) {
    rentaEneJun = totalEneJun - 5371.44;
    rentaEneJun = rentaEneJun * 0.2 + 360.0;
  } else if (TRAMOVI) {
    rentaEneJun = totalEneJun - 12228.6;
    rentaEneJun = rentaEneJun * 0.3 + 1731.42;
  }

  rentaJunDife = rentaEneJun - rentaEneMay;
  totalDic = salarioF * 11 + parseFloat(salarioVAI);

  const DTRAMOI = totalDic >= 0.01 && totalDic <= 5664.0;
  const DTRAMOII = totalDic >= 5664.01 && totalDic <= 10742.86;
  const DTRAMOIII = totalDic >= 10742.87 && totalDic <= 24457.14;
  const DTRAMOVI = totalDic >= 24457.15;

  if (DTRAMOI) {
    rentaDic = 0.0;
  } else if (DTRAMOII) {
    rentaDic = totalDic - 5664.0;
    rentaDic = rentaDic * 0.1 + 212.12;
  } else if (DTRAMOIII) {
    rentaDic = totalDic - 10742.86;
    rentaDic = rentaDic * 0.2 + 720.0;
  } else if (DTRAMOVI) {
    rentaDic = totalDic - 24457.14;
    rentaDic = rentaDic * 0.3 + 3462.86;
  }

  let totalGrav = totalDic - totalDedu;

  const ATRAMOI = totalGrav >= 0.01 && totalGrav <= 4064.0;
  const ATRAMOII = totalGrav >= 4064.01 && totalGrav <= 9142.86;
  const ATRAMOIII = totalGrav >= 9142.87 && totalGrav <= 22857.14;
  const ATRAMOVI = totalGrav >= 22857.15;

  if (ATRAMOI) {
    rentaAnual = 0.0;
  } else if (ATRAMOII) {
    rentaAnual = totalGrav - 4064.0;
    rentaAnual = rentaAnual * 0.1 + 212.12;
  } else if (ATRAMOIII) {
    rentaAnual = totalGrav - 9142.86;
    rentaAnual = rentaAnual * 0.2 + 720.0;
  } else if (ATRAMOVI) {
    rentaAnual = totalGrav - 22857.14;
    rentaAnual = rentaAnual * 0.3 + 3462.86;
  }

  console.log(rentaAnual);

  const getMyPDF = () => {
    const myPDF = new jsPDF({
      putOnlyUsedFonts: true,
    });
    myPDF.addImage(logo, "PNG", 10, 10, 20, 20);
    myPDF.setFontSize(22);
    myPDF.text("dinocifras", 30, 20);
    myPDF.text("contables", 30, 27);

    myPDF.setFontSize(12);
    myPDF.setFont("helvetica", "bold");
    myPDF.text(
      "dinocifras contables S.A de C.V Constacia de Sueldo",
      100,
      40,
      null,
      null,
      "center"
    );
    autoTable(myPDF, {
      html: "#myTable",
      startY: 43,
      theme: "plain",
      margin: 10,
      useCss: true,
    });

    myPDF.setFont("helvetica", "normal");
    myPDF.text(
      `Atentamente,\n${param.nombre}\nF.______________`,
      30,
      240
    );

    myPDF.setFontSize(8);
    myPDF.text("Fecha de emisión: " + getFchFormat(Date()), 30, 290);

    myPDF.save(
      `${param.nombre} - Declaración de Renta - dinocifras contables S.A de C.V.pdf`
    );
  };

  return (
    <>
      <div className="w-fit">
        <Link to="/DinoCifrasContablesPS/detail" state={{ state: param }}>
          <div className="flex items-center font-comfortaa text-slate-800 hover:text-orange-50 bg-transparent w-fit py-2 px-4 rounded-md cursor-pointer mb-5 mt-9 border border-slate-800 hover:bg-slate-600">
            <MdArrowBack className="text-2xl cursor-pointer mr-2" />
            <span className="text-md font-bold">Volver</span>
          </div>
        </Link>
      </div>
      <div className="bg-orange-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 font-comfortaa mt-2">
        <h2 className="text-xl mb-3">
          Declaración del Impuesto sobre la Renta
        </h2>
        <div className="ml-2">
          <h3 className="text-4xl font-bold mb-2">
            {param.nombre}{" "}
            <span className="text-lg font-light bg-slate-500 py-1 px-2 rounded-xl text-orange-50">
              {param.cargo}
            </span>
          </h3>
        </div>
        <div className="md:flex justify-between items-center mt-3">
          <div></div>
          <div>
            <div
              onClick={() => getMyPDF()}
              className="flex items-center font-comfortaa w-fit py-2 px-4 rounded-md cursor-pointer"
            >
              <BsFiletypePdf className="text-2xl text-slate-700" />
            </div>
          </div>
        </div>
        <div className="md:flex mt-2">
          <div className="md:w-full my-3">
            <table
              id="myTable"
              className="table-auto w-full border-collapse border border-slate-500"
            >
              <thead className="text-sm text-left">
                <tr>
                  <th colSpan={4} className="border border-slate-600 p-1">
                    Nombre <br />{" "}
                    <span className="font-bold">{param.nombre}</span>
                  </th>
                </tr>
                <tr>
                  <th colSpan={2} className="border border-slate-600 p-1">
                    Dirección <br />{" "}
                    <span className="font-bold">{param.direccion}</span>
                  </th>
                  <th colSpan={2} className="border border-slate-600 p-1">
                    Teléfono <br />{" "}
                    <span className="font-bold">{param.telefono}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="w-12">
                <tr>
                  <td colSpan={4} className="border border-slate-600 p-1">
                    Rentas Gravadas del Ejercicio o Período
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50">
                    Sueldos, Salarios, Gratificaiones y Comiciones
                  </td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    +
                  </td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    105
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${totalDic.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                    TOTAL RENTAS GRAVDAS
                  </td>
                  <td className="border border-slate-600 p-1 text-center">=</td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    145
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${totalDic.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="border border-slate-600 p-1">
                    Costos, Gastos y Deducciones del Ejercicio o Período
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                    TOTAL COSTOS, GASTOS Y DEDUCCIONES(Casilla 725 + Casilla 628
                    + Casilla 215)
                  </td>
                  <td className="border border-slate-600 p-1 text-center">-</td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    225
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${totalDedu}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                    TOTAL RENTA IMPONIBLE(Sumar Casillas 240 + 245 + 250)
                  </td>
                  <td className="border border-slate-600 p-1 text-center">=</td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    255
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${totalGrav.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="border border-slate-600 p-1 bg-yellow-50 font-bold"
                  >
                    Impuesto Computado de la Renta Ordinaria
                  </td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    300
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${rentaAnual.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                    TOTAL IMPUESTO (Casillas 648 + 305 + 306 + 307 + 308 +
                    309+304)
                  </td>
                  <td className="border border-slate-600 p-1 text-center">=</td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    310
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${rentaAnual.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                    Impuesto Retenido Acreditable
                  </td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    -
                  </td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    315
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${rentaDic.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                    IMPUESTO DETERMINADO (Casilla 310 – (Casilla
                    312+314+315+320+325+328+329) +327)
                  </td>
                  <td className="border border-slate-600 p-1 text-center">=</td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    330
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${(rentaAnual - rentaDic).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                    LIQUIDACIÓN ANUAL DEL IMPUESTO (Casilla 330 + 335)
                  </td>
                  <td className="border border-slate-600 p-1 text-center">=</td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    340
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${(rentaAnual - rentaDic).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={2}
                    className="border border-slate-600 p-1 bg-yellow-50 font-bold"
                  >
                    Total a Pagar Renta
                  </td>
                  <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                    350
                  </td>
                  <td className="border border-slate-600 p-1 text-right">
                    ${(rentaAnual - rentaDic).toFixed(2)}
                  </td>
                </tr>

                {/* <tr className="bg-gray-500 text-white">
                  <td className="border border-slate-600 p-3">Total</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${totalDic.toFixed(2)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${rentaDic.toFixed(2)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    $
                    {(
                      parseFloat(getAFP(param.salario) * 11) +
                      parseFloat(getAFP(salVaca))
                    ).toFixed(2)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${(getISSS(param.salario) * 12).toFixed(2)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right text-white bg-gray-500">
                    $
                    {(
                      parseFloat(param.salario * 11) +
                      parseFloat(salVaca) +
                      parseFloat(
                        getAguinaldo(param.salario, param.fechaIngreso)
                      )
                    ).toFixed(2)}
                  </td>
                </tr> */}
              </tbody>
            </table>

            <h2 className="mt-10 pl-3">Deducciones Personales</h2>
            <table className="table-auto w-full border-collapse border border-slate-500">
              <tr>
                <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                  Médicos (Conforme a Documentación)
                </td>
                <td className="border border-slate-600 p-1 text-center">+</td>
                <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                  711
                </td>
                <td className="border border-slate-600 p-1 text-right">
                  $
                  <input
                    className="w-24 p-1 bg-orange-50 text-right"
                    type="number"
                    min={0}
                    max={800}
                    value={cDedu}
                    onChange={setColeg}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                  Colegiaturas (Conforme a Documentación)
                </td>
                <td className="border border-slate-600 p-1 text-center">+</td>
                <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                  712
                </td>
                <td className="border border-slate-600 p-1 text-right">
                  $
                  <input
                    className="w-24 p-1 bg-orange-50 text-right"
                    type="number"
                    min={0}
                    max={800}
                    value={mDedu}
                    onChange={setMedi}
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-slate-600 p-1 bg-yellow-50 font-bold">
                  TOTAL (Sumatoria de casillas 711 a 722)
                </td>
                <td className="border border-slate-600 p-1 text-center">=</td>
                <td className="border border-slate-600 p-1 text-center bg-yellow-50">
                  725
                </td>
                <td className="border border-slate-600 p-1 text-right">
                  ${totalDedu}
                </td>
              </tr>
            </table>
            <span className="flex text-sm pt-4 ml-5">
              *Datos del año corriente
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

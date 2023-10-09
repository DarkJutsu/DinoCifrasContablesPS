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

export const ConstanciaSueldo = () => {
  const param = useLocation().state.state;

  let rentaEneJun = 0.0;
  let rentaJunDife = 0.0;
  let rentaEneMay = 0.0;

  let totalDic = 0.0;
  let rentaDic = 0.0;

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
      margin: 30,
      useCss: true,
    });

    myPDF.save(
      `${param.nombre} - Constancia de Sueldo - dinocifras contables S.A de C.V.pdf`
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
        <h2 className="text-xl mb-3">Constacia de Sueldo</h2>
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
            <div className="flex justify-center items-center">
              <table
                id="myTable"
                className="table-fixed mb-10 w-3/5 border-collapse border border-slate-500 bg-gray-200"
              >
                <tbody>
                  <tr>
                    <th colSpan={2} className="text-center pt-10">
                      <h3 className="font-bold text-2xl">
                        dinocifras contables S.A. de C.V. <br />
                        Constancia de Sueldo
                      </h3>
                    </th>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="px-10 pb-10 pt-5 text-xl text-justify"
                    >
                      El infrascrito agente de retención hace constar que{" "}
                      <span className="uppercase font-bold">
                        {param.nombre}
                      </span>{" "}
                      con NIT. {Math.floor(Math.random() * 9000) + 1000}-
                      {Math.floor(Math.random() * 900000) + 100000}-
                      {Math.floor(Math.random() * 900) + 100}-
                      {Math.floor(Math.random() * 9) + 1} en su calidad de
                      empleado/a de esta empresa, devengó durante el perído
                      comprendido entre el 01/01/2023 al 31/12/2023, lo
                      siguiente
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-10 pb-5 font-bold">
                      Detalle
                    </td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-3">Ingresos devengados</td>
                    <td className="px-10 pb-3">
                      $
                      {(
                        parseFloat(param.salario * 11) +
                        parseFloat(salVaca) +
                        parseFloat(
                          getAguinaldo(param.salario, param.fechaIngreso)
                        )
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-3">Aguinaldo gravado</td>
                    <td className="px-10 pb-3">$ - </td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-3 font-bold">
                      (-)Ingresos no gravados
                    </td>
                    <td className="px-10 pb-3"></td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-3">Cotización AFP</td>
                    <td className="px-10 pb-3">
                      $
                      {(
                        parseFloat(getAFP(param.salario) * 11) +
                        parseFloat(getAFP(salVaca))
                      ).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-3">Cotización ISSS</td>
                    <td className="px-10 pb-3">
                      ${(getISSS(param.salario) * 12).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-3">Aguinaldo no gravado</td>
                    <td className="px-10 pb-3">
                      ${getAguinaldo(param.salario, param.fechaIngreso)}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-10">Monto gravado</td>
                    <td className="px-10 pb-10">${totalDic.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="px-10 pb-10">Impuesto sobre la renta</td>
                    <td className="px-10 pb-10">${rentaDic.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="px-10 pb-10 text-xl text-justify"
                    >
                      Se extiende la presente en la ciudad de Santa Ana el{" "}
                      {getFchFormat(Date())}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      className="px-10 text-center underline underline-offset-8"
                    >
                      Jenniffer Roque
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="px-10 pb-10 text-center">
                      Centro de Servicios de Recursos Humanos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <table className="table-fixed w-full border-collapse border border-slate-500">
              <thead className="bg-slate-400 font-bold text-sm">
                <tr>
                  <th className="border border-slate-600 p-3 ">MES</th>
                  <th className="border border-slate-600 p-3 ">
                    REMUNERACIONES GRAVADAS DE ENERO A DICIEMBRE
                  </th>
                  <th className="border border-slate-600 p-3">
                    RETENCIÓN MENSUAL
                  </th>
                  <th className="border border-slate-600 p-3">AFP</th>
                  <th className="border border-slate-600 p-3">ISSS</th>
                  <th className="border-t border-slate-600">
                    INGRESOS DEVENGADOS
                  </th>
                </tr>
              </thead>
              <tbody className="p-2">
                <tr>
                  <td className="border border-slate-600 p-3">Enero</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Febrero</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Marzo</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Abril</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Mayo</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Junio</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right text-white bg-gray-500">
                    ${getAFP(salVaca)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right text-white bg-gray-500">
                    ${salVaca.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Julio</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Agosto</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Septiembre</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Octubre</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Noviembre</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${param.salario}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-3">Diciembre</td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${salarioF}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getRenta(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getAFP(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right">
                    ${getISSS(param.salario)}
                  </td>
                  <td className="border border-slate-600 p-3 text-right text-white bg-gray-500">
                    $
                    {parseFloat(param.salario) +
                      parseFloat(
                        getAguinaldo(param.salario, param.fechaIngreso)
                      )}
                  </td>
                </tr>
                <tr className="bg-gray-500 text-white">
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
                </tr>
              </tbody>
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

import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { getAFP } from "../utils/getAFP.function";
import { getISSS } from "../utils/getISSS.function";
import { getRenta } from "../utils/getRenta.function";
import { getNMonths } from "../utils/getNMonths.function";
import { BsFiletypePdf } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MdArrowBack } from "react-icons/md";

export function PlanillaPagos() {
  const param = useLocation().state.state;

  const [nMeses, setNMeses] = useState(1);
  const [dataSal, setDataSal] = useState([]);

  const handleSelectMeses = (event) => {
    setNMeses(event.target.value);
  };

  const nM = getNMonths(param.fechaIngreso);

  const NewRow = ({ n, emp, suel, comi, afp, isss, renta }) => {
    return (
      <>
        <td className="border border-slate-700">{n}</td>
        <td className="border border-slate-700">{emp}</td>
        <td className="border border-slate-700">${suel}</td>
        <td className="border border-slate-700">${comi}</td>
        <td className="border border-slate-700">
          ${(parseFloat(suel) + parseFloat(comi)).toFixed(2)}
        </td>
        <td className="border border-slate-700">${afp}</td>
        <td className="border border-slate-700">${isss}</td>
        <td className="border border-slate-700">${renta}</td>
        <td className="border border-slate-700">
          ${(parseFloat(afp) + parseFloat(isss) + parseFloat(renta)).toFixed(2)}
        </td>
        <td className="border border-slate-700">
          $
          {(
            parseFloat(suel) +
            parseFloat(comi) -
            (parseFloat(afp) + parseFloat(isss) + parseFloat(renta))
          ).toFixed(2)}
        </td>
      </>
    );
  };

  const getComiCal = (salario) => {
    let cms = 0.0;
    switch (param.cargo) {
      case "Planta":
        cms = salario * 0.1;
        break;
      case "Ventas":
        cms = salario * 0.15;
        break;
      case "Marketing":
        cms = salario * 0.17;
        break;
      case "Administracion":
        cms = salario * 0.3;
        break;
      default:
        break;
    }

    return cms;
  };

  useEffect(() => {
    const newData = [];

    let varComi = 0;
    let comiCalc = 0.0;
    let i = 1;
    while (i <= 12) {
      varComi++;

      switch (param.cargo) {
        case "Planta":
          varComi == 4
            ? ((comiCalc = getComiCal(param.salario)), (varComi = 0))
            : (comiCalc = 0.0);
          break;
        case "Ventas":
          varComi == 3
            ? ((comiCalc = getComiCal(param.salario)), (varComi = 0))
            : (comiCalc = 0.0);
          break;
        case "Marketing":
          varComi == 3
            ? ((comiCalc = getComiCal(param.salario)), (varComi = 0))
            : (comiCalc = 0.0);
          break;
        case "Administracion":
          if (varComi === 6) {
            comiCalc = getComiCal(param.salario);
            varComi = 0;
          } else {
            comiCalc = 0.0;
          }
          break;
        default:
          break;
      }

      newData.push(
        <NewRow
          n={i}
          emp={param.nombre}
          suel={param.salario}
          comi={comiCalc.toFixed(2)}
          afp={getAFP(param.salario + comiCalc)}
          isss={getISSS(param.salario + comiCalc)}
          renta={getRenta(param.salario + comiCalc)}
        />
      );

      i++;
    }
    setDataSal(newData);
  }, [nMeses]);

  const getMyPDF = () => {
    const myPDF = new jsPDF({
      putOnlyUsedFonts: true,
      orientation: "landscape",
    });
    myPDF.addImage(logo, "PNG", 10, 10, 20, 20);
    myPDF.setFontSize(22);
    myPDF.text("dinocifras", 30, 20);
    myPDF.text("contables", 30, 27);

    myPDF.setFontSize(12);
    myPDF.setFont("helvetica", "bold");
    myPDF.text(
      "dinocifras contables S.A de C.V Planilla de Pagos",
      155,
      40,
      null,
      null,
      "center"
    );
    autoTable(myPDF, {
      html: "#myTable",
      startY: 43,
      headStyles: { halign: "center", fillColor: [100, 116, 139] },
      theme: "grid",
      columnStyles: {
        9: { cellWidth: 25, halign: "right" },
        8: { cellWidth: 25, halign: "right" },
        7: { halign: "right" },
        6: { halign: "right" },
        5: { halign: "right" },
        4: { halign: "right" },
        3: { halign: "right" },
        2: { halign: "right" },
      },
    });

    myPDF.save(
      `${param.nombre} - Planilla Pagos - dinocifras contables S.A de C.V.pdf`
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
        <h2 className="text-xl mb-3">Planilla de Pagos</h2>
        <div className="ml-2">
          <h3 className="text-4xl font-bold mb-2">
            {param.nombre}{" "}
            <span className="text-lg font-light bg-slate-500 py-1 px-2 rounded-xl text-orange-50">
              {param.cargo}
            </span>
          </h3>
        </div>
        <div className="md:flex justify-between items-center mt-3">
          {/* <select
            className="appearance-none block bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 text-orange-50"
            id="selectMeses"
            // value={nMeses}
            onChange={handleSelectMeses}
          >
            <option value="1">Selecciona N° Meses</option>
            <option value={nM > 3 ? "3" : nM}>Ultimos 3 meses</option>
            <option value={nM > 6 ? "6" : nM}>Ultimos 6 meses</option>
            <option value={nM > 9 ? "9" : nM}>Ultimos 9 meses</option>
          </select> */}
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
            <h3 className="text-center font-bold text-xl">
              dinocifras contables S.A de C.V Planilla de Pagos
            </h3>
            <table
              id="myTable"
              className="table-fixed w-full border-collapse border border-slate-500"
            >
              <thead className="bg-slate-400 font-bold">
                <tr>
                  <th rowSpan={2} className="border border-slate-600 p-3 w-12">
                    N°
                  </th>
                  <th rowSpan={2} className="border border-slate-600 p-3 w-52">
                    Empleado
                  </th>
                  <th rowSpan={2} className="border border-slate-600 p-3">
                    Sueldo
                  </th>
                  <th rowSpan={2} className="border border-slate-600 p-3">
                    Comisión
                  </th>
                  <th rowSpan={2} className="border border-slate-600 p-3">
                    Ingresos
                  </th>
                  <th colSpan={3} className="border-t border-slate-600">
                    Deducciones
                  </th>
                  <th rowSpan={2} className="border border-slate-600 p-3">
                    Total de Descuento
                  </th>
                  <th rowSpan={2} className="border border-slate-600 p-3">
                    Neto Neto Pagado
                  </th>
                </tr>
                <tr>
                  <th className="border-b border-slate-600 p-3">AFP</th>
                  <th className="border-b border-slate-600 p-3">ISSS</th>
                  <th className="border-b border-slate-600 p-3">RENTA</th>
                </tr>
              </thead>
              <tbody className="p-2">
                {dataSal.map((data, i) => (
                  <tr key={i}>{data}</tr>
                ))}
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
}

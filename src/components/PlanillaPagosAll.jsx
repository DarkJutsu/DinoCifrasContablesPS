import logo from "../assets/img/logo.png";
import { useLocation } from "react-router-dom";
import { getAFP } from "../utils/getAFP.function";
import { getISSS } from "../utils/getISSS.function";
import { getRenta } from "../utils/getRenta.function";
import { getFchFormat } from "../utils/getFchFormat.function";
import { BsFiletypePdf } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { BackBtn } from "./BackBtn";

export function PlanillaPagosAll() {
  const param = useLocation().state.state;

  let tsuel = 0.0;
  let tcomi = 0.0;
  let tafp = 0.0;
  let tisss = 0.0;
  let trenta = 0.0;

  param.map((p) => {
    tsuel = tsuel + p.salario;
    tcomi = tcomi + 0.0;
    tafp = tafp + parseFloat(getAFP(p.salario));
    tisss = tisss + parseFloat(getISSS(p.salario));
    trenta = trenta + parseFloat(getRenta(p.salario));
  });

  const NewRow = ({ n, emp, ingre, suel, comi, afp, isss, renta }) => {
    return (
      <>
        <td className="border border-slate-700">{n}</td>
        <td className="border border-slate-700">{emp}</td>
        <td className="border border-slate-700 text-center">
          {getFchFormat(ingre)}
        </td>
        <td className="border border-slate-700 text-right">
          ${suel.toFixed(2)}
        </td>
        <td className="border border-slate-700 text-right">
          ${comi.toFixed(2)}
        </td>
        <td className="border border-slate-700 text-right">
          ${(parseFloat(suel) + parseFloat(comi)).toFixed(2)}
        </td>
        <td className="border border-slate-700 text-right">${afp}</td>
        <td className="border border-slate-700 text-right">${isss}</td>
        <td className="border border-slate-700 text-right">${renta}</td>
        <td className="border border-slate-700 text-right">
          ${(parseFloat(afp) + parseFloat(isss) + parseFloat(renta)).toFixed(2)}
        </td>
        <td className="border border-slate-700 text-right">
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
      footStyles: {
        fillColor: [51, 65, 85],
        halign: "right",
      },
      columnStyles: {
        10: { cellWidth: 25, halign: "right" },
        9: { cellWidth: 25, halign: "right" },
        8: { cellWidth: 25, halign: "right" },
        7: { halign: "right" },
        6: { halign: "right" },
        5: { halign: "right" },
        4: { halign: "right" },
        3: { halign: "right" },
        2: { halign: "center" },
      },
    });

    myPDF.save("Planilla Pagos - dinocifras contables S.A de C.V.pdf");
  };

  return (
    <>
      <BackBtn />
      <div className="bg-orange-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 font-comfortaa mt-10">
        <h2 className="text-4xl font-bold mb-3">Planillas de Pagos</h2>
        <div className="md:flex justify-between items-center">
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
          <div className="md:w-full">
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
                  <th rowSpan={2} className="border border-slate-600 p-3 w-28">
                    Fecha Ingreso
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
                {param.map((param, i) => (
                  <tr key={i}>
                    {
                      <NewRow
                        n={i + 1}
                        emp={param.nombre}
                        suel={param.salario}
                        ingre={param.fechaIngreso}
                        comi={0.0}
                        afp={getAFP(param.salario)}
                        isss={getISSS(param.salario)}
                        renta={getRenta(param.salario)}
                      />
                    }
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-600 text-orange-50 text-right">
                  <td colSpan={3} className="border-r border-orange-50 p-3">
                    Totales
                  </td>
                  <td className="border-r border-orange-50 p-3">
                    ${tsuel.toFixed(2)}
                  </td>
                  <td className="border-r border-orange-50 p-3">
                    ${tcomi.toFixed(2)}
                  </td>
                  <td className="border-r border-orange-50 p-3">
                    ${(tsuel + tcomi).toFixed(2)}
                  </td>
                  <td className="border-r border-orange-50 p-3">
                    ${tafp.toFixed(2)}
                  </td>
                  <td className="border-r border-orange-50 p-3">
                    ${tisss.toFixed(2)}
                  </td>
                  <td className="border-r border-orange-50 p-3">
                    ${trenta.toFixed(2)}
                  </td>
                  <td className="border-r border-orange-50 p-3">
                    ${(tafp + tisss + trenta).toFixed(2)}
                  </td>
                  <td className="border border-slate-600 p-3">
                    ${(tsuel + tcomi - (tafp + tisss + trenta)).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

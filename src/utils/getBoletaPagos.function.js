import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/img/logo.png";
import { getAFP } from "./getAFP.function";
import { getISSS } from "./getISSS.function";
import { getRenta } from "./getRenta.function";
import { getFchFormat } from "./getFchFormat.function";

export const getBoletaPagos = (emp) => {
  const myPDF = new jsPDF({
    putOnlyUsedFonts: true,
  });
  myPDF.addImage(logo, "PNG", 10, 10, 20, 20);
  myPDF.setFontSize(22);
  myPDF.text("dinocifras", 30, 20);
  myPDF.text("contables", 30, 27);

  myPDF.setFontSize(14);
  myPDF.setFont("helvetica", "bold");
  myPDF.text(
    "dinocifras contables S.A. de C.V.",
    105,
    40,
    null,
    null,
    "center"
  );
  myPDF.text("Boleta de Pago", 105, 46, null, null, "center");

  myPDF.setFont("helvetica", "bold");
  myPDF.setFontSize(14);
  myPDF.text(emp.nombre, 30, 55);
  myPDF.setFontSize(12);
  myPDF.setFont("helvetica", "normal");
  myPDF.text("Cargo: " + emp.cargo + "           DUI: " + emp.dui, 30, 62);
  myPDF.text("Telefono: " + emp.telefono, 30, 69);

  myPDF.setFont("helvetica", "bold");
  myPDF.text("INGRESOS ", 30, 78);
  myPDF.setLineWidth(0.3);
  myPDF.line(25, 80, 185, 80);
  autoTable(myPDF, {
    startY: 80,
    theme: "plain",
    margin: 30,
    head: [["Codigo", "Concepto", "Valor"]],
    body: [["1", "Salario", "$" + emp.salario.toFixed(2)]],
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 92 },
    },
  });
  myPDF.text("RETENCIONES ", 30, 105);
  myPDF.setLineWidth(0.3);
  myPDF.line(25, 107, 185, 107);
  autoTable(myPDF, {
    startY: 108,
    theme: "plain",
    margin: 30,
    head: [["", "AFP", "ISSS", "Renta", "Total"]],
    body: [
      [
        "",
        "$" + getAFP(emp.salario),
        "$" + getISSS(emp.salario),
        "$" + getRenta(emp.salario),
        "$" +
          (parseFloat(getAFP(emp.salario)) +
            parseFloat(getISSS(emp.salario)) +
            parseFloat(getRenta(emp.salario))),
      ],
    ],
    columnStyles: {
      0: { cellWidth: 25 },
    },
  });
  myPDF.setLineWidth(0.3);
  myPDF.line(25, 129, 185, 129);
  autoTable(myPDF, {
    startY: 130,
    theme: "plain",
    margin: 30,
    // head: [["", "AFP", "ISSS", "Renta", "Total"]],
    body: [
      [
        "TOTAL SUELDO LIQUIDO A PAGAR",
        "$" +
          (emp.salario -
            (parseFloat(getAFP(emp.salario)) +
              parseFloat(getISSS(emp.salario)) +
              parseFloat(getRenta(emp.salario)))),
      ],
    ],
    columnStyles: {
      0: { cellWidth: 117, fontStyle: "bold" },
      1: { fontStyle: "bold" },
    },
  });
  myPDF.setFontSize(8);
  myPDF.setFont("helvetica", "normal");
  myPDF.text("Fecha de emisión: " + getFchFormat(Date()), 30, 145);

  myPDF.save(
    `${emp.nombre} - Boleta de Pago - dinocifras contables S.A. de C.V.pdf`
  );
};

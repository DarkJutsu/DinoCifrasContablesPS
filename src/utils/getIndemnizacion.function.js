import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/img/logo.png";
import { getFchFormat } from "./getFchFormat.function";
import { getDespido } from "./getDespido.function";
import { getAguinaldoEqui } from "./getAguinaldoEqui.function";

export const getIndemnizacion = (emp) => {
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
  myPDF.text("Boleta de Indemnización", 105, 46, null, null, "center");

  myPDF.setFont("helvetica", "bold");
  myPDF.setFontSize(14);
  myPDF.text(emp.nombre, 30, 55);
  myPDF.setFontSize(12);
  myPDF.setFont("helvetica", "normal");
  myPDF.text("Cargo: " + emp.cargo + "           DUI: " + emp.dui, 30, 62);
  myPDF.text("Telefono: " + emp.telefono, 30, 69);
  myPDF.text("Dirección: " + emp.direccion, 30, 75);

  myPDF.setFont("helvetica", "bold");
  myPDF.text("DETALLES ", 30, 85);
  myPDF.setLineWidth(0.3);
  myPDF.line(25, 87, 185, 87);

  myPDF.setFontSize(11);
  myPDF.setFont("helvetica", "normal");
  myPDF.text("Asunto: Despido", 30, 95);
  myPDF.text("Estimado/a " + emp.nombre + ",", 30, 105);
  myPDF.text(
    "Nos dirigimos a ti con el fin de comunicarte que, a partir del " +
      getFchFormat(Date()) +
      ",\ntu contrato de trabajo con dinocifras contables S.A. de C.V. ha finalizado.",
    30,
    115
  );
  myPDF.text(
    "Sabemos que este es un momento difícil para ti, y queremos que sepas que lamentamos mucho\ntener que tomar esta decisión. Durante tu tiempo con nosotros, siempre has cumplido con los\nvalores de la empresa, y has sido un miembro valioso del equipo.\n\nQueremos agradecerte tu dedicación y compromiso con nuestra empresa.\nTe deseamos mucho éxito en tus futuros proyectos.",
    30,
    130
  );
  myPDF.setFontSize(12);
  myPDF.setFont("helvetica", "bold");
  myPDF.text("Indemnización", 30, 180);

  myPDF.setFontSize(12);
  myPDF.setFont("helvetica", "normal");
  myPDF.text(
    "Indemnización Legal: $" +
      getDespido(emp.salario, emp.fechaIngreso) +
      "\nAguinaldo Proporcional: $" +
      getAguinaldoEqui(emp.salario, emp.fechaIngreso) + 
      "\n\nTotal Indemnización: $" + (parseFloat(getDespido(emp.salario, emp.fechaIngreso))+parseFloat(getAguinaldoEqui(emp.salario, emp.fechaIngreso))).toFixed(2),
    30,
    188
  );

  myPDF.text(
    "Atentamente,\nJeniffer Roque\nRecursos Humanos\nF.______________",
    30,
    240
  );

  myPDF.setFontSize(8);
  myPDF.setFont("helvetica", "normal");
  myPDF.text("Fecha de emisión: " + getFchFormat(Date()), 30, 290);

  myPDF.save(
    `${emp.nombre} - Boleta de Indemnización - dinocifras contables S.A de C.V.pdf`
  );
};

export class EmpleClass {
  nombre = "";
  direccion="";
  telefono="";
  dui="";
  cargo = "";
  salario = 0.0;
  bonos={};
  fechaIngreso = "";
  fechaSalida = "";

  constructor(nombre, direccion, telefono, dui, cargo, salario, fechaIngreso) {
    this.nombre = nombre;
    this.direccion=direccion;
    this.telefono=telefono;
    this.dui=dui;
    this.cargo = cargo;
    this.salario = salario;
    this.fechaIngreso = fechaIngreso;
  }
}

import { Link, useLocation, useNavigate } from "react-router-dom";
import { getYearMonth } from "../utils/getYearMonth.function";
import { getISSS } from "../utils/getISSS.function";
import { getAFP } from "../utils/getAFP.function";
import { getRenta } from "../utils/getRenta.function";
import { getSalaryLiq } from "../utils/getSalaryLiq.function";
import { getFchFormat } from "../utils/getFchFormat.function";
import { getVacaciones } from "../utils/getVacaciones.function";
import { getVacacionesEqui } from "../utils/getVacacionesEqui.function";
import { getAguinaldo } from "../utils/getAguinaldo.function";
import { BackBtn } from "./BackBtn";
import { getAguinaldoEqui } from "../utils/getAguinaldoEqui.function";
import { getDays } from "../utils/getDays.function";
import { getDespido } from "../utils/getDespido.function";
import { getRenuncia } from "../utils/getRenuncia.function";

export function EmpleDetail() {
  const nav = useNavigate();
  const param = useLocation().state.state;

  const { yearsElapsed, monthElapsed } = getYearMonth(param.fechaIngreso);

  return (
    <>
      <BackBtn />
      <div className="bg-orange-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 font-comfortaa mt-2">
        <h2 className="text-xl mb-3">Datos del Empleado</h2>
        <div className="ml-2">
          <h3 className="text-4xl font-bold mb-2">
            {param.nombre}{" "}
            <span className="text-lg font-light bg-slate-500 py-1 px-2 rounded-xl text-orange-50">
              {param.cargo}
            </span>
          </h3>
          <p className="text-lg mb-2">
            DUI: <span className="font-bold">{param.dui}</span>, Teléfono:{" "}
            <span className="font-bold">+503 {param.telefono}</span>
          </p>
          <p className="text-lg">
            Dirección: <span className="font-bold">{param.direccion}</span>
          </p>
        </div>
        <div className="-mx-3 md:flex mb-5">
          <div className="md:w-1/2 ml-5 mt-3">
            <p>
              <span className="underline">Fecha de Ingreso a la Empresa</span>{" "}
              <br />
              <span className="ml-1 font-bold">
                {getFchFormat(param.fechaIngreso)}
              </span>
            </p>
          </div>
          <div className="md:w-1/2 ml-3 mt-3">
            <p>
              <span className="underline">Tiempo en la Empresa</span> <br />
              <span className="ml-1 font-bold">
                {yearsElapsed}{" "}
                {yearsElapsed > 0
                  ? yearsElapsed > 1
                    ? "años"
                    : "año"
                  : "años"}{" "}
                y {monthElapsed} {monthElapsed > 1 ? "meses" : "mes"}
              </span>
            </p>
          </div>
        </div>
        <div className="-mx-3 md:flex">
          <div className="md:w-1/2 ml-5 mt-3">
            <p className="text-2xl">
              Salario<span className="text-base">(mensual)</span> <br /> $
              {param.salario}
            </p>
          </div>
          <div className="md:w-1/2 ml-5 mt-3">
            <p className="text-2xl">
              Pago ISSS<span className="text-base">(mensual)</span> <br /> $
              {getISSS(param.salario)}
            </p>
          </div>
          <div className="md:w-1/2 ml-5 mt-3">
            <p className="text-2xl">
              Pago AFP<span className="text-base">(mensual)</span> <br /> $
              {getAFP(param.salario)}
            </p>
          </div>
          <div className="md:w-1/2 ml-5 mt-3">
            <p className="text-2xl">
              Pago Renta<span className="text-base">(mensual)</span> <br /> $
              {getRenta(param.salario)}
            </p>
          </div>
        </div>
        <div className="-mx-3 md:flex mt-5">
          <div className="md:w-1/2 ml-5 mt-3">
            <p className="text-2xl">
              Salario liquido<span className="text-base">(mensual)</span> <br />{" "}
              <span className="">${getSalaryLiq(param.salario)}</span>
            </p>
          </div>
        </div>
        <div className="mt-5 bg-amber-50 p-7 rounded-md shadow-md">
          <div className="-mx-3 md:flex">
            <div className="md:w-2/5 ml-5">
              <p className="text-2xl">
                Vacaciones<span className="text-base">(año)</span> <br />{" "}
                <span className={yearsElapsed === 0 ? "text-xl pl-5" : "pl-5"}>
                  {yearsElapsed === 0 ? (
                    <span>
                      No aplica{" "}
                      <span className="text-sm">
                        *(${getVacaciones(param.salario)})
                      </span>
                    </span>
                  ) : (
                    "$" + getVacaciones(param.salario)
                  )}
                </span>
              </p>
            </div>
            <div className="md:w-1/2 ml-5">
              <p className="text-2xl">
                *Vacaciones<span className="text-base">(equivalentes)</span>{" "}
                <br />{" "}
                <span className={yearsElapsed === 0 ? "text-xl pl-5" : "pl-5"}>
                  ${getVacacionesEqui(param.salario, param.fechaIngreso)}
                </span>
              </p>
            </div>
            <div className="md:w-1/2 ml-5">
              <p className="text-2xl">
                Aguinaldo<span className="text-base">(año)</span> <br />{" "}
                <span className={yearsElapsed === 0 ? "text-xl pl-5" : "pl-5"}>
                  {yearsElapsed === 0 ? (
                    <span>
                      No aplica{" "}
                      <span className="text-sm">
                        *(${getAguinaldo(param.salario, param.fechaIngreso)})
                      </span>
                    </span>
                  ) : (
                    "$" + getAguinaldo(param.salario, param.fechaIngreso)
                  )}
                </span>
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-2xl">
                *Aguinaldo<span className="text-base">(equivalente)</span>
                <br />{" "}
                <span className={yearsElapsed === 0 ? "text-xl pl-5" : "pl-5"}>
                  ${getAguinaldoEqui(param.salario, param.fechaIngreso)}
                </span>
              </p>
            </div>
          </div>
          <span className="flex text-sm pt-4">
            *Las vacaciones y aguinaldo se calcular tomando la fecha de ingreso
            del trabajador a la fecha actual
          </span>
        </div>

        <div className="grid mt-5 bg-amber-50 p-7 rounded-md shadow-md">
          <span className="flex text-lg">*Indemnizaciones</span>
          <div className="-mx-3 md:flex">
            <div className="md:w-2/5 ml-5 mt-3">
              <p className="text-2xl">
                Despido <br />{" "}
                <span className={yearsElapsed === 0 ? "text-xl pl-5" : "pl-5"}>
                  ${getDespido(param.salario, param.fechaIngreso)}
                </span>
              </p>
            </div>
            <div className="md:w-2/5 ml-5 mt-3">
              <p className="text-2xl">
                Renuncia <br />{" "}
                <span className={yearsElapsed === 0 ? "text-xl pl-5" : "pl-5"}>
                  ${getRenuncia(param.salario, param.fechaIngreso)}
                </span>
              </p>
            </div>
          </div>
          <span className="flex text-sm pt-3">
            *Las posibles indemnizaciones se calcular tomando la fecha de
            ingreso del trabajador a la fecha actual
          </span>
        </div>

        <div className="-mx-3 md:flex mt-8">
          <div className="md:w-fit ml-5 mt-3">
            <Link to="/DinoCifrasPS/planilla" state={{ state: param }}>
              <div className="flex items-center font-comfortaa bg-slate-300 w-fit py-2 px-4 rounded-md cursor-pointer shadow-md">
                <span className="text-1xl text-slate-800 font-bold">
                  Planilla de Pagos
                </span>
              </div>
            </Link>
          </div>
          <div className="md:w-fit ml-5 mt-3">
            <Link to="/DinoCifrasPS/planilla" state={{ state: param }}>
              <div className="flex items-center font-comfortaa bg-slate-300 w-fit py-2 px-4 rounded-md cursor-pointer shadow-md">
                <span className="text-1xl text-slate-800 font-bold">
                  Boleta de Pago
                </span>
              </div>
            </Link>
          </div>
          <div className="md:w-fit ml-5 mt-3">
            <Link to="/DinoCifrasPS/planilla" state={{ state: param }}>
              <div className="flex items-center font-comfortaa bg-slate-300 w-fit py-2 px-4 rounded-md cursor-pointer shadow-md">
                <span className="text-1xl text-slate-800 font-bold">
                  Boleta de Indemnización
                </span>
              </div>
            </Link>
          </div>
          <div className="md:w-fit ml-5 mt-3">
            <Link to="/DinoCifrasPS/planilla" state={{ state: param }}>
              <div className="flex items-center font-comfortaa bg-slate-300 w-fit py-2 px-4 rounded-md cursor-pointer shadow-md">
                <span className="text-1xl text-slate-800 font-bold">
                  Constacia de Sueldo
                </span>
              </div>
            </Link>
          </div>
          <div className="md:w-fit ml-5 mt-3">
            <Link to="/DinoCifrasPS/planilla" state={{ state: param }}>
              <div className="flex items-center font-comfortaa bg-slate-300 w-fit py-2 px-4 rounded-md cursor-pointer shadow-md">
                <span className="text-1xl text-slate-800 font-bold">
                  Declaracion de Renta
                </span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}

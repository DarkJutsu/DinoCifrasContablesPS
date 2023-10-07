import { MdDeleteForever } from "react-icons/md";
import { PiUserFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { getYearMonth } from "../utils/getYearMonth.function";

export function Emple({ emp, remove }) {
  const nav = useNavigate();

  const { yearsElapsed, monthElapsed } = getYearMonth(emp.fechaIngreso);

  return (
    <>
      <div className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-5 flex flex-col my-2 font-comfortaa">
        <Link to="/DinoCifrasPS/detail" state={{ state: emp }}>
          <div className="flex justify-center pb-4">
            <PiUserFill className="text-8xl bg-slate-600 rounded-full p-2" />
          </div>
          <h1 className="text-slate-200 text-xl">{emp.nombre}</h1>
          <p className="text-slate-400 overflow-auto mb-2">{emp.cargo}</p>
          <p className="text-slate-400 overflow-auto">{emp.direccion}</p>
          <p className="text-slate-400 overflow-auto">
            {"+503 " + emp.telefono}
          </p>
          <div className="-mx-3 md:flex mb-2">
            <span className="text-slate-200 overflow-auto mt-3 md:w-full px-3">
              <span className="underline text-slate-500">
                Tiempo en la Empresa
              </span>
              <br />
              <span className="pl-2">
                {yearsElapsed > 0
                  ? yearsElapsed > 1
                    ? yearsElapsed + " años"
                    : yearsElapsed + " año"
                  : monthElapsed > 1
                  ? monthElapsed + " meses"
                  : monthElapsed + " mes"}
              </span>
            </span>
          </div>
        </Link>

        <div className="pl-2 mt-5">
          <MdDeleteForever
            onClick={() => remove(emp)}
            className="text-red-400 text-3xl cursor-pointer"
          />
        </div>
      </div>
    </>
  );
}

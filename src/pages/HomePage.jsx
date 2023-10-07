import { MdAddCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddEmpleHome } from "./dashboard/AddEmpleHome";
import { EmpleList } from "../components/EmpleList";

export function HomePage() {
  const [empleList, setEmpleList] = useState(
    JSON.parse(localStorage.getItem("empleObject"))
  );
  const nav = useNavigate();

  const AddHome = () => {
    return (
      <>
        <div
          onClick={() => nav("/DinoCifrasContablesPS/add")}
          className="flex items-center font-comfortaa bg-emerald-400 w-fit py-2 px-4 rounded-md cursor-pointer"
        >
          <span className="text-2xl text-slate-800 font-bold">
            Nuevo Empleado
          </span>
          <MdAddCircle className="text-slate-800 text-3xl cursor-pointer ml-2" />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="mt-10">
        {empleList == null ? (
          <AddEmpleHome />
        ) : empleList.length === 0 ? (
          <AddEmpleHome />
        ) : (
          <div>
            <AddHome />
            <div className="-mx-3 md:flex mt-8">
              <div className="md:w-1/2 ml-5 mt-3">
                <Link
                  to="/DinoCifrasContablesPS/planillaAll"
                  state={{ state: empleList }}
                >
                  <div className="flex items-center font-comfortaa bg-slate-300 w-fit py-2 px-4 rounded-md cursor-pointer shadow-md">
                    <span className="text-1xl text-slate-800 font-bold">
                      Planilla de Pagos
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <EmpleList />
          </div>
        )}
      </div>
    </>
  );
}

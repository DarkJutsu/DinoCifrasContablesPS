import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

export const BackBtnState = (emp) => {
  console.log(emp);
  return (
    <>
      <div className="w-fit">
        <Link to="/DinoCifrasPS/detail" state={{ state: emp }}>
          <div className="flex items-center font-comfortaa text-slate-800 hover:text-orange-50 bg-transparent w-fit py-2 px-4 rounded-md cursor-pointer mb-5 mt-9 border border-slate-800 hover:bg-slate-600">
            <MdArrowBack className="text-2xl cursor-pointer mr-2" />
            <span className="text-md font-bold">Volver</span>
          </div>
        </Link>
      </div>
    </>
  );
};

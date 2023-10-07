import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";

export function Header() {
  const nav = useNavigate();
  return (
    <>
      <div
        className="w-fit flex bottom-0 cursor-pointer"
        onClick={() => {
          nav("/DinoCifrasContablesPS/");
        }}
      >
        <img className="w-24" src={logo} alt="Logo" />
        <span className="relative w-36">
          <h1 className="text-slate-900 text-3xl absolute inset-x-0 bottom-2 font-comfortaa font-bold">
            dinocifras contables
          </h1>
        </span>
      </div>
    </>
  );
}

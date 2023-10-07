import { useEffect, useState } from "react";
import { Spinner } from "../pages/dashboard/Spinner";
import { Emple } from "./Emple";

export function EmpleList() {
  const [emple, setEmple] = useState(
    JSON.parse(localStorage.getItem("empleObject"))
  );

  const [loading, setLoading] = useState(true);

  const EmpleL = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-8">
        {emple.map((emp, i) => {
          return <Emple key={i} emp={emp} remove={deleteAct} />;
        })}
      </div>
    );
  };

  function deleteAct(emp) {
    const i = emple.indexOf(emp);
    const tempEmp = [...emple];

    tempEmp.splice(i, 1);
    setEmple(tempEmp);
    localStorage.setItem("empleObject", JSON.stringify(tempEmp));
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  }, [emple]);

  return <>{loading ? <Spinner /> : <EmpleL />}</>;
}

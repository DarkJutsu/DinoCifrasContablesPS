import "./App.css";
import { EmpleDetail } from "./components/EmpleDetail";
import { PlanillaPagos } from "./components/PlanillaPagos";
import { PlanillaPagosAll } from "./components/PlanillaPagosAll";
import { MiComponente } from "./components/Prueba";
import { EmpleForm } from "./components/forms/EmpleForm";
import { NotFoundPage } from "./pages/404/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { Header } from "./pages/menu/Header";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/DinoCifrasPS/" element={<HomePage />} />
        <Route path="/DinoCifrasPS/add" element={<EmpleForm />} />
        <Route path="/DinoCifrasPS/detail" element={<EmpleDetail />} />
        <Route path="/DinoCifrasPS/planilla" element={<PlanillaPagos />} />
        <Route path="/DinoCifrasPS/planillaAll" element={<PlanillaPagosAll />} />
        <Route path="/DinoCifrasPS/prueba" element={<MiComponente />} />
        {/* <Route path="/DinoCifrasContables/uso" element={<DepreUso />} />
        <Route path="/DinoCifrasContables/acelerada" element={<DepreAcelDecre />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

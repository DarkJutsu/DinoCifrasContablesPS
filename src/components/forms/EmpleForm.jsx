import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { EmpleClass } from "../../model/emple.class";
import CurrencyInput from "react-currency-input-field";
import ReactInputMask from "react-input-mask";
import { BackBtn } from "../BackBtn";

const loginSchema = Yup.object().shape({
  nom: Yup.string()
    .min(10, "Tu nombre debe poseer mas de 20 caracteres")
    .required("Nombre requerido"),
  dir: Yup.string()
    .min(30, "Tu dirección debe poseer mas de 30 caracteres")
    .required("Dirección completa requerida"),
  tel: Yup.string()
    .required("El número de teléfono es requerido")
    .matches(/^\d{4}-\d{4}$/, "Formato de teléfono no válido"),
  dui: Yup.string()
    .required("El número de DUI es requerido")
    .matches(/^\d{8}-\d{1}$/, "Formato de DUI no válido"),
  carg: Yup.string()
    .oneOf(
      ["Planta", "Ventas", "Marketing", "Administracion"],
      "Seleccione un cargo valido"
    )
    .required("Cargo requerido"),
  sal: Yup.string()
    .test("min-amount", "El salario mínimo es de $380", (value) => {
      // Parsea el valor como número y verifica la cantidad mínima
      const numericValue = parseFloat(value.replace(/[^\d.]/g, ""), 10);
      return numericValue >= 380;
    })
    .required("Salario requerido"),
  fchIni: Yup.date()
    .max(new Date(), "La fecha no debe pasar el dia de hoy")
    .required("Fecha de Ingreso requerida"),
});

export function EmpleForm() {
  const nav = useNavigate();

  const arrayExistente = JSON.parse(
    localStorage.getItem("empleObject") || "[]"
  );

  const initialCredentials = {
    nom: "",
    dir: "",
    tel: "",
    dui: "",
    carg: "",
    sal: "",
    fchIni: "",
  };

  function setEmple(emple) {
    localStorage.setItem("empleObject", JSON.stringify(emple));
    return Promise.resolve(localStorage.getItem("empleObject"))
      .then((r) => console.log("Empleado: ", r))
      .then(nav("/DinoCifrasContablesPS"))
      .catch((er) => console.log("Error: ", er));
  }

  return (
    <>
      <BackBtn />
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 1000));
          const addEmple = new EmpleClass(
            values.nom,
            values.dir,
            values.tel,
            values.dui,
            values.carg,
            parseFloat(values.sal),
            values.fchIni
          );

          arrayExistente.push(addEmple);
          setEmple(arrayExistente);
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form autoComplete="off">
            <div className="bg-orange-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 font-comfortaa mt-10">
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="nom"
                  >
                    Nombre Empleado
                  </label>
                  <Field
                    id="nom"
                    name="nom"
                    type="text"
                    placeholder="Nombre del Empleado"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.nom && touched.nom && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="nom"
                    />
                  )}
                </div>
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="carg"
                  >
                    Cargo
                  </label>
                  <Field
                    id="carg"
                    name="carg"
                    component="select"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  >
                    <option>[-- Seleccione un Cargo --]</option>
                    <option value="Planta">Planta</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Administracion">Administración</option>
                  </Field>
                  {errors.carg && touched.carg && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="carg"
                    />
                  )}
                </div>
              </div>
              <div className="-mx-3 md:flex mb-6">
                <div className="md:w-2/3 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="dir"
                  >
                    Dirección
                  </label>
                  <Field
                    id="dir"
                    name="dir"
                    type="text"
                    placeholder="Dirección completa"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.dir && touched.dir && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="dir"
                    />
                  )}
                </div>
                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="tel"
                  >
                    Teléfono
                  </label>
                  <ReactInputMask
                    id="tel"
                    name="tel"
                    mask="9999-9999"
                    value={values.tel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Número telefonico"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.tel && touched.tel && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="tel"
                    />
                  )}
                </div>
              </div>
              <div className="-mx-3 md:flex mb-2">
                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="dui"
                  >
                    DUI
                  </label>
                  <ReactInputMask
                    id="dui"
                    name="dui"
                    mask="99999999-9"
                    value={values.dui}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Número DUI"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.dui && touched.dui && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="dui"
                    />
                  )}
                </div>
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="fchIni"
                  >
                    Fecha de Ingreso
                  </label>
                  <Field
                    id="fchIni"
                    name="fchIni"
                    type="date"
                    placeholder="Fecha de Ingreso"
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.fchIni && touched.fchIni && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="fchIni"
                    />
                  )}
                </div>
                <div className="md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
                    htmlFor="sal"
                  >
                    Salario (<span className="lowercase">mensual</span>)
                  </label>
                  <CurrencyInput
                    id="sal"
                    name="sal"
                    placeholder="Please enter a number"
                    defaultValue={0}
                    prefix="$"
                    decimalSeparator="."
                    groupSeparator=","
                    decimalsLimit={2}
                    onValueChange={(value) => setFieldValue("sal", value)}
                    className="appearance-none block w-full bg-slate-700 text-grey-darker border border-red rounded py-3 px-4 mb-3 text-orange-50"
                  />
                  {errors.sal && touched.sal && (
                    <ErrorMessage
                      className="text-red-400"
                      component="span"
                      name="sal"
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              className="bg-emerald-400 mt-3 p-2 rounded-md text-slate-800 uppercase font-bold font-comfortaa w-44 py-3 ml-10"
              type="submit"
            >
              Agregar
            </button>
            {/* {isSubmitting ? <span>Loooooogin your credentials...</span> : null} */}
          </Form>
        )}
      </Formik>
    </>
  );
}

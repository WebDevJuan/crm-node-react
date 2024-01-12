import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
// components
import FormClient from "../components/Form";
import Error from "../components/Error";
// api
import { addClient } from "../api/clientes";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");
  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("Todos los campos son obligatorios");
  }
  // eslint-disable-next-line no-control-regex
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])");

  if(!regex.test(email)){
    errors.push("El email es inválido");
  }
  // Devolver datos si hay errores
  if (Object.keys(errors).length) {
    return errors;
  }
  await addClient(data)
  return redirect('/');
}
export default function NewClient() {
  const navigate = useNavigate();
  const errors = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
      <p className="mt-3">Registra tu nuevo cliente</p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-sm"
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-6">
        {errors?.length > 0 && errors.map((err, i) => <Error key={i}>{err}</Error>)}
        {/* Componente form de react-router-dom */}
        <Form method="post" noValidate>
          <FormClient />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-sm cursor-pointer"
            value="Registrar cliente"
          />
        </Form>
      </div>
    </>
  );
}

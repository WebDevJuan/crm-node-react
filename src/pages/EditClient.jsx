import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  redirect
} from "react-router-dom";
import { editClient, getClient } from "../api/clientes";
// componets
import FormClient from "../components/Form";
import Error from "../components/Error";

// recoge los datos de la variable por url
export async function loader({ params }) {
  const client = await getClient(params.idClient);
  if (Object.values(client).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados",
    });
  }
  return client[0];
}
export async function action({ request, params }) {
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
    editClient(params.idClient, data)
    return redirect('/');
  }
function EditClient() {
  const navigate = useNavigate();
  const errors = useActionData();
  const client = useLoaderData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Modificar cliente</h1>
      <p className="mt-3">Editar los datos de {client.nombre}</p>
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
        {errors?.length > 0 &&
          errors.map((err, i) => <Error key={i}>{err}</Error>)}
        {/* Componente form de react-router-dom */}
        <Form method="post" noValidate>
          <FormClient client={client} />
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

export default EditClient;

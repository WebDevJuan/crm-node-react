export async function getClients() {
  const response = await fetch(import.meta.env.VITE_API_URL);
  const resutl = await response.json();
  return resutl;
}

export async function getClient(id) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}?id=${id}`);
  const resutl = await response.json();
  return resutl;
}

export async function deleteClient(id) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    await respuesta.json();
  } catch (error) {
    console.log("Ha ocurrido un error en la petición");
  }
}

export async function addClient(client) {
  try {
    await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      body: JSON.stringify(client),
      header: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Ha ocurrido un error en la petición");
  }
}
export async function editClient(id, client) {
    try {
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(client),
        headers: { "Content-Type": "application/json" },
      });
      await respuesta.json();
    } catch (error) {
      console.log("Ha ocurrido un error en la petición");
    }
  }
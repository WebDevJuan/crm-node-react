import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";

// components
import ErrorPage from "./components/ErrorPage";
import NewClient, { action as newClientAction } from "./pages/NewClient";
import EditClient, {loader as editClientLoader, action as editClientAction} from "./pages/EditClient";
import Home, { loader as clientsLoader } from "./pages/Home";
import {action as deleteClientAction} from "./components/Client";

console.log(import.meta.env);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: clientsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/clientes/nuevo",
        element: <NewClient />,
        action: newClientAction,
        errorElement: <ErrorPage />
      },
      {
        path: "/clientes/:idClient/editar",
        element: <EditClient />,
        action: editClientAction,
        loader: editClientLoader,
        errorElement: <ErrorPage />
      },
      {
        path: "/clientes/:idClient/eliminar",
        action: deleteClientAction
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

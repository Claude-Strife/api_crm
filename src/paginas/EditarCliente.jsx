import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";
import Spinner from "../components/Spinner";

const EditarCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const ObtenerClienteApi = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/${id}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setCliente(resultado);
    } catch (error) {
      console.log(error);
    }
    setCargando(!cargando);
  };

  useEffect(async () => {
    ObtenerClienteApi();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar la informacion del cliente.
      </p>
      {!cargando ? (
        cliente?.nombre ? (
          <Formulario cliente={cliente} cargando={cargando} />
        ) : (
          <p>{`El cliente con el ID: ${id} no es valido`}</p>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default EditarCliente;

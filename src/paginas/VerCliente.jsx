import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { nombre, email, telefono, empresa, notas } = cliente;
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

  return cargando ? <Spinner /> : (
    Object.keys(cliente).length ? (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Ver Cliente</h1>
      <p className="mt-3">Informacion del cliente</p>
      <p className="text-2xl text-gray-700 mt-10">
        <span className="text-gray-800 uppercase font-bold">Cliente: </span>{" "}
        {nombre}
      </p>
      <p className="text-xl text-gray-700 mt-4">
        <span className="text-gray-800 uppercase font-bold">Email: </span>{" "}
        {email}
      </p>
      {telefono && (
        <p className="text-xl text-gray-700 mt-4">
          <span className="text-gray-800 uppercase font-bold">Telefono: </span>{" "}
          {telefono}
        </p>
      )}
      <p className="text-xl text-gray-700 mt-4">
        <span className="text-gray-800 uppercase font-bold">Empresa: </span>{" "}
        {empresa}
      </p>
      {notas && (
        <p className="text-xl text-gray-700 mt-4">
          <span className="text-gray-800 uppercase font-bold">Notas: </span>{" "}
          {notas}
        </p>
      )}
    </div>
  ) : (
    <p>No hay resultado</p>
  ));
};

export default VerCliente;

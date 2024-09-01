import React, { useEffect, useState } from "react";
import axios from "axios";

function Restaurant() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}:3001/usuario`).then((response) => {
      setUsuarios(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Usuarios</h1>
      <ul>
        {usuarios.map((usuario) => {
          return (
            <li key={usuario.id_usuario}>
              <p>Nombre: {usuario.nombre}</p>
              <p>Nombre de Usuario: {usuario.nombre_usuario}</p>
              <p>Correo: {usuario.correo}</p>
              <p>Celular: {usuario.celular}</p>
              <p>Rol: {usuario.rol}</p>
              <p>Activo: {usuario.activo ? "Sí" : "No"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Restaurant;

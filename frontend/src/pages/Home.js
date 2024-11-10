import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}:3001/api/usuario`)
      .then((response) => {
        setUsuarios(response.data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Home</h1>
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

export default Home;

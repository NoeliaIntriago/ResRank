import axios from "axios";
import React, { useEffect, useState } from "react";

function OwnerDashboard() {
  const getUserData = localStorage.getItem("user");
  const userId = getUserData?.id_usuario;

  const [bares, setBares] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.REACT_APP_URL}:3001/bar`, {
          params: { id_usuario: userId }, // Pasar el id del usuario como parámetro
        })
        .then((response) => {
          setBares(response.data);
        })
        .catch((error) => {
          console.error("Error fetching restaurants", error);
        });
    }
  }, [userId]);

  return (
    <div className="App">
      <h1>Gestión Restaurantes</h1>
      <ul>
        {bares.map((restaurant) => (
          <li key={restaurant.id}>
            <p>Facultad: {restaurant.id_facultad}</p>
            <p>Nombre: {restaurant.nombre}</p>
            <p>Horario Inicio: {restaurant.horario_inicio}</p>
            <p>Horario Fin: {restaurant.horario_fin}</p>
            <p>Tipo de Menú: {restaurant.tipo_menu}</p>
            <p>Activo: {restaurant.activo ? "Sí" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerDashboard;

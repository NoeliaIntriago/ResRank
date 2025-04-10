import axios from "axios";
import React, { useEffect, useState } from "react";

function Reviews() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_URL}:3001/api/bar`).then((response) => {
      setRestaurantes(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Opiniones</h1>
      <ul>
        {restaurantes.map((restaurant) => {
          return (
            <li key={restaurant.id_bar}>
              <p>Nombre de restaurant: {restaurant.nombre}</p>
              <p>Horario inicio: {restaurant.horario_inicio}</p>
              <p>Horario fin: {restaurant.horario_fin}</p>
              <p>Tipo Menu: {restaurant.tipo_menu}</p>
              <p>Activo: {restaurant.activo ? "Sí" : "No"}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Reviews;

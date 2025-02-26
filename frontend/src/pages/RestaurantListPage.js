import axios from "axios";
import React, { useEffect, useState } from "react";

function RestaurantList() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}:3001/api/bar`).then((response) => {
      console.log(response.data);
      setRestaurantes(response.data.bares);
    });
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <h1>Restaurantes</h1>
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
    </div>
  );
}

export default RestaurantList;

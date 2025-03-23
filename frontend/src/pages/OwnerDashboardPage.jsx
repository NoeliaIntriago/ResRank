import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RestaurantFilterForm from "../components/forms/RestaurantFilterForm";
import CustomPagination from "../components/ui/Pagination";
import AuthService from "../services/auth.service";
import restaurantService from "../services/restaurant.service";
import { Roles } from "../utils/global";

function OwnerDashboard() {
  const currentUser = AuthService.getCurrentUser();

  const navigate = useNavigate();

  const [bares, setBares] = useState([]);

  const [filter, setFilter] = useState({
    nombre: "",
    id_facultad: "",
    tipo_menu: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 0,
  });

  const makeRequest = useCallback(
    async (page = 1) => {
      try {
        const uid = currentUser?.id_usuario;
        const rol = currentUser?.rol;

        const filters = {
          id_usuario: rol === Roles.DUENO ? uid : null,
          nombre: filter.nombre,
          tipo_menu: filter.tipo_menu,
          id_facultad: filter.id_facultad,
          page,
          perPage: pagination.perPage,
        };

        const { data } = await restaurantService.getAll(filters);

        setBares(data.results);
        setPagination({
          currentPage: data.currentPage,
          perPage: data.perPage,
          totalPages: data.totalPages,
        });
      } catch (error) {
        console.error("Error fetching restaurants", error);
      }
    },
    [currentUser, filter, pagination.perPage]
  );

  const handleStatus = async (data) => {
    try {
      const response = await restaurantService.changeStatus(
        data.id_bar,
        !data.activo,
        currentUser.nombre_usuario
      );

      if (response.status === 200) {
        makeRequest(pagination.currentPage);
      }
    } catch (error) {
      console.error("Error updating restaurant status", error);
    }
  };

  useEffect(() => {
    makeRequest(pagination.currentPage);
  }, [makeRequest, pagination.currentPage]);

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    makeRequest(1);
  };

  const redirectTo = () => {
    navigate("/restaurant/new");
  };

  return (
    <div className="App">
      <div className="app-container">
        <h1>Gestión Restaurantes</h1>
        <Card>
          <Card.Body>
            <Card.Title>Filtros</Card.Title>
            <RestaurantFilterForm
              filter={filter}
              setFilter={setFilter}
              onSearch={handleSearch}
            />
          </Card.Body>
        </Card>
        <Button
          className="mt-1 mb-1"
          variant="primary"
          onClick={() => redirectTo()}
        >
          Crear Restaurante
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Facultad</th>
              <th>Horario Inicio</th>
              <th>Horario Fin</th>
              <th>Tipo de Menú</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bares.map((restaurant) => (
              <tr key={restaurant.id_bar}>
                <td>{restaurant.nombre}</td>
                <td>{restaurant.facultad.nombre}</td>
                <td>{restaurant.horario_inicio}</td>
                <td>{restaurant.horario_fin}</td>
                <td>{restaurant.tipo_menu}</td>
                <td>{restaurant.activo ? "Sí" : "No"}</td>
                <td>
                  <ButtonGroup>
                    {restaurant.activo && (
                      <Button
                        variant="warning"
                        onClick={() => {
                          navigate(`/restaurant/edit/${restaurant.id_bar}`);
                        }}
                      >
                        <FaEdit /> Editar
                      </Button>
                    )}
                    <Button
                      variant={restaurant.activo ? "danger" : "success"}
                      onClick={() => handleStatus(restaurant)}
                    >
                      {restaurant.activo ? <FaBan /> : <FaCheck />}{" "}
                      <span className="d-none d-md-inline">
                        {restaurant.activo ? "Desactivar" : "Activar"}
                      </span>
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <CustomPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={makeRequest}
        />
      </div>
    </div>
  );
}

export default OwnerDashboard;

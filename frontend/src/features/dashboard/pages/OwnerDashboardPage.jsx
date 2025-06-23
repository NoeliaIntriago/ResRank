import { useEffect, useState } from "react";
import { Badge, ButtonGroup, Card, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../shared/components/ActionButton";
import CustomPagination from "../../../shared/components/Pagination";
import { Roles } from "../../../shared/utils/global";
import AuthService from "../../auth/services/auth.service";
import RestaurantFilterForm from "../../restaurants/forms/RestaurantFilterForm";
import restaurantService from "../../restaurants/services/restaurant.service";

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

  const makeRequest = async (page = 1) => {
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
      setPagination((prev) => ({
        ...prev,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching restaurants", error);
    }
  };

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

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    makeRequest(1);
  };

  const redirectTo = () => {
    navigate("/restaurant/new");
  };

  useEffect(() => {
    makeRequest(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <ActionButton type="primary" iconLeft={<FaPlus />} onClick={redirectTo}>
          Crear Restaurante
        </ActionButton>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
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
              <tr key={restaurant.id_bar} className="align-middle text-center">
                <td>{restaurant.nombre}</td>
                <td>
                  <div
                    className="custom-badge"
                    style={{
                      backgroundColor: restaurant.facultad.color,
                      fontWeight: "500",
                    }}
                  >
                    {restaurant.facultad.nombre}
                  </div>
                </td>
                <td>{restaurant.horario_inicio}</td>
                <td>{restaurant.horario_fin}</td>
                <td>
                  <Badge
                    className={`badge-${restaurant.tipo_menu} text-uppercase`}
                    pill
                  >
                    {restaurant.tipo_menu}
                  </Badge>
                </td>
                <td>{restaurant.activo ? "Sí" : "No"}</td>
                <td>
                  <ButtonGroup>
                    {restaurant.activo && (
                      <ActionButton
                        type="edit"
                        iconLeft={<FaEdit />}
                        onClick={() =>
                          navigate(`/restaurant/edit/${restaurant.id_bar}`)
                        }
                      >
                        Editar
                      </ActionButton>
                    )}
                    <ActionButton
                      type={restaurant.activo ? "delete" : "primary"}
                      iconLeft={restaurant.activo ? <FaBan /> : <FaCheck />}
                      onClick={() => handleStatus(restaurant)}
                    >
                      {restaurant.activo ? "Desactivar" : "Activar"}
                    </ActionButton>
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

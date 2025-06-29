import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../shared/components/Pagination";
import { showAlert, showErrorAlert } from "../../../shared/utils/alert";
import { handleApiError } from "../../../shared/utils/handleApiError";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantFilterForm from "../forms/RestaurantFilterForm";
import restaurantService from "../services/restaurant.service";

function RestaurantList() {
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
      const alert = showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

      const filters = {
        nombre: filter.nombre,
        tipo_menu: filter.tipo_menu,
        id_facultad: filter.id_facultad,
        activo: 1,
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
      alert.close();
    } catch (error) {
      console.error("Error fetching restaurants", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    makeRequest(1);
  };
  const redirectTo = (restaurant) => {
    navigate(`/restaurant/review/${restaurant.id_bar}`);
  };

  useEffect(() => {
    makeRequest(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <h1>Restaurantes</h1>
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

        <Row className="mt-3">
          {/* {Crea una card para cada restaurante en bares */}
          {bares.map((restaurant) => (
            <Col
              key={restaurant.id_bar}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex"
              style={{ gap: "1rem", margin: "1rem 0" }}
            >
              <RestaurantCard
                restaurant={restaurant}
                onClick={() => redirectTo(restaurant)}
              />
            </Col>
          ))}
        </Row>

        <CustomPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={makeRequest}
        />
      </div>
    </div>
  );
}

export default RestaurantList;

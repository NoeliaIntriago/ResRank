import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { FaBan, FaCheck, FaEdit, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FacultadSelect from "../components/selects/FacultadSelect";
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import { Roles, TipoMenu } from "../utils/global";

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
    total: 0,
  });

  const makeRequest = useCallback(
    async (page = 1) => {
      try {
        const uid = currentUser?.id_usuario;
        const rol = currentUser?.rol;

        const response = await axios.get(
          `${process.env.REACT_APP_URL}:3001/api/bar`,
          {
            params: {
              id_usuario: rol === Roles.DUENO ? uid : null,
              nombre: filter.nombre,
              tipo_menu: filter.tipo_menu,
              id_facultad: filter.id_facultad,
              page: page,
              perPage: pagination.perPage,
            },
          }
        );

        setBares(response.data.bares); // Asigna los bares
        setPagination({
          currentPage: response.data.currentPage,
          perPage: pagination.perPage,
          total: response.data.total,
        });
      } catch (error) {
        console.error("Error fetching restaurants", error);
      }
    },
    [
      currentUser?.id_usuario,
      currentUser?.rol,
      filter.id_facultad,
      filter.nombre,
      filter.tipo_menu,
      pagination.perPage,
    ]
  );

  const handleStatus = async (data) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}:3001/api/bar/${data.id_bar}/change-status`,
        { activo: !data.activo },
        {
          headers: {
            ...authHeader(),
            usuario_modificacion: currentUser.nombre_usuario,
          },
        }
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

  const handleFacultadChange = (selectedOption) => {
    setFilter({
      ...filter,
      id_facultad: selectedOption ? selectedOption.value : "",
    });
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
            <Row className="mt-1 mb-1">
              <Col sm={12} md={6} lg={4}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={filter.nombre}
                    onChange={(e) =>
                      setFilter({ ...filter, nombre: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Form.Group>
                  <Form.Label>Facultad</Form.Label>
                  <FacultadSelect onSelectFacultad={handleFacultadChange} />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Form.Group>
                  <Form.Label>Tipo de Menú</Form.Label>
                  <Form.Control
                    as="select"
                    value={filter.tipo_menu}
                    onChange={(e) =>
                      setFilter({ ...filter, tipo_menu: e.target.value })
                    }
                  >
                    <option value="">Selecciona un tipo de menú</option>
                    <option value={TipoMenu.PIQUEO}>Piqueo</option>"
                    <option value={TipoMenu.DESAYUNO}>Desayuno</option>"
                    <option value={TipoMenu.ALMUERZO}>Almuerzo</option>"
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-end mt-1 mb-1">
              <Col sm={12} lg={4} className="d-grid">
                <Button variant="primary" onClick={handleSearch}>
                  <FaSearch />
                  <span className="d-none d-md-inline">Buscar</span>
                </Button>
              </Col>
            </Row>
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
              <th>Facultad</th>
              <th>Nombre</th>
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
                <td>{restaurant.facultad.nombre}</td>
                <td>{restaurant.nombre}</td>
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
        <Pagination>
          {[...Array(pagination.total).keys()].map((page) => (
            <Pagination.Item
              key={page}
              active={page + 1 === pagination.currentPage}
              onClick={() => {
                setPagination({ ...pagination, currentPage: page + 1 });
                makeRequest(page + 1);
              }}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}

export default OwnerDashboard;

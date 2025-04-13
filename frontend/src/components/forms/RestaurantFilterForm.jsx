// src/components/forms/RestaurantFilterForm.jsx
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { TipoMenu } from "../../utils/global";
import ActionButton from "../ActionButton";
import FacultadSelect from "../selects/FacultadSelect";

function RestaurantFilterForm({ filter, setFilter, onSearch }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacultadChange = (selectedOption) => {
    setFilter((prev) => ({
      ...prev,
      id_facultad: selectedOption ? selectedOption.value : "",
    }));
  };

  return (
    <Form>
      <Row className="mt-1 mb-1">
        <Col sm={12} md={6} lg={4}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              type="text"
              value={filter.nombre}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <Form.Group>
            <Form.Label>Facultad</Form.Label>
            <FacultadSelect
              selectedValue={filter.id_facultad}
              onSelectFacultad={handleFacultadChange}
            />
          </Form.Group>
        </Col>
        <Col sm={12} md={6} lg={4}>
          <Form.Group>
            <Form.Label>Tipo de Menú</Form.Label>
            <Form.Select
              name="tipo_menu"
              value={filter.tipo_menu}
              onChange={handleChange}
            >
              <option value="">Selecciona un tipo de menú</option>
              <option value={TipoMenu.PIQUEO}>Piqueo</option>
              <option value={TipoMenu.DESAYUNO}>Desayuno</option>
              <option value={TipoMenu.ALMUERZO}>Almuerzo</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end mt-1 mb-1">
        <Col sm={12} lg={4} className="d-grid">
          <ActionButton
            type="primary"
            iconLeft={<FaSearch />}
            onClick={onSearch}
          >
            Consultar
          </ActionButton>
        </Col>
      </Row>
    </Form>
  );
}

export default RestaurantFilterForm;

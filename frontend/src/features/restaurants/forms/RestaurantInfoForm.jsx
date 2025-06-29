// src/components/forms/RestaurantInfoForm.jsx
import { Col, Form, Row } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import FacultadSelect from "../../../shared/components/FacultadSelect";
import { TipoMenu } from "../../../shared/utils/global";

function RestaurantInfoForm({
  restaurantInfo,
  handleChange,
  handleFacultadChange,
  handleStartTimeChange,
  handleEndTimeChange,
}) {
  return (
    <>
      <h2>Información del Bar</h2>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group as={Col} controlId="formNombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                value={restaurantInfo.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                autoComplete="off"
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={2}>
            <Form.Group as={Col} className="mb-3" controlId="selectPiqueo">
              <Form.Label>Tipo Piqueo</Form.Label>
              <Form.Select
                name="tipo_menu"
                value={restaurantInfo.tipo_menu}
                onChange={handleChange}
              >
                <option value="">Selecciona un tipo de menú</option>
                <option value={TipoMenu.PIQUEO}>Piqueo</option>
                <option value={TipoMenu.DESAYUNO}>Desayuno</option>
                <option value={TipoMenu.ALMUERZO}>Almuerzo</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} lg={2}>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Facultad</Form.Label>
              <FacultadSelect
                selectedValue={restaurantInfo.id_facultad}
                onSelectFacultad={handleFacultadChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} lg={2}>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Dueño</Form.Label>
              <Form.Control readOnly value={restaurantInfo.dueno.nombre} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group as={Col} controlId="formHoraInicio" className="mb-3">
              <Form.Label>Horario Inicio</Form.Label>
              <TimePicker
                name="horario_inicio"
                value={restaurantInfo.horario_inicio}
                onChange={handleStartTimeChange}
                start="06:00"
                end="18:00"
                step={30}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group as={Col} controlId="formHoraFin" className="mb-3">
              <Form.Label>Horario Fin</Form.Label>
              <TimePicker
                name="horario_fin"
                value={restaurantInfo.horario_fin}
                onChange={handleEndTimeChange}
                start="06:00"
                end="18:00"
                step={30}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default RestaurantInfoForm;

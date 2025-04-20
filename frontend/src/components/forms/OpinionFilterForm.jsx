import React from "react";
import { Card, Form } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

const calificaciones = [
  { value: "5", label: "Excelente" },
  { value: "4", label: "Muy bueno" },
  { value: "3", label: "Bueno" },
  { value: "2", label: "Regular" },
  { value: "1", label: "Malo" },
];

function OpinionFilterForm({ filter, totalReviews, setFilter, onSearch }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalificacionChange = (value) => {
    setFilter((prev) => ({ ...prev, calificacion: String(value) }));
  };

  return (
    <Card className="p-3">
      <Card.Title className="justify-content-start">
        <FaFilter />
        <span className="ms-2">Filtros</span>
      </Card.Title>
      <hr className="text-muted" />
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Buscar por palabra clave</Form.Label>
            <Form.Control
              name="comentario"
              type="text"
              value={filter.comentario}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        <Form.Group className="mb-3">
          <Form.Label>Filtrar por calificación</Form.Label>
          {calificaciones.map((item) => (
            <div key={item.value} className="d-flex align-items-center mb-2">
              <Form.Check
                type="radio"
                name="calificacion"
                value={item.value}
                checked={filter.calificacion === item.value}
                onChange={() => handleCalificacionChange(item.value)}
                className="me-2"
              />
              <ReactStars
                count={5}
                value={parseInt(item.value)}
                size={20}
                edit={false}
                activeColor="#ffd700"
              />
              <span className="ms-2">{item.label}</span>
            </div>
          ))}
        </Form.Group>
        <div className="mt-2">
          <span className="text-muted">
            Mostrando {totalReviews} opiniones en total
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default OpinionFilterForm;

// src/components/forms/MenuForm.jsx
import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

function MenuForm({ menu, newMenuItem, setNewMenuItem, addMenuItem }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h2>Agregar Plato al Menú</h2>
      <Row>
        <Col md={6}>
          <Form.Group controlId="descripcionPlato" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="descripcion"
              type="text"
              value={newMenuItem.descripcion}
              onChange={handleChange}
              placeholder="Descripción del Plato"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="precioPlato" className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              name="precio"
              type="number"
              value={newMenuItem.precio}
              onChange={handleChange}
              placeholder="Precio"
            />
          </Form.Group>
        </Col>
      </Row>

      <Button onClick={addMenuItem}>Agregar Plato</Button>

      <h3 className="mt-4">Menú Actual</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((menuItem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{menuItem.descripcion}</td>
              <td>{menuItem.precio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MenuForm;

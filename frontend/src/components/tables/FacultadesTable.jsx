import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEdit } from "react-icons/fa";

function FacultadesTable({ facultades, onEdit, onChangeStatus }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Color</th>
          <th>Latitud</th>
          <th>Longitud</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {facultades.map((facultad) => (
          <tr key={facultad.id_facultad}>
            <td>{facultad.nombre}</td>
            <td>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: facultad.color,
                  borderRadius: "50%",
                  border: "1px solid #000",
                }}
              />
            </td>
            <td>{facultad.latitud}</td>
            <td>{facultad.longitud}</td>
            <td>{facultad.activo ? "Sí" : "No"}</td>
            <td>
              <ButtonGroup>
                <Button
                  variant="warning"
                  onClick={() => onEdit("facultad", facultad)} // Pasamos los datos de la fila
                >
                  <FaEdit /> Editar
                </Button>
                <Button
                  variant={facultad.activo ? "danger" : "success"} // Elimina las comillas alrededor de la expresión
                  className="ml-2"
                  onClick={() => onChangeStatus("facultad", facultad)}
                >
                  {facultad.activo ? <FaBan /> : <FaCheck />}{" "}
                  <span className="d-none d-md-inline">
                    {facultad.activo ? "Desactivar" : "Activar"}
                  </span>
                </Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FacultadesTable;

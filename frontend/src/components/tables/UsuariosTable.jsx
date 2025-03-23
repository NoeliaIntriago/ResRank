// src/components/tables/UsuariosTable.jsx
import React from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEdit } from "react-icons/fa";

function UsuariosTable({ usuarios, onEdit, onChangeStatus, setRoleText }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Username</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Activo</th>
          <th>Fecha Creación</th>
          <th>Fecha Modificación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id_usuario}>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.nombre}</td>
            <td>{usuario.nombre_usuario}</td>
            <td>{usuario.correo}</td>
            <td>{setRoleText(usuario.rol)}</td>
            <td>{usuario.activo ? "Sí" : "No"}</td>
            <td>{new Date(usuario.fecha_creacion).toLocaleString()}</td>
            <td>
              {usuario.fecha_modificacion
                ? new Date(usuario.fecha_modificacion).toLocaleString()
                : "N/A"}
            </td>
            <td>
              <ButtonGroup>
                <Button
                  variant="warning"
                  onClick={() => onEdit("usuario", usuario)}
                >
                  <FaEdit /> Editar
                </Button>
                <Button
                  variant={usuario.activo ? "danger" : "success"}
                  className="ml-2"
                  onClick={() => onChangeStatus("usuario", usuario)}
                >
                  {usuario.activo ? <FaBan /> : <FaCheck />}{" "}
                  <span className="d-none d-md-inline">
                    {usuario.activo ? "Desactivar" : "Activar"}
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

export default UsuariosTable;

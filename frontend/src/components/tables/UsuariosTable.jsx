// src/components/tables/UsuariosTable.jsx
import React from "react";
import { ButtonGroup, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEdit } from "react-icons/fa";
import ActionButton from "../ActionButton";

function UsuariosTable({ usuarios, onEdit, onChangeStatus, setRoleText }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="align-middle text-center">
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
          <tr key={usuario.id_usuario} className="align-middle text-center">
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
                <ActionButton
                  type="edit"
                  iconLeft={<FaEdit />}
                  onClick={() => onEdit("usuario", usuario)}
                >
                  Editar
                </ActionButton>
                <ActionButton
                  type={usuario.activo ? "delete" : "primary"}
                  iconLeft={usuario.activo ? <FaBan /> : <FaCheck />}
                  onClick={() => onChangeStatus("usuario", usuario)}
                >
                  {usuario.activo ? "Desactivar" : "Activar"}
                </ActionButton>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsuariosTable;

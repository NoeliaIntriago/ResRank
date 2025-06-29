import { ButtonGroup, Table } from "react-bootstrap";
import { FaBan, FaCheck, FaEdit } from "react-icons/fa";
import ActionButton from "../../../shared/components/ActionButton";

function FacultadesTable({ facultades, onEdit, onChangeStatus }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr className="align-middle text-center">
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
          <tr key={facultad.id_facultad} className="align-middle text-center">
            <td>{facultad.nombre}</td>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: facultad.color,
                    borderRadius: "50%",
                    border: "1px solid #000",
                  }}
                />
              </div>
            </td>
            <td>{facultad.latitud}</td>
            <td>{facultad.longitud}</td>
            <td>{facultad.activo ? "Sí" : "No"}</td>
            <td>
              <ButtonGroup>
                <ActionButton
                  type="edit"
                  iconLeft={<FaEdit />}
                  onClick={() => onEdit("facultad", facultad)}
                >
                  Editar
                </ActionButton>
                <ActionButton
                  type={facultad.activo ? "delete" : "primary"}
                  iconLeft={facultad.activo ? <FaBan /> : <FaCheck />}
                  onClick={() => onChangeStatus("facultad", facultad)}
                >
                  {facultad.activo ? "Desactivar" : "Activar"}
                </ActionButton>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FacultadesTable;

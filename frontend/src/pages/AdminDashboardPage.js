import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Tab, Table, Tabs } from "react-bootstrap";
import { FaBan, FaCheck, FaEdit } from "react-icons/fa";
import FacultadForm from "../components/forms/FacultadForm";
import UsuarioForm from "../components/forms/UsuarioForm";
import ModalWrapper from "../components/wrappers/ModalWrapper";
import { showErrorAlert } from "../utils/alert";
import { Roles } from "../utils/global";
import { showToast } from "../utils/toast";

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [facultades, setFacultades] = useState([]);

  const [key, setKey] = useState("usuarios"); // Pestaña activa

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: "", data: null });

  const initialUsuarioValues = {
    id_usuario: null,
    nombre: "",
    nombre_usuario: "",
    correo: "",
    contrasena: "",
    celular: "",
    rol: Roles.ADMIN,
    matricula: "",
  };

  const initialFacultadValues = {
    id_facultad: null,
    nombre: "",
    color: "#ffffff",
    latitud: "",
    longitud: "",
    activo: true,
  };

  const setRoleText = (rol) => {
    switch (rol) {
      case Roles.ADMIN:
        return "Administrador";
      case Roles.DUENO:
        return "Dueño de restaurante";
      case Roles.ESTUDIANTE:
        return "Estudiante";
      default:
        return "Desconocido";
    }
  };

  const fetchData = async () => {
    try {
      const usuariosResponse = await axios.get(
        `${process.env.REACT_APP_URL}:3001/usuario`
      );
      setUsuarios(
        usuariosResponse.data.map((usuario) => ({
          ...usuario,
          contrasena: "", // No mostrar la contraseña en la tabla
          matricula: usuario.estudiante?.matricula || null,
        }))
      );

      const facultadesResponse = await axios.get(
        `${process.env.REACT_APP_URL}:3001/facultad`
      );
      setFacultades(facultadesResponse.data);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Llamamos a la función asíncrona
  }, []);

  const handleShowModal = (type, data = null) => {
    setModalInfo({ type, data });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalInfo({ type: "", data: null });
  };

  const handleSubmit = async (values) => {
    try {
      let response;

      if (modalInfo.type === "usuario") {
        // Si la contraseña está vacía, no la envíes al backend
        const { contrasena, ...usuarioData } = values;
        const dataToSend = contrasena ? values : usuarioData;

        // Si estamos editando un usuario
        if (modalInfo.data) {
          response = await axios.put(
            `${process.env.REACT_APP_URL}:3001/usuario/${modalInfo.data.id_usuario}`,
            dataToSend,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else {
          // Crear nuevo usuario
          response = await axios.post(
            `${process.env.REACT_APP_URL}:3001/usuario`,
            values
          );
        }
      } else if (modalInfo.type === "facultad") {
        if (modalInfo.data) {
          // Editar facultad
          response = await axios.put(
            `${process.env.REACT_APP_URL}:3001/facultad/${modalInfo.data.id_facultad}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } else {
          // Crear nueva facultad
          response = await axios.post(
            `${process.env.REACT_APP_URL}:3001/facultad`,
            values
          );
        }
      }

      showToast(response.message, "success");
      fetchData();
      handleCloseModal();
    } catch (error) {
      showErrorAlert(
        "Error",
        error.response?.data?.message || "Error al guardar los datos"
      );
    }
  };

  const handleStatus = async (type, data) => {
    try {
      let response;

      if (type === "usuario") {
        response = await axios.put(
          `${process.env.REACT_APP_URL}:3001/usuario/${data.id_usuario}`,
          { activo: !data.activo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (type === "facultad") {
        response = await axios.put(
          `${process.env.REACT_APP_URL}:3001/facultad/${data.id_facultad}`,
          { activo: !data.activo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      console.log("Respuesta de la API:", response.message);
      showToast(response.message, "success");

      fetchData();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      showErrorAlert(
        "Error",
        error.response?.data?.message || "Error al cambiar el estado"
      );
    }
  };

  return (
    <div className="App">
      <div className="table-container">
        <h1>Gestión del Administrador</h1>

        {/* Pestañas para cambiar entre secciones */}
        <Tabs
          id="admin-dashboard-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="usuarios" title="Usuarios">
            <Button
              variant="primary"
              onClick={() => handleShowModal("usuario")}
            >
              Agregar Usuario
            </Button>
            <UsuariosTable
              usuarios={usuarios}
              onEdit={handleShowModal}
              onChangeStatus={handleStatus}
              setRoleText={setRoleText}
            />
          </Tab>
          <Tab eventKey="facultades" title="Facultades">
            <Button
              variant="primary"
              onClick={() => handleShowModal("facultad")}
            >
              Agregar Facultad
            </Button>
            <FacultadesTable
              facultades={facultades}
              onEdit={handleShowModal}
              onChangeStatus={handleStatus}
            />
          </Tab>
        </Tabs>

        {/* Modal que se adapta a usuarios o facultades */}
        <ModalWrapper
          show={showModal}
          onHide={handleCloseModal}
          title={
            modalInfo.data
              ? `Editar ${modalInfo.type}`
              : `Agregar ${modalInfo.type}`
          }
        >
          {modalInfo.type === "usuario" && (
            <UsuarioForm
              initialValues={modalInfo.data || initialUsuarioValues}
              onSubmit={handleSubmit}
            />
          )}
          {modalInfo.type === "facultad" && (
            <FacultadForm
              initialValues={modalInfo.data || initialFacultadValues}
              onSubmit={handleSubmit}
            />
          )}
        </ModalWrapper>
      </div>
    </div>
  );
}

// Componente para mostrar la tabla de usuarios
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
                  onClick={() => onEdit("usuario", usuario)} // Pasamos los datos de la fila
                >
                  <FaEdit /> Editar
                </Button>
                <Button
                  variant={usuario.activo ? "danger" : "success"} // Elimina las comillas alrededor de la expresión
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

// Componente para mostrar la tabla de facultades
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

export default AdminDashboard;

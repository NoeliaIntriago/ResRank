import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Tab, Table, Tabs } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import FacultadForm from "../components/forms/FacultadForm";
import UsuarioForm from "../components/forms/UsuarioForm";
import ModalWrapper from "../components/wrappers/ModalWrapper";
import "../styles/AdminDashboard.css";
import { Roles } from "../utils/global";

function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [facultades, setFacultades] = useState([]);

  const [key, setKey] = useState("usuarios"); // Pestaña activa

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editData, setEditData] = useState(null);

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

  const fetchData = async () => {
    try {
      const usuariosResponse = await axios.get(
        `${process.env.REACT_APP_URL}:3001/usuario`
      );
      setUsuarios(usuariosResponse.data);

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
    setModalType(type);
    setEditData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleSubmit = async (values) => {
    try {
      let response;

      if (modalType === "usuario") {
        // Si estamos editando un usuario
        if (editData) {
          // Hacer PUT para editar el usuario
          response = await axios.put(
            `${process.env.REACT_APP_URL}:3001/usuario/${editData.id_usuario}`,
            values, // Los datos que envías
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Obtener el token desde el almacenamiento local
              },
            }
          );
        } else {
          // Hacer POST para crear un nuevo usuario
          response = await axios.post(
            `${process.env.REACT_APP_URL}:3001/usuario`,
            values
          );
        }
      } else if (modalType === "facultad") {
        // Si estamos editando una facultad
        if (editData) {
          // Hacer PUT para editar la facultad
          response = await axios.put(
            `${process.env.REACT_APP_URL}:3001/facultad/${editData.id_facultad}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // Obtener el token desde el almacenamiento local
              },
            }
          );
        } else {
          // Hacer POST para crear una nueva facultad
          response = await axios.post(
            `${process.env.REACT_APP_URL}:3001/facultad`,
            values
          );
        }
      }

      // Muestra el mensaje de éxito o haz algo con la respuesta
      console.log("Respuesta de la API:", response.data);

      // Recargar los datos después de la operación
      fetchData();

      // Cerrar el modal después de guardar los datos
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      // Mostrar un mensaje de error si falla
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

      console.log("Respuesta de la API:", response.data);

      fetchData();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
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
          title={editData ? `Editar ${modalType}` : `Agregar ${modalType}`}
        >
          {modalType === "usuario" && (
            <UsuarioForm
              initialValues={editData || initialUsuarioValues}
              onSubmit={handleSubmit}
            />
          )}
          {modalType === "facultad" && (
            <FacultadForm
              initialValues={editData || initialFacultadValues}
              onSubmit={handleSubmit}
            />
          )}
        </ModalWrapper>
      </div>
    </div>
  );
}

// Componente para mostrar la tabla de usuarios
function UsuariosTable({ usuarios, onEdit, onChangeStatus }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Username</th>
          <th>Correo</th>
          <th>Contraseña</th>
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
            <td>{usuario.contrasena}</td>
            <td>{usuario.rol}</td>
            <td>{usuario.activo ? "Sí" : "No"}</td>
            <td>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
            <td>
              {usuario.fecha_modificacion
                ? new Date(usuario.fecha_modificacion).toLocaleDateString()
                : "N/A"}
            </td>
            <td>
              <Button
                variant="warning"
                onClick={() => onEdit("usuario", usuario)} // Pasamos los datos de la fila
              >
                <FaEdit /> Editar
              </Button>

              <Button
                variant="danger"
                className="ml-2"
                onClick={() => onChangeStatus("usuario", usuario)}
              >
                <FaTrash /> Eliminar
              </Button>
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
              <Button
                variant="warning"
                onClick={() => onEdit("facultad", facultad)} // Pasamos los datos de la fila
              >
                <FaEdit /> Editar
              </Button>

              <Button
                variant="danger"
                className="ml-2"
                onClick={() => onChangeStatus("facultad", facultad)}
              >
                <FaTrash /> Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default AdminDashboard;

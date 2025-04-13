import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ActionButton from "../components/ActionButton";
import FacultadForm from "../components/forms/FacultadForm";
import UsuarioForm from "../components/forms/UsuarioForm";
import FacultadesTable from "../components/tables/FacultadesTable";
import UsuariosTable from "../components/tables/UsuariosTable";
import ModalWrapper from "../components/wrappers/ModalWrapper";
import AuthService from "../services/auth.service";
import facultadService from "../services/facultad.service";
import userService from "../services/user.service";
import { showErrorAlert } from "../utils/alert";
import { Roles } from "../utils/global";
import { showToast } from "../utils/toast";

function AdminDashboard() {
  const currentUser = AuthService.getCurrentUser();

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
      const usuariosResponse = await userService.getAll();
      setUsuarios(
        usuariosResponse.data.map((usuario) => ({
          ...usuario,
          contrasena: "", // No mostrar la contraseña en la tabla
          matricula: usuario.estudiante?.matricula || null,
        }))
      );

      const facultadesResponse = await facultadService.getAll();
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
          response = await userService.update(
            modalInfo.data.id_usuario,
            dataToSend,
            currentUser.nombre_usuario
          );
        } else {
          // Crear nuevo usuario
          response = await userService.create(
            dataToSend,
            currentUser.nombre_usuario
          );
        }
      } else if (modalInfo.type === "facultad") {
        if (modalInfo.data) {
          // Editar facultad
          response = await facultadService.update(
            modalInfo.data.id_facultad,
            values,
            currentUser.nombre_usuario
          );
        } else {
          // Crear nueva facultad
          response = await facultadService.create(
            values,
            currentUser.nombre_usuario
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
        response = await userService.toggleStatus(
          data.id_usuario,
          !data.activo,
          currentUser.nombre_usuario
        );
      } else if (type === "facultad") {
        response = await facultadService.toggleStatus(
          data.id_facultad,
          !data.activo,
          currentUser.nombre_usuario
        );
      }

      const message = response.data.message;
      showToast(message, "success");

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
      <div className="app-container">
        <h1>Gestión del Administrador</h1>

        {/* Pestañas para cambiar entre secciones */}
        <Tabs
          id="admin-dashboard-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="usuarios" title="Usuarios">
            <ActionButton
              type="primary"
              icon={<FaPlus />}
              onClick={() => handleShowModal("usuario")}
            >
              Agregar Usuario
            </ActionButton>
            <UsuariosTable
              usuarios={usuarios}
              onEdit={handleShowModal}
              onChangeStatus={handleStatus}
              setRoleText={setRoleText}
            />
          </Tab>
          <Tab eventKey="facultades" title="Facultades">
            <ActionButton
              type="primary"
              icon={<FaPlus />}
              onClick={() => handleShowModal("facultad")}
            >
              Agregar Facultad
            </ActionButton>
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

export default AdminDashboard;

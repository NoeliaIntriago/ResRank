import { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ActionButton from "../../../shared/components/ActionButton";
import ModalWrapper from "../../../shared/components/ModalWrapper";
import { showAlert, showErrorAlert } from "../../../shared/utils/alert";
import { Roles } from "../../../shared/utils/global";
import { handleApiError } from "../../../shared/utils/handleApiError";
import { showToast } from "../../../shared/utils/toast";
import AuthService from "../../auth/services/auth.service";
import FacultadesTable from "../../users/components/FacultadesTable";
import UsuariosTable from "../../users/components/UsuariosTable";
import FacultadForm from "../../users/forms/FacultadForm";
import UsuarioForm from "../../users/forms/UsuarioForm";
import facultadService from "../../users/services/facultad.service";
import userService from "../../users/services/user.service";

function AdminDashboard() {
  const currentUser = AuthService.getCurrentUser();
  const usuarioFormRef = useRef();
  const facultadFormRef = useRef();

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
      const alert = showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

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

      alert.close();
    } catch (error) {
      console.error("Error al cargar datos:", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
    }
  };

  useEffect(() => {
    fetchData();
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
      const alert = showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

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

      alert.close();
      showToast(response.data.message, "success");
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Error al actualizar/crear datos:", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
    }
  };

  const handleStatus = async (type, data) => {
    try {
      const alert = showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

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

      alert.close();
      showToast(message, "success");
      fetchData();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
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
              iconLeft={<FaPlus />}
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
              iconLeft={<FaPlus />}
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
          primaryAction={{
            label: "Guardar",
            onClick: () => {
              if (modalInfo.type === "usuario") {
                usuarioFormRef.current?.submitForm();
              } else if (modalInfo.type === "facultad") {
                facultadFormRef.current?.submitForm();
              }
            },
          }}
        >
          {modalInfo.type === "usuario" && (
            <UsuarioForm
              key={modalInfo.data?.id_usuario || "nuevo"}
              innerRef={usuarioFormRef}
              initialValues={modalInfo.data || initialUsuarioValues}
              onSubmit={handleSubmit}
            />
          )}
          {modalInfo.type === "facultad" && (
            <FacultadForm
              innerRef={facultadFormRef}
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

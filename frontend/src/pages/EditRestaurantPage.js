import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";
import { useNavigate, useParams } from "react-router-dom";
import FacultadSelect from "../components/selects/FacultadSelect";
import authHeader from "../services/auth-header";
import AuthService from "../services/auth.service";
import { showAlert, showErrorAlert } from "../utils/alert";
import { TipoMenu } from "../utils/global";
import { secondsToTimeFormat, timeFormatToSeconds } from "../utils/times";
import { showToast } from "../utils/toast";

function EditRestaurant() {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const { id } = useParams();
  const isEdit = !!id; // Si existe id, entonces es edición; si no, es creación.
  const [activeTab, setActiveTab] = useState("info");

  // Estado para la información general del restaurante
  const [restaurantInfo, setRestaurantInfo] = useState({
    nombre: "",
    tipo_menu: "",
    id_facultad: "",
    horario_inicio: timeFormatToSeconds("06:00"),
    horario_fin: timeFormatToSeconds("18:00"),
  });

  // Estado para el menú
  const [menu, setMenu] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    descripcion: "",
    precio: 0.0,
  });

  useEffect(() => {
    if (isEdit) {
      // Cargar datos del restaurante existente
      axios
        .get(`${process.env.REACT_APP_URL}:3001/api/bar/${id}`)
        .then((response) => {
          const { data } = response;

          setRestaurantInfo(data);
          handleStartTimeChange(timeFormatToSeconds(data.horario_inicio));
          handleEndTimeChange(timeFormatToSeconds(data.horario_fin));

          setMenu(data.menu);
        });
    }
  }, [isEdit, id]);

  // Manejar cambios en los inputs de información general
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Manejar cambios en la hora de inicio
  const handleStartTimeChange = (time) => {
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      horario_inicio: time,
    }));
  };

  // Manejar cambios en la hora de fin
  const handleEndTimeChange = (time) => {
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      horario_fin: time,
    }));
  };

  // Manejar cambio de facultad
  const handleFacultadChange = (selectedOption) => {
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      id_facultad: selectedOption.value,
    }));
  };

  // Manejar cambios en los inputs de un nuevo plato
  const handleNewMenuItemChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // Agregar un nuevo plato al menú
  const addMenuItem = () => {
    if (newMenuItem.descripcion && newMenuItem.precio) {
      setMenu([...menu, { ...newMenuItem }]);
      setNewMenuItem({ descripcion: "", precio: 0.0 }); // Reiniciar el formulario
    } else {
      alert("Debe completar la descripción y el precio del plato.");
    }
  };

  // Manejar el envío de los datos
  const handleSubmit = () => {
    // Validar campos obligatorios
    if (!restaurantInfo.nombre) {
      showToast("El nombre del restaurante es obligatorio.", "error");
      return;
    }

    if (!restaurantInfo.tipo_menu) {
      showToast("Debe seleccionar un tipo de menú.", "error");
      return;
    }

    if (!restaurantInfo.id_facultad) {
      showToast("Debe seleccionar una facultad.", "error");
      return;
    }

    if (!restaurantInfo.horario_inicio || !restaurantInfo.horario_fin) {
      showToast("Debe seleccionar el horario de apertura y cierre.", "error");
      return;
    }

    // Validar que la hora de fin sea mayor que la hora de inicio
    if (restaurantInfo.horario_fin <= restaurantInfo.horario_inicio) {
      showToast(
        "La hora de cierre debe ser mayor que la hora de inicio.",
        "error"
      );
      return;
    }

    // Validar que el menú tenga al menos un plato
    if (menu.length === 0) {
      showToast("Debe agregar al menos un plato al menú.", "error");
      return;
    }

    // Validación adicional para cada plato del menú (ejemplo: precios válidos)
    for (let item of menu) {
      if (!item.descripcion || item.precio <= 0) {
        showToast(
          "Todos los platos deben tener una descripción válida y un precio mayor a 0.",
          "error"
        );
        return;
      }
    }

    const payload = {
      ...restaurantInfo,
      id_dueno: currentUser.id_usuario,
      horario_inicio: secondsToTimeFormat(restaurantInfo.horario_inicio),
      horario_fin: secondsToTimeFormat(restaurantInfo.horario_fin),
      menu,
    };

    if (isEdit) {
      axios
        .put(`${process.env.REACT_APP_URL}:3001/api/bar/${id}`, payload, {
          headers: {
            ...authHeader(),
            usuario_modificacion: currentUser.nombre_usuario,
          },
        })
        .then(async () => {
          await showAlert(
            "Guardado",
            "Datos guardados correctamente",
            "success"
          );
          navigate("/restaurant/edit/" + id);
        })
        .catch((error) => {
          showErrorAlert(
            "Error",
            error.response?.data?.message || "Error al guardar los datos"
          );
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_URL}:3001/api/bar`, payload, {
          headers: {
            ...authHeader(),
            usuario_creacion: currentUser.nombre_usuario,
          },
        })
        .then(async (response) => {
          await showAlert(
            "Guardado",
            "Datos guardados correctamente",
            "success"
          );
          navigate("/restaurant/edit/" + response.data.id_bar);
        })
        .catch((error) => {
          showErrorAlert(
            "Error",
            error.response?.data?.message || "Error al guardar los datos"
          );
        });
    }
  };

  const goBack = () => {
    navigate("/restaurant-management");
  };

  return (
    <div className="App">
      <div className="app-container">
        <Row>
          <Col>
            <h1>{isEdit ? "Editar Restaurante" : "Crear Nuevo Restaurante"}</h1>
          </Col>
        </Row>
        <Card>
          <Card.Body>
            <Tabs
              id="restaurant-info-tabs"
              activeKey={activeTab}
              onSelect={setActiveTab}
            >
              <Tab eventKey="info" title="Información" className="p-2">
                <h2>Información del Bar</h2>
                <Form>
                  <Row>
                    <Col md={6} lg={7}>
                      <Form.Group
                        as={Col}
                        controlId="formNombre"
                        className="mb-3"
                      >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          name="nombre"
                          type="text"
                          value={restaurantInfo.nombre}
                          onChange={handleChange}
                          placeholder="Nombre"
                          autoComplete="off"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} lg={2}>
                      <Form.Group
                        as={Col}
                        className="mb-3"
                        controlId="selectPiqueo"
                      >
                        <Form.Label>Tipo Piqueo</Form.Label>
                        <Form.Select
                          name="tipo_menu"
                          value={restaurantInfo.tipo_menu}
                          onChange={handleChange}
                        >
                          <option value="">Selecciona un tipo de menú</option>
                          <option value={TipoMenu.PIQUEO}>Piqueo</option>
                          <option value={TipoMenu.DESAYUNO}>Desayuno</option>
                          <option value={TipoMenu.ALMUERZO}>Almuerzo</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} lg={3}>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Label>Facultad</Form.Label>
                        <FacultadSelect
                          selectedValue={restaurantInfo.id_facultad}
                          onSelectFacultad={handleFacultadChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group
                        as={Col}
                        controlId="formHoraInicio"
                        className="mb-3"
                      >
                        <Form.Label>Horario Inicio</Form.Label>
                        <TimePicker
                          name="horario_inicio"
                          value={restaurantInfo.horario_inicio}
                          onChange={handleStartTimeChange}
                          start="06:00"
                          end="18:00"
                          step={30}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group
                        as={Col}
                        controlId="formHoraFin"
                        className="mb-3"
                      >
                        <Form.Label>Horario Fin</Form.Label>
                        <TimePicker
                          name="horario_fin"
                          value={restaurantInfo.horario_fin}
                          onChange={handleEndTimeChange}
                          start="06:00"
                          end="18:00"
                          step={30}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab>

              <Tab eventKey="menu" title="Menú" className="p-2">
                <h2>Agregar Plato al Menú</h2>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="descripcionPlato" className="mb-3">
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        name="descripcion"
                        type="text"
                        value={newMenuItem.descripcion}
                        onChange={handleNewMenuItemChange}
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
                        onChange={handleNewMenuItemChange}
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
              </Tab>
            </Tabs>
            <Button className="mt-3" onClick={handleSubmit}>
              Guardar Todo
            </Button>
            <Button className="mt-3 ms-2" variant="secondary" onClick={goBack}>
              Cancelar
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default EditRestaurant;

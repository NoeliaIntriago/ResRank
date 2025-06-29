import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert, showErrorAlert } from "../../../shared/utils/alert";
import { handleApiError } from "../../../shared/utils/handleApiError";
import {
  secondsToTimeFormat,
  timeFormatToSeconds,
} from "../../../shared/utils/times";
import { showToast } from "../../../shared/utils/toast";
import AuthService from "../../auth/services/auth.service";
import MenuForm from "../forms/MenuForm";
import RestaurantInfoForm from "../forms/RestaurantInfoForm";
import restaurantService from "../services/restaurant.service";

function EditRestaurant() {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const { id } = useParams();
  const isEdit = !!id;
  const [activeTab, setActiveTab] = useState("info");

  const [restaurantInfo, setRestaurantInfo] = useState({
    nombre: "",
    tipo_menu: "",
    id_facultad: "",
    horario_inicio: timeFormatToSeconds("06:00"),
    horario_fin: timeFormatToSeconds("18:00"),
    dueno: {
      nombre: currentUser.nombre,
    },
  });

  const [menu, setMenu] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    descripcion: "",
    precio: 0.0,
  });

  useEffect(() => {
    if (isEdit) {
      const alert = showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );

      restaurantService
        .getById(id)
        .then((response) => {
          const { data } = response;

          setRestaurantInfo(data);
          handleStartTimeChange(timeFormatToSeconds(data.horario_inicio));
          handleEndTimeChange(timeFormatToSeconds(data.horario_fin));

          setMenu(data.menu);
          alert.close();
        })
        .catch((error) => {
          console.error("Error al cargar datos:", error);
          const { title, message } = handleApiError(error);
          showErrorAlert(title, message);
        });
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleStartTimeChange = (time) => {
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      horario_inicio: time,
    }));
  };

  const handleEndTimeChange = (time) => {
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      horario_fin: time,
    }));
  };

  const handleFacultadChange = (selectedOption) => {
    setRestaurantInfo((prevInfo) => ({
      ...prevInfo,
      id_facultad: selectedOption.value,
    }));
  };

  const addMenuItem = () => {
    if (newMenuItem.descripcion && newMenuItem.precio) {
      setMenu([...menu, { ...newMenuItem }]);
      setNewMenuItem({ descripcion: "", precio: 0.0 });
    } else {
      alert("Debe completar la descripción y el precio del plato.");
    }
  };

  const handleSubmit = async () => {
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

    if (restaurantInfo.horario_fin <= restaurantInfo.horario_inicio) {
      showToast(
        "La hora de cierre debe ser mayor que la hora de inicio.",
        "error"
      );
      return;
    }

    if (menu.length === 0) {
      showToast("Debe agregar al menos un plato al menú.", "error");
      return;
    }

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

    showAlert(
      "Guardando datos",
      "Por favor, espera mientras se guardan los datos.",
      "info"
    );

    if (isEdit) {
      try {
        await restaurantService.update(id, payload, currentUser.nombre_usuario);

        await showAlert("Guardado", "Datos guardados correctamente", "success");
        navigate("/restaurant/edit/" + id);
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        const { title, message } = handleApiError(error);
        showErrorAlert(title, message);
      }
    } else {
      try {
        const { data: response } = await restaurantService.create(
          payload,
          currentUser.nombre_usuario
        );

        await showAlert("Guardado", "Datos guardados correctamente", "success");
        navigate("/restaurant/edit/" + response.data.id_bar);
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        const { title, message } = handleApiError(error);
        showErrorAlert(title, message);
      }
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
                <RestaurantInfoForm
                  restaurantInfo={restaurantInfo}
                  handleChange={handleChange}
                  handleFacultadChange={handleFacultadChange}
                  handleStartTimeChange={handleStartTimeChange}
                  handleEndTimeChange={handleEndTimeChange}
                />
              </Tab>

              <Tab eventKey="menu" title="Menú" className="p-2">
                <MenuForm
                  newMenuItem={newMenuItem}
                  menu={menu}
                  setNewMenuItem={setNewMenuItem}
                  addMenuItem={addMenuItem}
                />
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

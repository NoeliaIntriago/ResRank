import { useEffect, useState } from "react";
import LeafletMap from "../../../shared/components/LeafletMap";
import { showAlert, showErrorAlert } from "../../../shared/utils/alert";
import { handleApiError } from "../../../shared/utils/handleApiError";
import facultadService from "../../users/services/facultad.service";

function Locations() {
  const [facultades, setFacultades] = useState([]);

  const fetchFacultades = async () => {
    try {
      const alert = showAlert(
        "Cargando datos",
        "Por favor, espera mientras se procesa tu solicitud.",
        "info"
      );
      const response = await facultadService.getAll({
        append_restaurants: true,
      });
      setFacultades(response.data);
      alert.close();
    } catch (error) {
      console.error("Error fetching facultades", error);
      const { title, message } = handleApiError(error);
      await showErrorAlert(title, message);
    }
  };

  useEffect(() => {
    fetchFacultades();
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <h1>Ubicaciones</h1>
        <div style={{ width: "100%", height: "100vh" }}>
          <LeafletMap locations={facultades} />
        </div>
      </div>
    </div>
  );
}

export default Locations;

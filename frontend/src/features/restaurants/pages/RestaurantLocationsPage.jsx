import { useEffect, useState } from "react";
import LeafletMap from "../../../shared/components/LeafletMap";
import facultadService from "../../users/services/facultad.service";

function Locations() {
  const [facultades, setFacultades] = useState([]);

  const fetchFacultades = async () => {
    try {
      const response = await facultadService.getAll({
        append_restaurants: true,
      });
      setFacultades(response.data);
    } catch (error) {
      console.error("Error fetching facultades", error);
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

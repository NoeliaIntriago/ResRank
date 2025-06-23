import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import MapCanvas from "../../map/MapCanvas";
import { mapOptions } from "../../map/MapSettings";
import facultadService from "../../users/services/facultad.service";

function Locations() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

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
          <MapCanvas isLoaded={isLoaded} locations={facultades} />
        </div>
      </div>
    </div>
  );
}

export default Locations;

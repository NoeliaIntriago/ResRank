import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import MapCanvas from "../components/map/MapCanvas";
import { mapOptions } from "../components/map/MapSettings";
import facultadService from "../services/facultad.service";

function Locations() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });

  const [facultades, setFacultades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFacultades = async () => {
    try {
      const response = await facultadService.getAll();
      setFacultades(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facultades", error);
      setLoading(false);
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

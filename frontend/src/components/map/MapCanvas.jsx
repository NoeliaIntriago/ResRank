import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useState } from "react";
import NoDataText from "../ui/NoDataText";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -2.1477050417677974,
  lng: -79.95973177634244,
};

const generarIcono = (color) => {
  const svg = `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="12" fill="${color}" stroke="black" stroke-width="2"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

function MapCanvas({ isLoaded, locations }) {
  const [selectedFacultad, setSelectedFacultad] = useState(null);

  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16.5}>
        {locations.map((facultad) => (
          <Marker
            key={facultad.id_facultad}
            position={{
              lat: Number(facultad.latitud),
              lng: Number(facultad.longitud),
            }}
            icon={{
              url: generarIcono(facultad.color || "#f1c40f"),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onMouseOver={() => setSelectedFacultad(facultad)}
          />
        ))}

        {selectedFacultad && (
          <InfoWindow
            position={{
              lat: Number(selectedFacultad.latitud),
              lng: Number(selectedFacultad.longitud),
            }}
            onCloseClick={() => setSelectedFacultad(null)}
          >
            <div style={{ maxWidth: "200px" }}>
              <h5>{selectedFacultad.nombre}</h5>
              {selectedFacultad.restaurants.length === 0 && <NoDataText />}
              <ul style={{ paddingLeft: "1rem" }}>
                {selectedFacultad.restaurants.map((restaurante) => (
                  <li key={restaurante.id_restaurante}>{restaurante.nombre}</li>
                ))}
              </ul>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  );
}

export default MapCanvas;

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

const generarIconoPersonalizado = (facultad) => {
  const { nombre } = facultad;

  return `/icons/markers/marker_${nombre.toLowerCase()}.svg`;
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
              url: generarIconoPersonalizado(facultad),
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

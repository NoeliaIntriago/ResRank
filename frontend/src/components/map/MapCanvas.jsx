import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -2.1477050417677974,
  lng: -79.95973177634244,
};

function MapCanvas({ isLoaded, locations }) {
  return (
    isLoaded && (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={16.5}>
        {locations.map((location) => (
          <Marker
            key={location.id_facultad}
            position={{
              lat: Number(location.latitud),
              lng: Number(location.longitud),
            }}
            label={location.nombre}
          />
        ))}
      </GoogleMap>
    )
  );
}

export default MapCanvas;

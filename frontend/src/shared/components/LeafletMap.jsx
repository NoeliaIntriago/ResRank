import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import NoDataText from "./NoDataText";

const generarIconoPersonalizado = (facultad) => {
  const iconUrl = `/icons/markers/marker_${facultad.nombre.toLowerCase()}.svg`;
  return new L.Icon({
    iconUrl,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

function LeafletMap({ locations }) {
  const [selectedFacultad, setSelectedFacultad] = useState(null);

  const center = {
    lat: -2.1473561,
    lng: -79.9588401,
  };

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={16}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((facultad) => (
        <Marker
          key={facultad.id_facultad}
          position={[Number(facultad.latitud), Number(facultad.longitud)]}
          icon={generarIconoPersonalizado(facultad)}
          eventHandlers={{
            click: () => setSelectedFacultad(facultad),
          }}
        />
      ))}

      {selectedFacultad && (
        <Popup
          position={[
            Number(selectedFacultad.latitud),
            Number(selectedFacultad.longitud),
          ]}
          onClose={() => setSelectedFacultad(null)}
        >
          <div style={{ maxWidth: "200px" }}>
            <h5>{selectedFacultad.nombre}</h5>
            {selectedFacultad.restaurants.length === 0 ? (
              <NoDataText />
            ) : (
              <ul style={{ paddingLeft: "1rem" }}>
                {selectedFacultad.restaurants.map((r) => (
                  <li key={r.id_restaurante}>{r.nombre}</li>
                ))}
              </ul>
            )}
          </div>
        </Popup>
      )}
    </MapContainer>
  );
}

export default LeafletMap;

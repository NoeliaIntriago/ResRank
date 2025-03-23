import React, { useEffect, useState } from "react";
import Select from "react-select";
import facultadService from "../../services/facultad.service";

const FacultadSelect = ({ onSelectFacultad, selectedValue }) => {
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

  const facultadesOptions = facultades.map((facultad) => ({
    value: facultad.id_facultad,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: facultad.color,
            marginRight: "10px",
          }}
        ></div>
        {facultad.nombre}
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    onSelectFacultad(selectedOption);
  };

  if (loading) {
    return <p>Cargando facultades...</p>;
  }

  // Find the selected option based on the selectedValue prop
  const selectedOption = facultadesOptions.find(
    (option) => option.value === selectedValue
  );

  return (
    <Select
      options={facultadesOptions}
      onChange={handleChange}
      value={selectedOption || null}
      placeholder="Selecciona una facultad"
      isClearable
    />
  );
};

export default FacultadSelect;

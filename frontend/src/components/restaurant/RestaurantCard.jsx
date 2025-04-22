import { Badge, Card, Col, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import ActionButton from "../ActionButton";

const RestaurantCard = ({ restaurant, onClick }) => {
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words.map((w) => w[0].toUpperCase()).join("");
  };

  const siglasRestaurante = getInitials(restaurant.nombre);

  return (
    <Card className="flex-fill h-100 border-0 shadow-sm rounded-3 overflow-hidden">
      {/* Encabezado con color de la facultad y siglas */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: restaurant.facultad.color,
          height: "80px",
        }}
      >
        <h5 className="text-white fw-bold m-0">{siglasRestaurante}</h5>
      </div>

      <Card.Body className="d-flex flex-column">
        {/* Nombre del restaurante */}
        <Card.Title className="mb-2 text-uppercase fw-bold fs-6 text-truncate">
          {restaurant.nombre}
        </Card.Title>

        {/* Facultad como badge */}
        <div className="mb-2">
          <div
            className="custom-badge"
            style={{
              backgroundColor: restaurant.facultad.color,
              fontWeight: "500",
            }}
          >
            {restaurant.facultad.nombre}
          </div>
        </div>

        {/* Horario y tipo de menú */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-muted small">
            ⏰ {restaurant.horario_inicio} - {restaurant.horario_fin}
          </div>
          <Badge
            className={`badge-${restaurant.tipo_menu} text-uppercase`}
            pill
            style={{
              fontWeight: "500",
              fontSize: "0.75rem",
              padding: "0.35rem 0.75rem",
            }}
          >
            🍴 {restaurant.tipo_menu}
          </Badge>
        </div>

        {/* Botón de redirección */}
        <Row className="mt-auto">
          <Col className="text-center">
            <ActionButton
              type="primary"
              className="w-100"
              iconLeft={<FaEdit />}
              onClick={onClick}
            >
              Dejar reseña
            </ActionButton>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard;

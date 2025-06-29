import moment from "moment";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

function OpinionCard({ review }) {
  return (
    <Card className="m-1 p-3">
      <Card.Title className="mb-0">{review.usuario.nombre}</Card.Title>
      <Card.Body>
        <div className="d-flex align-items-center gap-2">
          <ReactStars
            count={5}
            value={Math.floor(review.calificacion)}
            size={20}
            edit={false}
            isHalf={true}
            activeColor="#FFD700"
          />
          <span className="text-muted">
            {moment(review.fecha_creacion).format("DD/MM/YYYY")}
          </span>
        </div>
        <Card.Text className="mt-2">{review.comentario}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default OpinionCard;

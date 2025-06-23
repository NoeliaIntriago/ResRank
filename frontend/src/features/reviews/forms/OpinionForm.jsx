import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import ModalWrapper from "../../../shared/components/ModalWrapper";
import { showToast } from "../../../shared/utils/toast";

function OpinionForm({ show, onShow, onSubmit }) {
  const [opinion, setOpinion] = useState({
    calificacion: 0,
    comentario: "",
  });

  const handleClose = () => {
    onShow(false);
    setOpinion({
      calificacion: 0,
      comentario: "",
    });
  };

  const handleSubmit = async () => {
    if (!opinion.calificacion || opinion.calificacion < 1) {
      showToast("Por favor, selecciona una calificación.", "warning");
      return;
    }

    if (!opinion.comentario.trim()) {
      showToast("El comentario no puede estar vacío.", "warning");
      return;
    }

    try {
      await onSubmit(opinion);
      setOpinion({ calificacion: 0, comentario: "" });
    } catch (error) {
      console.error("Error al enviar la opinión", error);
    }
  };

  return (
    <ModalWrapper
      show={show}
      onHide={handleClose}
      title="Escribe tu opinión"
      primaryAction={{ label: "Publicar opinion", onClick: handleSubmit }}
    >
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Calificación</Form.Label>
              <ReactStars
                count={5}
                onChange={(newRating) =>
                  setOpinion({ ...opinion, calificacion: newRating })
                }
                size={24}
                activeColor="#ffd700"
                value={opinion.calificacion}
                isHalf={false}
                edit={true}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={opinion.comentario}
                onChange={(e) =>
                  setOpinion({ ...opinion, comentario: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </ModalWrapper>
  );
}

export default OpinionForm;

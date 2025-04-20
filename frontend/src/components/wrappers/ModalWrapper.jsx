import { Button, Modal } from "react-bootstrap";

function ModalWrapper({ show, onHide, title, children, primaryAction }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        {primaryAction && (
          <Button variant="main" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWrapper;

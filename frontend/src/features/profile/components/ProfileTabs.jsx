import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { FaKey, FaSave } from "react-icons/fa";
import * as Yup from "yup";

function ProfileTabs({ initialProfile, onSubmitProfile, onSubmitPassword }) {
  const profileSchema = Yup.object({
    nombre: Yup.string().required("Campo requerido"),
    nombre_usuario: Yup.string().required("Campo requerido"),
    correo: Yup.string().email("Correo inválido").required("Campo requerido"),
    celular: Yup.string().max(10).required("Campo requerido"),
  });

  const passwordSchema = Yup.object({
    contrasena_actual: Yup.string().required("Campo requerido"),
    contrasena_nueva: Yup.string().min(6).max(16).required("Campo requerido"),
  });

  return (
    <Tabs defaultActiveKey="perfil" id="tabs-perfil" className="mb-4">
      <Tab eventKey="perfil" title="Información">
        <Formik
          initialValues={initialProfile}
          validationSchema={profileSchema}
          onSubmit={onSubmitProfile}
          enableReinitialize
        >
          {({ dirty, isValid }) => (
            <FormikForm className="p-4 bg-white rounded shadow-sm">
              <h5 className="mb-4">📝 Detalle de perfil</h5>

              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label className="mb-0">Nombre</Form.Label>
                </Col>
                <Col md={8}>
                  <Field name="nombre" as={Form.Control} />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label className="mb-0">Usuario</Form.Label>
                </Col>
                <Col md={8}>
                  <Field name="nombre_usuario" as={Form.Control} />
                  <ErrorMessage
                    name="nombre_usuario"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label className="mb-0">Correo</Form.Label>
                </Col>
                <Col md={8}>
                  <Field name="correo" as={Form.Control} type="email" />
                  <ErrorMessage
                    name="correo"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label className="mb-0">Celular</Form.Label>
                </Col>
                <Col md={8}>
                  <Field name="celular" as={Form.Control} />
                  <ErrorMessage
                    name="celular"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  className="btn-main"
                  disabled={!dirty || !isValid}
                >
                  <FaSave className="me-2" />
                  Guardar cambios
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Tab>

      {/* --- TAB 2: Cambio de Contraseña --- */}
      <Tab eventKey="password" title="Seguridad">
        <Formik
          initialValues={{ contrasena_actual: "", contrasena_nueva: "" }}
          validationSchema={passwordSchema}
          onSubmit={onSubmitPassword}
        >
          {({ isValid, dirty }) => (
            <FormikForm className="p-4 bg-white rounded shadow-sm">
              <h5 className="mb-4">🔐 Cambio de contraseña</h5>

              <Row className="mb-3 align-items-center">
                <Col md={4}>
                  <Form.Label className="mb-0">Contraseña actual</Form.Label>
                </Col>
                <Col md={8}>
                  <Field
                    name="contrasena_actual"
                    as={Form.Control}
                    type="password"
                  />
                  <ErrorMessage
                    name="contrasena_actual"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <Row className="mb-4 align-items-center">
                <Col md={4}>
                  <Form.Label className="mb-0">Nueva contraseña</Form.Label>
                </Col>
                <Col md={8}>
                  <Field
                    name="contrasena_nueva"
                    as={Form.Control}
                    type="password"
                  />
                  <ErrorMessage
                    name="contrasena_nueva"
                    component="div"
                    className="text-danger"
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  className="btn-main"
                  disabled={!dirty || !isValid}
                >
                  <FaKey className="me-2" />
                  Cambiar contraseña
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Tab>
    </Tabs>
  );
}

export default ProfileTabs;

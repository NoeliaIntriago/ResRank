import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { BlockPicker } from "react-color";

function FacultadForm({ initialValues, onSubmit }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, values, setFieldValue }) => (
        <FormikForm onSubmit={handleSubmit}>
          {/* Nombre */}
          <Form.Group as={Col} controlId="formNombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Field
              name="nombre"
              as={Form.Control}
              type="text"
              placeholder="Nombre"
              isInvalid={!!ErrorMessage.nombre}
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          {/* Color */}
          <Form.Group as={Col} controlId="formColor" className="mb-3">
            <Form.Label>Color</Form.Label>
            <BlockPicker
              color={values.color}
              onChangeComplete={(color) => setFieldValue("color", color.hex)}
            />
          </Form.Group>

          {/* Latitud */}
          <Form.Group as={Col} controlId="formLatitud" className="mb-3">
            <Form.Label>Latitud</Form.Label>
            <Field
              name="latitud"
              as={Form.Control}
              type="text"
              placeholder="Latitud"
              isInvalid={!!ErrorMessage.latitud}
            />
            <ErrorMessage
              name="latitud"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          {/* Longitud */}
          <Form.Group as={Col} controlId="formLongitud" className="mb-3">
            <Form.Label>Longitud</Form.Label>
            <Field
              name="longitud"
              as={Form.Control}
              type="text"
              placeholder="Longitud"
              isInvalid={!!ErrorMessage.longitud}
            />
            <ErrorMessage
              name="longitud"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}

export default FacultadForm;

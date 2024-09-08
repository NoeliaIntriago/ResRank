import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "react-bootstrap";
import { BlockPicker } from "react-color";

function FacultadForm({ initialValues, onSubmit }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, values, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <Field
              type="text"
              name="nombre"
              className="form-control"
              required
            />
            <ErrorMessage
              name="nombre"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="color">Color</label>
            <BlockPicker
              color={values.color}
              onChangeComplete={(color) => setFieldValue("color", color.hex)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="latitud">Latitud</label>
            <Field
              type="text"
              name="latitud"
              className="form-control"
              required
            />
            <ErrorMessage
              name="latitud"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitud">Longitud</label>
            <Field
              type="text"
              name="longitud"
              className="form-control"
              required
            />
            <ErrorMessage
              name="longitud"
              component="div"
              className="text-danger"
            />
          </div>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default FacultadForm;

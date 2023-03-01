import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function CreateOwner() {
    const initialValues = {
        name: "",
        lastName: "",
        cellphone: "",
        email: "",
        password: "",
        userType: 1
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        lastName: Yup.string().required(),
        cellphone: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/owner", data).then((res) => {
            console.log(data);
        });
    };

    return (
        <div className="createOwnerPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Name: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateOwner"
                        name="name"
                        placeholder="Ingrese nombre"
                    />
                    <ErrorMessage name="name" component="span"/>

                    <label>Lastname: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateOwner"
                        name="lastName"
                        placeholder="Ingrese apellido"
                    />
                    <ErrorMessage name="lastName" component="span"/>

                    <label>Cellphone: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateOwner"
                        name="cellphone"
                        placeholder="Ingrese celular"
                    />
                    <ErrorMessage name="cellphone" component="span"/>

                    <label>Email: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateOwner"
                        name="email"
                        placeholder="Ingrese correo"
                    />
                    <ErrorMessage name="email" component="span"/>

                    <label>Password: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateOwner"
                        name="password"
                        placeholder="Ingrese contraseña"
                    />
                    <ErrorMessage name="password" component="span"/>

                    <button type="submit"> Create Owner </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateOwner
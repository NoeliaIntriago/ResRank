import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterStudent() {
    const initialValues = {
        name: "",
        lastName: "",
        career: "",
        email: "",
        password: "",
        userType: 2
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        lastName: Yup.string().required(),
        career: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().min(4).max(16).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/register/student", data).then((res) => {
            console.log(data);
            navigate(`/students`);
        });
    };

    let navigate = useNavigate();

    return (
        <div className="createStudentPage">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Name: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateStudent"
                        name="name"
                        placeholder="Ingrese nombre"
                    />
                    <ErrorMessage name="name" component="span"/>

                    <label>Lastname: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateStudent"
                        name="lastName"
                        placeholder="Ingrese apellido"
                    />
                    <ErrorMessage name="lastName" component="span"/>

                    <label>Career: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateStudent"
                        name="career"
                        placeholder="Ingrese career"
                    />
                    <ErrorMessage name="career" component="span"/>

                    <label>Email: </label>
                    <Field
                        autoComplete="off"
                        id="inputCreateStudent"
                        name="email"
                        placeholder="Ingrese email"
                    />
                    <ErrorMessage name="email" component="span"/>

                    <label>Password: </label>
                    <Field
                        autoComplete="off"
                        type="password"
                        id="inputCreateStudent"
                        name="password"
                        placeholder="Ingrese contraseña"
                    />
                    <ErrorMessage name="password" component="span"/>

                    <button type="submit"> Create Student </button>
                </Form>
            </Formik>
        </div>
    )
}

export default RegisterStudent
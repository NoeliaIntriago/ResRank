import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Owner() {
  let { id } = useParams();
  const [owner, setOwnerObject] = useState({});
  const [locals, setLocals] = useState([]);
  let navigate = useNavigate();

  const initialValues = {
    name: "",
    faculty: "",
    latitude: "",
    longitude: "",
    score: 0,
    open_time: "",
    close_time: "",
    ownerId: id
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    faculty: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    open_time: Yup.string().required(),
    close_time: Yup.string().required()
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/owner/${id}`).then((res) => {
      setOwnerObject(res.data);
    });

    axios.get(`http://localhost:3001/local/owner/${id}`).then((res) => {
      setLocals(res.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addLocal = (data) => {
    axios.post(`http://localhost:3001/local`, data, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      }
    })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log(data);
          setLocals([...locals, data]);
        }
      })
  }

  return (
    <div className="ownerPage">
      <div className="leftSide">
        <div className="ownerInfo" id="individual">
          <div className="name">
            {owner.name} {owner.lastName}
          </div>
          <div className="body">
            <div className="cellphone">
              {owner.cellphone}
            </div>
            <div className="email">
              {owner.email}
            </div>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addLocalContainer">
          <Formik initialValues={initialValues} onSubmit={addLocal} validationSchema={validationSchema}>
            <Form className="formContainer">
              <label>Name: </label>
              <Field
                autoComplete="off"
                id="inputCreateLocal"
                name="name"
                placeholder="Ingrese nombre"
              />
              <ErrorMessage name="name" component="span" />

              <label>Faculty: </label>
              <Field
                autoComplete="off"
                id="inputCreateLocal"
                name="faculty"
                placeholder="Ingrese facultad"
              />
              <ErrorMessage name="faculty" component="span" />

              <label>Latitude: </label>
              <Field
                autoComplete="off"
                id="inputCreateLocal"
                name="latitude"
                placeholder="Ingrese latitud"
              />
              <ErrorMessage name="latitude" component="span" />

              <label>Longitud: </label>
              <Field
                autoComplete="off"
                id="inputCreateLocal"
                name="longitude"
                placeholder="Ingrese longitud"
              />
              <ErrorMessage name="longitude" component="span" />

              <label>Open Time: </label>
              <Field
                autoComplete="off"
                id="inputCreateLocal"
                name="open_time"
                placeholder="Ingrese hora de apertura"
              />
              <ErrorMessage name="open_time" component="span" />

              <label>Close Time: </label>
              <Field
                autoComplete="off"
                id="inputCreateLocal"
                name="close_time"
                placeholder="Ingrese hora de cierre"
              />
              <ErrorMessage name="close_time" component="span" />

              <button type="submit"> Create Local </button>
            </Form>
          </Formik>
        </div>
        <div className="localsContainer">
          {locals.map((local, key) => {
            return (
              <div key={key} className="local" onClick={() => navigate(`/local/${local.id}`)}>
                <div className="name"> {local.name}</div>
                <div className="faculty"> {local.faculty} </div>
                <div className="open_time"> {local.open_time} </div>
                <div className="close_time"> {local.close_time} </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Owner
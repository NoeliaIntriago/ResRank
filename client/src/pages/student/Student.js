import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Student() {
  let { id } = useParams();
  const [student, setStudentObject] = useState({});
  const [opinions, setOpinions] = useState([]);
  const [newOpinion, setNewOpinion] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/student/${id}`).then((res) => {
      setStudentObject(res.data);
    });

    axios.get(`http://localhost:3001/opinion/student/${id}`).then((res) => {
      setOpinions(res.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addOpinion = () => {
    console.log("dentro de addOpinion")
    axios.post(`http://localhost:3001/opinion`, {
      score: 4.5,
      details: newOpinion,
      localId: 1,
      studentId: id
    }).then((res) => {
      const opinionToAdd = { details: newOpinion };
      setOpinions([...opinions, opinionToAdd]);
      setNewOpinion("");
    })
  }

  return (
    <div className="studentPage">
      <div className="leftSide">
        <div className="studentInfo" id="individual">
          <div className="name">
            {student.name} {student.lastName}
          </div>
          <div className="body">
            <div className="career">
              {student.career}
            </div>
            <div className="email">
              {student.email}
            </div>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addOpinionContainer">
          <input
            type="text"
            placeholder="Opinion"
            autoComplete="off"
            value={newOpinion}
            onChange={(event) => { setNewOpinion(event.target.value) }}
          />
          <button onClick={addOpinion}> Add Opinion </button>
        </div>
        <div className="opinionsContainer">
          {opinions.map((opinion, key) => {
            return (
              <div key={key} className="opinion">
                <div className="score"> {opinion.score} </div>
                <div className="details"> {opinion.details} </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Student
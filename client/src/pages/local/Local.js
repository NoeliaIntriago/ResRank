import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Local() {
  let { id } = useParams();
  const [local, setLocalObject] = useState({});
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/opinion/local/${id}`).then((res) => {
      setOpinions(res.data);
    });

    axios.get(`http://localhost:3001/local/${id}`).then((res) => {
      setLocalObject(res.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="ownerPage">
      <div className="leftSide">
        <div className="ownerInfo" id="individual">
          <div className="name">
            {local.name}
          </div>
          <div className="body">
            <div className="cellphone">
              {local.faculty}
            </div>
            <div className="email">
              {local.open_time}
            </div>
            <div className="email">
              {local.close_time}
            </div>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="localsContainer">
          {opinions.map((opinion, key) => {
            return (
              <div key={key} className="local">
                <div className="name"> {opinion.score}</div>
                <div className="faculty"> {opinion.details} </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Local
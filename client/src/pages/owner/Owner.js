import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Owner() {
  let { id } = useParams();
  const [owner, setOwnerObject] = useState({});
  const [locals, setLocals] = useState([]);
  const [newLocal, setNewLocal] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/owner/${id}`).then((res) => {
      setOwnerObject(res.data);
    });

    axios.get(`http://localhost:3001/local/${id}`).then((res) => {
      setLocals(res.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addLocal = () => {
    axios.post(`http://localhost:3001/local`, {
      name: newLocal,
      faculty: "FIEC",
      latitude: -79.833120,
      longitude: -2.171288,
      open_time: moment("2023-02-26T08:30:00").format("YYYY-MM-DD hh:mm:ss"),
      close_time: moment("2023-02-26T16:30:00").format("YYYY-MM-DD hh:mm:ss"),
      ownerId: id
    }, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      }
    })
    .then((res) => {
      if(res.data.error) {
        alert(res.data.error);
      } else {
        const localToAdd = { name: newLocal };
        setLocals([...locals, localToAdd]);
        setNewLocal("");
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
          <input 
            type="text" 
            placeholder="Local" 
            autoComplete="off" 
            value={newLocal}
            onChange={(event) => { setNewLocal(event.target.value) }} 
          />
          <button onClick={addLocal}> Add Local </button>
        </div>
        <div className="localsContainer">
          {locals.map((local, key) => {
            return <div key={key} className="local"> {local.name} </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Owner
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {
    let { id } = useParams();
    const [owner, setOwnerObject] = useState({});

    useEffect(() => {
      axios.get(`http://localhost:3001/owner/${id}`).then((res) => {
        setOwnerObject(res.data);
      })
    });

    return (
    <div className="ownerPage">
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
  )
}

export default Post
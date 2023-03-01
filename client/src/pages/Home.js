import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';

function Home() {
    const [owners, setOwners] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/owner").then((res) => {
            setOwners(res.data);
        })
    }, [])
    return (
        <div>
            {owners.map((value, key) => {
                return (
                    <div className="owner">
                        <div className="name"> {value.name} {value.lastName} </div>
                        <div className="cellphone"> {value.cellphone} </div>
                        <div className="email"> {value.email} </div>
                        <div className="password"> {value.password} </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Home
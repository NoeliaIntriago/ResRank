import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowStudents() {
    const [students, setStudents] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/student").then((res) => {
            setStudents(res.data);
        })
    }, [])
    return (
        <div>
            {students.map((value, key) => {
                return (
                    <div key={key} className="student" onClick={() => navigate(`/student/${value.id}`)}>
                        <div className="name"> {value.name} {value.lastName} </div>
                        <div className="career"> {value.career} </div>
                        <div className="email"> {value.email} </div>
                    </div>
                );
            })}
        </div>
    )
}

export default ShowStudents
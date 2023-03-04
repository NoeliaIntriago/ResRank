import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginStudent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const login = () => {
        let data = {email: email, password: password}
        axios.post("http://localhost:3001/auth/login/student", data).then((res) => {
            console.log(data);
            navigate(`/students`);
        });
    };

    return (
        <div className="loginContainer">
            <label>Username:</label>
            <input type="text" onChange={(event) => { setEmail(event.target.value) }} />

            <label>Password:</label>
            <input type="password" onChange={(event) => { setPassword(event.target.value) }} />

            <button onClick={login}> Login </button>
        </div>
    )
}

export default LoginStudent
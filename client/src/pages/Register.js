import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import RegisterOwner from './register/RegisterOwner';
import RegisterStudent from './register/RegisterStudent';

function Register() {
    return (
        <div className="buttons">
            <Link to="/register/owner">
                <button> I'm an Owner </button>
            </Link>
            <Link to="/register/student">
                <button> I'm an Student </button>
            </Link>

            <Routes>
                <Route path="/register/owner" exact element={<RegisterOwner/>}/>
                <Route path="/register/student" exact element={<RegisterStudent/>}/>
            </Routes>
        </div>
    )
}

export default Register
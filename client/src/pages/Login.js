import React from 'react';
import { Link } from 'react-router-dom';
function Register() {
    return (
        <div className="buttons">
            <Link to="/login/owner">
                <button> I'm an Owner </button>
            </Link>
            <Link to="/login/student">
                <button> I'm an Student </button>
            </Link>
        </div>
    )
}

export default Register
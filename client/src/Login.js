
import React from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/register');
    };

    return (
        <div>
            <from>
                <div>
                    <label>email: </label>
                    <input type='email' placeholder='Enter email' id='email'></input>
                </div>
                <div>
                    <label>password: </label>
                    <input type='password' placeholder='Enter password' id='password'></input>
                </div>
                <div>
                    <input type='submit' value='Sign In' id='submit'></input>
                </div>
                <button onClick={handleClick}>Sign up</button>
            </from>
        </div>
    )
};

export default Login;

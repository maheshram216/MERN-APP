import './App.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handlePassword = () => {
        // if(password)
        setShowPassword(!showPassword)
    }

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': "Application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        // if (data) {
        //     console.log(" success")
        //     alert("success")
        //     navigate('/');
        // }

        if (data.errors) {
            alert("Enter all fileds")
        } else {
            console.log(data);
            localStorage.setItem("token", data.token);
            navigate('/get')
        };

        console.log(localStorage.getItem("token"));

        if (data.message === "User not Exist") {
            alert("user not exist");
            navigate('/login');
        };

        if (data.status === "Password Enterd Wrong") {
            alert("invalid credentials ");
            navigate('/login');
        };

    };

    const handleSingnup = () => {
        navigate('/register');
    };

    return (
        <div className='content'>
            <i class="bi bi-eye"></i>
            <h1>Signin</h1>
            <from method="POST">
                <div>
                    <label>email: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter email' id='email'></input>
                </div>
                <div>
                    <label>password: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder='Enter password' id='password'></input>
                    {showPassword ? <button onClick={handlePassword}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg></button> : <button onClick={handlePassword}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                    </button>}
                </div>
                <div>
                    <input type='submit' value='Sign In' id='submit' onClick={loginUser}></input>
                </div>
                <button onClick={handleSingnup} >Sign up</button>
            </from>
        </div>
    )
};

export default Login;

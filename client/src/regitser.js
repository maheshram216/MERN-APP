import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';

const Register = () => {

    const navigate = useNavigate();

    const [user, setuser] = useState({
        name: "", email: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setuser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = user;

        const res = await fetch("http://localhost:5000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password, cpassword })
        });

        const data = await res.json();

        if (data.errors ) {
            alert("Enter all fields");
        } else {
            console.log(data);
            navigate('/login');
        };

        if (data.message === "User Exist") {
            alert("user exist");
            navigate('/register');
        };

        if (data.message === "passowrd not match") {
            alert("passowrd not match");
            navigate('/register');
        };
    };

    return (
        <div className='content'>
            <form>
                <h1>Signup</h1>
                <div>
                    <label>name: </label>
                    <input required value={user.name} onChange={handleInputs} id="name" type="text" name="name" placeholder="Enter name"></input>
                </div>
                <div>
                    <label>email: </label>
                    <input value={user.email} onChange={handleInputs} id="email" type="email" name="email" placeholder="Enter email"></input>
                </div>
                <div>
                    <label>password: </label>
                    <input value={user.password} onChange={handleInputs} id="password" type="password" name="password" placeholder="Enter password"></input>
                </div>
                <div>
                    <label>cpassword: </label>
                    <input value={user.cpassword} onChange={handleInputs} id="cpassword" type="password" name="cpassword" placeholder="Confrom password"></input>
                </div>
                <div>
                    <input id="submit" type="submit" value="register" onClick={postData}></input>
                </div>
            </form>
        </div>
    );
};

export default Register;
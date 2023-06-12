

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Logout() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login', { replace: true });
    }
    useEffect(() => {
        handleClick();
    })
    return (
        <div>
            {/* <button onClick={handleClick}>logout</button> */}
        </div>
    )
}

export default Logout

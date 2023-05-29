import './App.css'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Nav() {
    return (
        <div className='nav'>
            <ul className='nav-bar'>
                <li className='linav' >
                    <Link style={{textDecoration:"none"}} to='/'>Home Page</Link>
                </li>
                <li className='linav' >
                    <Link style={{textDecoration:"none"}} to='/register'>Register</Link>
                </li>
                <li className='linav'>
                    <Link style={{textDecoration:"none"}} to='/login'>Login</Link>
                </li>
                <Outlet />
            </ul>
        </div>
    )
};

export default Nav;

import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div className='content'>
      <h1>Home page</h1>
      <Link to={'/login'} >login</Link>
    </div>
  )
}

export default Home

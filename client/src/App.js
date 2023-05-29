import Register from './regitser';
import Login from './Login';
import Home from './Home';
import Nav from './Nav';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from 'react'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App
import Register from './regitser';
import Login from './Login';
import Home from './Home';
import Nav from './Nav';
import PostData from './PostData';
import GetData from './GetData';
import Logout from './Logout';
import Error from './Error'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from 'react'

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/post' element={<PostData />} />
          <Route path='/get' element={<GetData />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<Error/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App
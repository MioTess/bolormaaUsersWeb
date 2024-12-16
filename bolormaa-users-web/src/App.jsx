import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'
import LogIn from './LogIn'
import Home from './Home'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

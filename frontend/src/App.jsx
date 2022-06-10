import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import Auth from './pages/Auth'
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path="/auth" element={<Auth />}></Route>
    </Routes>
  )
}

export default App
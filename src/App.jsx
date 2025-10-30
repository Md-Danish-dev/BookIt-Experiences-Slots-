import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Result from './pages/Result'
import Layout from './pages/Layout'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/experience/:id" element={<Details/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/result" element={<Result/>} />
    </Routes>
  )
}

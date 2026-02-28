import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from "./login"
import Signup from './signup'
import Home from "./home"
import Admin from "./admin"
import Product from "./product"
import Productdetail from "./productdetail"
import Cart from "./cart"
import Checkout from "./Checkout"
const App = () => {
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productdetail/:id" element={<Productdetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>}/>
        </Routes>
    </>
  )
}

export default App
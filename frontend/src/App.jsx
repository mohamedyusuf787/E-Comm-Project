import React from 'react'
import {Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userId } from './slice/userIdSlice';
import auth from "./config/firebase"
import Login from "./login"
import Signup from './signup'
import Home from "./home"
import Admin from "./admin"
import Product from "./product"
import Productdetail from "./productdetail"
import Cart from "./cart"
import Checkout from "./Checkout"
const App = () => {
  const dispatch=useDispatch()

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(userId({
        uid: user.uid,
        email: user.email
      }))
    } else {
      dispatch(userId({
        uid: "",
        email: ""
      }))
    }
  });

  return () => unsubscribe();
}, []);


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
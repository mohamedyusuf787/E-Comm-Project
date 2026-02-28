import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import auth from "../config/firebase"
import { signOut } from 'firebase/auth'
import { LuMenu, LuShoppingCart, LuUser, LuX, LuSearch, LuFilter } from "react-icons/lu";
import logo from "../assets/logo-light.png"
import { useSelector, useDispatch } from 'react-redux'
import { userId } from '../slice/userIdSlice';
import '../index.css'

const Navbar = () => {
  // const [log, setLog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userID)
  // console.log("from navbar", User)

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setLog(true)
  //     }
  //   })
  // }, [navigate])

  function logout() {
  signOut(auth).then(() => {
     dispatch(userId({
        uid: "",
        email: ""
     }))
  })
}

  function login() {
    navigate("/login")
  }

  function handleMenu() {
  const menu = document.querySelector(".mobile-menu"); 
  
  if (menu) {
    menu.classList.toggle("hiddenn");
  }
}

  return (
    <>
      <nav className='flex flex-row justify-between items-center px-5 py-2 bg-prime'>
        <div className="logo ">
          <img src={logo} alt="logo" />
        </div>
        <ul className='hidden md:flex gap-3 text-white '>
          <li>Home</li>
          <li>Products</li>
          <li>Contact us</li>
        </ul>
        <div onClick={handleMenu} className="icons flex text-white text-2xl hover:cursor-pointer md:hidden">
          <LuMenu />
        </div>

        {
          User.uid ?
            (
              <button onClick={logout} className='hidden md:flex bg-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Logout dude</button>
            ) :
            (
              <button onClick={login} className='hidden md:flex bg-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Login bro</button>
            )
        }
      </nav>
      
        <div className="mobile-menu flex-col text-right h-60 bg-white w-full px-4 py-3  rounded-b-2xl drop-shadow-md md:hidden">
          <ul>
            <li className='border-b py-2'>Home</li>
            <li  className='border-b py-2'>Products</li>
            <li  className='border-b py-2'>Contact us</li>  
              <button onClick={logout} className='hidden md:flex bg-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Logout dude</button>

          </ul>

          <div className="nav-btns flex justify-end mt-2">
             {
          User.uid ?
            (
              <button onClick={logout} className=' bg-prime text-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Logout dude</button>
            ) :
            (
              <button onClick={login} className=' bg-prime text-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Login bro</button>
            )
        }
          </div>
        </div>
    </>
  )
}

export default Navbar
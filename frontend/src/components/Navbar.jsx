import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import auth from "../config/firebase"
import { signOut } from 'firebase/auth'
import { LuMenu, LuShoppingCart, LuUser, LuX, LuSearch, LuFilter } from "react-icons/lu";
import logo from "../assets/logo-light.png"
import { useSelector } from 'react-redux'
import '../index.css'

const Navbar = () => {
  // const [log, setLog] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const User = useSelector((state) => state.userID)  //userID.uid access in the bottom.

  function logout() {
    signOut(auth)
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
        <ul className='hidden md:flex gap-4 text-white '>
          <li className='font-bold  transition-all duration-300 ease-in-out hover:scale-125'><Link to="/">Home</Link></li>
          <li className='font-bold  transition-all duration-300 ease-in-out hover:scale-125'><Link to="/product">Products</Link></li>
          <li className='font-bold  transition-all duration-300 ease-in-out hover:scale-125'><Link to="/cart">Cart</Link></li>
        </ul>
        <div onClick={handleMenu} className="icons flex text-white text-2xl hover:cursor-pointer md:hidden">
          <LuMenu />
        </div>

        {
          User.uid ?
            (
              <button onClick={logout} className='hidden md:flex bg-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Logout</button>
            ) :
            (
              <button onClick={login} className='hidden md:flex bg-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Login</button>
            )
        }
      </nav>

      <div className="mobile-menu flex-col text-right h-60 bg-white w-full px-4 py-3  rounded-b-2xl drop-shadow-md md:hidden">
        <ul>
          <li className='border-b py-2 transition-all duration-300 ease-in-out hover:scale-105'><Link to="/">Home</Link></li>
          <li className='border-b py-2 transition-all duration-300 ease-in-out hover:scale-105'><Link to="/product">Products</Link></li>
          <li className='border-b py-2 transition-all duration-300 ease-in-out hover:scale-105'><Link to="/cart">Cart</Link></li>
          <button onClick={logout} className='hidden md:flex bg-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Logout dude</button>

        </ul>

        <div className="nav-btns flex justify-end mt-2">
          {
            User.uid ?
              (
                <button onClick={logout} className=' border-2 border-prime text-prime w-fit px-6 py-2 rounded-lg hover:cursor-pointer hover:bg-prime hover:text-white  transition duration-200 ease-in-out'>Logout</button>
              ) :
              (
                <button onClick={login} className=' bg-prime text-white w-fit px-6 py-2 rounded-lg hover:cursor-pointer'>Login</button>
              )
          }
        </div>
      </div>
    </>
  )
}

export default Navbar
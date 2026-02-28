import { React, useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux';
import { userId } from './slice/userIdSlice';
import auth from "./config/firebase"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const uid = useSelector((state) => state.userID.uid)
  useEffect(() => {
    if (uid) {
      navigate("/");
    }
  }, [uid]);


  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login process
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate('/');
        // console.log('User logged in:', { email, password });
        console.log(res.user)
        const { uid, email } = res.user
        console.log("UID:", res.user.uid)
        dispatch(userId({
          uid: uid,
          email: email
        }))

        axios.post("http://localhost:3000/api/user", { userId: uid, userEmail: email })
          .then((res) => {
            console.log("success", res)
          })
          .catch((err) => console.log("user id not availabe", err))

      })
      .catch((err) => {
        alert("user not found,Please signup")
        console.log("User not registered,Please sign in", err)
      })

    // Redirect to homepage/dashboard after login
    // Replace '/home' with your homepage route
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded-2xl shadow-md lg:w-[50%]">
        <h2 className="text-2xl font-bold mb-5 text-gray-800">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/signup")}>New user? Register here</p>
        <button type="submit" className="btn transition duration-200 ease-in-out">
          Login
        </button>
      </form>
    </div>
  );
}

export default login
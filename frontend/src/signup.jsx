import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import auth from "./config/firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth'

const signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPwd, setConfPwd] = useState("")
    const [error, setError] = useState("")

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                navigate("/login")
            }
        },[navigate])
    })

    function handleSubmit(e) {
        e.preventDefault();
        if (confPwd === password) {
            return createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log("user signed up", res)
                    navigate("/login")
                })
                .catch((err) => {
                    console.log("error with user signup", err)
                    alert("User already Signedup")
                })
        }

        else {
            setError('Passwords do not match');
            alert("password mismatched")
        }
    }


    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form onSubmit={handleSubmit} className="p-10 bg-white rounded-lg shadow-lg" style={{ width: "70%" }}>
                    <h2 className="text-2xl font-bold mb-5 text-gray-800">Sign In</h2>
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
                        <input type="password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password:</label>
                        <input type="password" value={confPwd}
                            onChange={(e) => setConfPwd(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border rounded"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <p className='text-blue-600 cursor-pointer my-2' onClick={() => navigate("/login")}> Already have an account? Login here</p>
                    <button type="submit" className="btn">
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}

export default signup
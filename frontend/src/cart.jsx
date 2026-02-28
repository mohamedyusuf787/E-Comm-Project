import { useState, useEffect } from "react";
import axios from "axios"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import img from "./assets/watch-1.png"

const Cart = () => {
    const [cart, setCart] = useState([])
    const uid = useSelector((state) => state.userID.uid)
    const navigate = useNavigate()
    const fetchCart = async () => {
        if (!uid) return

        try {
            const res = await axios.get(`https://e-comm-project-jt4w.onrender.com/api/usercart/${uid}`)
            setCart(res.data?.products || [])
        } catch (err) {
            console.log(err)
            setCart([])
        }
    }

    useEffect(() => {
        fetchCart()
    }, [uid])

    async function updateQty(id, action) {
        try {
            await axios.put("https://e-comm-project-jt4w.onrender.com/api/usercart", {
                userId: uid,
                productId: id,
                action
            })

            fetchCart()
        } catch (err) {
            console.log(err)
        }
    }

    const totalQty = cart.reduce(
        (acc, item) => acc + item.quantity, 0
    )

    const totalAmount = cart.reduce(
        (acc, item) => acc + item.quantity * item.productId.price, 0
    )

    return (
        <section className="cart-section mb-10">
            <h1 className="w-full text-center text-2xl font-bold bg-white py-3">Your cart page</h1>
            <div className="cart-cards flex flex-col gap-2 bg-white rounded-2xl p-2 mt-10 mx-10 h-fit">

                {
                    cart.length == 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <h1 className="text-2xl font-bold mb-4">
                                Your Cart is Empty 🛒
                            </h1>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-prime text-white py-2 px-4 rounded-lg w-fit hover:cursor-pointer hover:bg-ternay hover:text-prime"              >
                                Continue Shopping
                            </button>
                        </div>) : (


                        cart.map((item) => (<div key={item.productId._id}>
                            <div className="cart-card flex justify-between border-b-2 border-black px-10 py-2">
                                <div className="card-left flex gap-3">

                                    <img className="w-20 rounded-lg" src={`http://localhost:3000${item.productId.images[0]}`} alt={item.productId.name} />
                                    <div className="img-details flex flex-col gap-0">
                                        <h2 className="font-bold text-2xl">{item.productId.name}</h2>
                                        <p className="arial font-md text-md text-gray-700 -mt-1">{item.productId.description}</p>

                                        <p className="arial font-bold text-lg text-gray-700 -mt-1">Price: {item.productId.price}</p>

                                    </div>
                                </div>
                                <div className="card-right flex items-end">

                                    <div className="qty-btn arial flex justify-center items-center gap-2 w-fit h-fit py-2 px-4 bg-gray-400 rounded-full">
                                        <button className="font-bold text-xl hover:cursor-pointer" onClick={() => updateQty(item.productId._id, "dec")}>-</button>
                                        <p className="font-bold text-xl">{item.quantity}</p>
                                        <button className="font-bold text-xl hover:cursor-pointer" onClick={() => updateQty(item.productId._id, "inc")}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )

                        ))}
            </div>

            <div className="bg-white rounded-xl p-4 mt-6 mx-10 shadow-md">
                <h2 className="text-xl font-bold mb-3">Cart Summary</h2>

                <div className="flex justify-between mb-2">
                    <span>Total Quantity:</span>
                    <span>{totalQty}</span>
                </div>

                <div className="flex justify-between mb-4">
                    <span>Total Amount:</span>
                    <span>₹ {totalAmount}</span>
                </div>

                <button
                    className="btn"
                    onClick={() => navigate("/checkout")}
                >
                    Pay Now
                </button>
            </div>
        </section>
    )
}
export default Cart
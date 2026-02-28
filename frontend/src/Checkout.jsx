import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Checkout = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: ""
  })

  const uid = useSelector((state) => state.userID.uid)
  const navigate = useNavigate()

  // 🔥 Fetch Cart
  const fetchCart = async () => {
    if (!uid) return

    try {
      const res = await axios.get(`http://localhost:3000/api/usercart/${uid}`)
      setCart(res.data?.products || [])
      setLoading(false)
    } catch (err) {
      console.log(err)
      setCart([])
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [uid])

  // Calculate totals
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0)

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0
  )

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 🔥 Place Order
  const handleCheckout = async () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill all details")
      return
    }

    try {
      await axios.post("http://localhost:3000/api/order", {
        userId: uid,
        customerInfo: formData,
        products: cart,
        totalAmount
      })

      alert("Order placed successfully 🎉")

      navigate("/")
    } catch (err) {
      console.log(err)
      alert("Something went wrong")
    }
  }

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Checkout Page
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT SIDE - FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg mb-4"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            className="w-full border p-3 rounded-lg mb-4"
            rows="4"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="max-h-60 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.productId._id}
                className="flex justify-between border-b py-2"
              >
                <div>
                  <p className="font-medium">
                    {item.productId.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p>
                  ₹ {item.quantity * item.productId.price}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Total Quantity</span>
              <span>{totalQty}</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>₹ {totalAmount}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  )
}

export default Checkout
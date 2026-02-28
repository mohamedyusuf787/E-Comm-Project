import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import heroimage from "./assets/ph-landingpage-2.png"


const Product = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const uid = useSelector((state) => state.userID.uid)

    useEffect(() => {
        axios.get("http://localhost:3000/api/products")
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log("error in product get process", err)
            })
    }, [])

    const handleCart = async (id) => {
        if (!uid) {
            alert("Please login first")
            return
        }
        try {
            const res = await axios.post("http://localhost:3000/api/usercart",
                {
                    userId: uid,
                    productId: id,
                    quantity: 1
                }
            )

            console.log(res.data)
            console.log("ADD userId:", uid)

        } catch (err) {
            console.log("not login",err.message)
        }
    }

    function handleViewproduct(id) {
        navigate(`/productdetail/${id}`)  //this ${id} used for to share the value to another page of frontend, if u going to share the backend means u need to share like object
    }


    return (
        <>
            <div className="hero-section relative border border-red-600 h-full">
                <img className='w-full md:hidden' src={heroimage} alt="heroimage" />
                <img className='hidden md:flex' src={heroimage} alt="desktopimage" />
                <div className="hero-content absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] text-white text-center md:text-left md:left-70 md:-translate-y-1/3 md:w-[40%] lg:border lg:border-red-700 lg:left-100 lg:w-[30%]">
                    <h1 className='font-bold text-3xl  lg:text-5xl'> Shop Smarter. Live Better.</h1>
                    <p className='text-gray-300 lg:text-xl'> Discover premium products at unbeatable prices — delivered fast to your doorstep.</p>
                    <button className='btn'>Shop Now</button>
                </div>
            </div>

            {/* product section  */}
            <section className="mt-20 flex flex-col gap-8">
                <h2 className="text-2xl font-bold">Search Our Products</h2>
                <input className="bg-white px-2 py-1 -mt-6 w-64 rounded-lg " type="text" placeholder="Search products eg: beauties,electronics" />


                <div className="categories-cards w-full flex-wrap flex gap-2 justify-center">
                    {
                        products.map((product, index) => (
                            <div key={index} className="categories-card flex flex-col gap-2 items-center justify-center">
                                <div className="flex justify-center card-img w-50 h-50 overflow-hidden rounded-xl md:w-70 md:h-70 border border-red-500">
                                    <img src={`http://localhost:3000${product.images[0]}`} alt={product.name} />    {/*you do not put "/" after 3000.*/}
                                </div >
                                <div className="card-deti flex flex-col justify-start">
                                    <h2 className="text-2xl">{product.name}</h2>
                                    <p className="-mt-2 text-gray-600">{product.description}</p>
                                    <h3 className="font-bold text-2xl">${product.price}.00</h3>
                                </div>
                                <div className="card-btn flex flex-col gap-2 w-full">
                                    <button onClick={() => handleCart(product._id)} className="btn">Add to Cart</button>
                                    <button onClick={() => handleViewproduct(product._id)} className="btn">View Details</button>
                                </div>
                            </div >
                        )
                        )
                    }
                </div >
            </section >

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
      className="w-full bg-black text-white py-2 rounded-lg"
      onClick={() => navigate("/checkout")}
   >
      Pay Now
   </button>
</div>
        </>
    )
}
export default Product
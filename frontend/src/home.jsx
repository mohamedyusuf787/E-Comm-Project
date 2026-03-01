import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import Contactus from './components/contactus'
import Footer from "./components/footer"
import heroimage from "./assets/ph-landingpage-1.png"
import dHeroimage from "./assets/landingpage -1.png"
import watch1 from "./assets/watch-1.png"
import shirt1 from "./assets/shirt-1.png"
import laptop1 from "./assets/laptop-1.png"
import makeup1 from "./assets/makeup-1.png"
import model from "./assets/model-1.png"

const home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([{}])

  useEffect(() => {
    axios.get("https://e-comm-project-jt4w.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data)
        // console.log("products", res.data)
        // console.log("products", res.json)

      })
      .catch((err) => {
        console.log("error in product get process", err)
      })
  }, [navigate])


  function handleShopnow() {
    navigate("/product")
  }

  function featuredProduct(id) {
    navigate(`/productdetail/${id}`)
    console.log("clicked")
  }

  return (
    <>
      <div className="hero-section relative h-full">
        <img className='w-full md:hidden' src={heroimage} alt="heroimage" />
        <img className='hidden md:flex' src={dHeroimage} alt="desktopimage" />
        <div className="hero-content flex flex-col items-center absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] text-white text-center md:text-left md:left-70 md:-translate-y-1/3 md:w-[40%] lg:left-100 lg:w-[30%]">
          <h1 className='font-bold text-3xl  lg:text-5xl'> Shop Smarter. Live Better.</h1>
          <p className='text-gray-300 lg:text-xl'> Discover premium products at unbeatable prices — delivered fast to your doorstep.</p>
          <button onClick={handleShopnow} className='bg-white font-bold text-prime  px-20 py-2 text-nowrap rounded-lg hover:cursor-pointer'>Shop Now</button>
        </div>
      </div>

      {/* featured categories */}
        <h1 className='text-black font-bold text-2xl text-center mt-10 md:text-4xl'>Featured Categories</h1>

      <section className='featured categries mt-8 flex flex-col justify-center items-center gap-4 md:text-center md:flex-row'>
        {
          products.filter((product) => product.isFeatured === true)
            .map((product) => (
              <div onClick={() => featuredProduct(product._id)} className="categories-card flex flex-col gap-2 items-center justify-center bg-white w-fit py-2 px-2 rounded-xl hover:cursor-pointer drop-shadow-lg">
                <img className=' hover:scale-105  transition duration-200 ease-in-out' src={`https://e-comm-project-jt4w.onrender.com${product.images[0]}`} alt={product.name} />
                <h1 key={product._id} className='text-xl font-bold'>{product.name}</h1>
              </div>
            ))
        }
      </section>


      {/* limited section */}
      <section className='limited flex flex-col justify-center items-center text-center gap-4 w-full h-50 bg-[linear-gradient(to_bottom_right,#32213A,#5C3D67,#E2D7E9)] mt-20 md:flex-row md:text-left md:justify-between md:pl-10 py-20'>
        <div className="limited-left">
          <div className="limited-content">
            <h1 className='text-white font-bold text-2xl md:text-4xl'>Limited Time Offer</h1>
            <p className='text-gray-300 md:text-xl'> Up to 40% OFF on Electronics Shop before the deal ends!</p>
          </div>
          <button onClick={handleShopnow} className='bg-prime text-white rounded-md px-8 py-4 w-[60%] md:mt-4 hover:cursor-pointer hover:bg-ternay hover:text-prime'>Grab the deal</button>
        </div>
        <div className="limited-right">
          <img className='hidden md:flex w-90 bottom-6 mb-9' src={model} alt="model" />
        </div>
      </section>

      {/* contactus section */}
      <Contactus />

      {/* footer section */}
      <Footer />

    </>
  )
}

export default home
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import heroimage from "./assets/ph-landingpage-2.png"
import DheroImage from "./assets/landingpage-2.png"
import Footer from "./components/footer"

const Product = () => {
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const navigate = useNavigate()
    const uid = useSelector((state) => state.userID.uid)

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(
            (product) => product.category === selectedCategory
        )

    useEffect(() => {
        axios.get("https://e-comm-project-jt4w.onrender.com/api/products")
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
            const res = await axios.post("https://e-comm-project-jt4w.onrender.com/api/usercart",
                {
                    userId: uid,
                    productId: id,
                    quantity: 1
                }
            )

            console.log(res.data)
            console.log("ADD userId:", uid)

        } catch (err) {
            console.log("not login", err.message)
        }
    }

    function handleViewproduct(id) {
        navigate(`/productdetail/${id}`)  //this ${id} used for to share the value to another page of frontend, if u going to share the backend means u need to share like object
    }


    return (
        <>
            <div className="hero-section relative h-full">
                <img className='w-full md:hidden' src={heroimage} alt="heroimage" />
                <img className='hidden md:flex' src={DheroImage} alt="desktopimage" />
                <div className="hero-content absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] text-white text-center md:text-left md:left-70 md:-translate-y-1/3 md:w-[40%] lg:left-100 lg:w-[30%]">
                    <h1 className='font-bold text-3xl  lg:text-5xl'> Shop Smarter. Live Better.</h1>
                    <p className='text-gray-300 lg:text-xl'> Discover premium products at unbeatable prices — delivered fast to your doorstep.</p>
                    <button className='btn'>Shop Now</button>
                </div>
            </div>

            {/* product section  */}
            <section className="mt-20 flex flex-col gap-8">
                <div className="search-section flex flex-col items-center gap-2">
                <h2 className="text-2xl font-bold">Search Our Products</h2>
               
                <div className="flex gap-4 justify-center mb-6 flex-wrap">
                    <button onClick={() => setSelectedCategory("all")}
                        className={`px-4 py-2 rounded-lg hover:rounded-full drop-shadow-lg ease-linear ${selectedCategory === "all"
                                ? "bg-prime text-white"
                                : "bg-gray-200"
                            }`}

                    >All
                    </button>

                    <button onClick={() => setSelectedCategory("shirts")}
                        className={`px-4 py-2  rounded-lg hover:rounded-full drop-shadow-lg ease-linear ${selectedCategory === "shirts"
                                ? "bg-prime text-white"
                                : "bg-gray-200"
                            }`}

                    >Shirts
                    </button>

                    <button onClick={() => setSelectedCategory("watch")}
                        className={`px-4 py-2  rounded-lg hover:rounded-full drop-shadow-lg ease-linear ${selectedCategory === "watch"
                                ? "bg-prime text-white"
                                : "bg-gray-200"
                            }`}

                    >watches
                    </button>

                    <button onClick={() => setSelectedCategory("accessories")}
                        className={`px-4 py-2  rounded-lg hover:rounded-full drop-shadow-lg ease-linear ${selectedCategory === "accessories"
                                ? "bg-prime text-white"
                                : "bg-gray-200"
                            }`}

                    >Accessories
                    </button>
                    <button onClick={() => setSelectedCategory("beauties")}
                        className={`px-4 py-2  rounded-lg hover:rounded-full drop-shadow-lg ease-linear ${selectedCategory === "beauties"
                                ? "bg-prime text-white"
                                : "bg-gray-200"
                            }`}

                    >Womens
                    </button>
                </div>
                </div>

                <div className="categories-cards w-full flex-wrap flex gap-2 justify-center">
                    {
                        filteredProducts.map((product, index) => (
                            <div key={index} className="categories-card flex flex-col gap-2 items-center justify-center">
                                <div className="flex justify-center card-img w-50 h-50 overflow-hidden rounded-xl md:w-70 md:h-70">
                                    <img className="hover:scale-105  transition duration-200 ease-in-out" src={`http://localhost:3000${product.images[0]}`} alt={product.name} />    {/*you do not put "/" after 3000.*/}
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
<Footer/>

            </section >

        </>
    )
}
export default Product
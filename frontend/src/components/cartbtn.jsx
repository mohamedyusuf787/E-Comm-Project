import { FaShoppingCart } from 'react-icons/fa'; // or FaCartShopping in newer versions
import { useNavigate } from "react-router-dom"

const Cartbtn = () => {

    const navigate = useNavigate()

    function handleCart() {
        navigate("/cart")
    }

    return (
        <>
            <div onClick={handleCart} className='fixed bottom-15 right-4 hover:cursor-pointer z-10'>
                <div className="icon relative  font-bold text-white border-2 border-white text-2xl bg-prime rounded-full p-6 w-fit">
                    <FaShoppingCart className='absolute text-white top-1/2 -translate-y-1/2 -translate-x-1/2' />
                </div>
            </div>
        </>
    )
}

export default Cartbtn
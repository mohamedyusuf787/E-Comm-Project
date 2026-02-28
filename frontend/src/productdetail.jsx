import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams();   // get id from URL
    const [product, setProduct] = useState(null);
    const uid = useSelector((state) => state.userID.uid)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://e-comm-project-jt4w.onrender.com/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log("Error fetching product:", err);
            });
    }, [id]);


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

    const handleBuyNow = () => {
  const tempCart = [
    {
      productId: product,
      quantity: 1
    }
  ];
  navigate("/checkout", {
    state: { cart: tempCart }
  });
};



    if (!product) return <h2>Loading...</h2>;

    return (
        <>
            <h1 className="w-full text-center text-2xl font-bold bg-white py-3">Product details</h1>

            <div className="cards flex justify-center flex-wrap gap-2 mx-4 my-10 md:mx-10 lg:mx-80">

                <div className="card bg-white flex flex-col gap-2 w-full rounded-2xl m-2 p-2">
                    <div className="card-top flex gap-2">
                        <img src={`https://e-comm-project-jt4w.onrender.com${product.images[0]}`}
                            alt={product.name}
                            width="180" />
                        <div className="card-content">
                            <h1 className="text-black text-2xl font-bold">{product.name}</h1>
                            <p>{product.description}</p>
                            <h3>Price: <b className="text-xl">{product.price}</b></h3>
                        </div>
                    </div>

                    <div className="card-botton">
                        <div className="card-btn flex gap-2 text-center">
                            <button onClick={() => handleCart(product._id)} className="btn">Add to Cart</button>
                            <buttton onClick={handleBuyNow} className="btn">Buy now</buttton>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ProductDetail;
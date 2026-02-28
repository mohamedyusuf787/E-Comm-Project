import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams();   // get id from URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
      axios.get(`http://localhost:3000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log("Error fetching product:", err);
            });
    }, [id]);

    

    if (!product) return <h2>Loading...</h2>;

    return (
        <>
        <h1 className="w-full text-center text-2xl font-bold bg-white py-3">Product details</h1>

        <div className="cards flex justify-center flex-wrap gap-2 mx-4 my-10 md:mx-10 lg:mx-80">

            <div className="card bg-white flex flex-col gap-2 w-full rounded-2xl m-2 p-2">
                <div className="card-top flex gap-2">
                    <img src={`http://localhost:3000${product.images[0]}`}
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
                        <button className="btn">Add to Cart</button>
                        <buttton className="btn">Buy now</buttton>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default ProductDetail;
import axios from "axios"

const Admin=()=>{

    function addProduct(){
        axios.post("http://localhost:3000/products")
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log("error while connect with products",err)
        })
    }
    return(
        <>
        <form onSubmit={addProduct}>
            <input type="text" placeholder="enter product name" />
            <input type="text" placeholder="enter product description" />
            <input type="number" placeholder="enter product price" />
            <input type="file" />
            <button type="submit">Add Product</button>

        </form>
        </>
    )
}

export default Admin
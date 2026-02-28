// this 2 lines for .env file
const dotenv = require("dotenv")
dotenv.config()
const nodemon = require("nodemon")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const productRoutes = require("./routes/productRoutes")
const product = require("./models/product")
const userModel = require("./models/user")
const cartModel = require("./models/cartmodel")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extends: true }))
app.use("/uploads", express.static("uploads"))
app.use("/api/products", productRoutes)


// connect with .env file which has key
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("connected atlas")
    })
    .catch((err) => {
        console.log("error with atlas", err)
    })

// this route for product for demo only
// app.post("/products", (req, res) => {
//     res.send("product added")
// })

// this route for to show the full products from db
app.get("/api/products", async (req, res) => {
    const products = await product.find()
    res.json(products)
})

// this route is for if user select any product that product id will pass into this,so we share the product detail of selected product
app.get("/api/products/:id", async (req, res) => {   //:id means - Something dynamic will come here and In frontend we send id dynamically as ${id}.
    try {
        const id = req.params.id
        const productdetail = await product.findById(id)

        if (!productdetail) {
            return res.status(404).json({ message: "product not found" })
        }
        res.json(productdetail) // this is the main thing to send data to frontend
    }
    catch (error) {
        res.status(500).json({ message: "server error" })
    }
})

// this route for to store the users id in db, after user login
app.post("/api/user", async (req, res) => {
    try {
        const { userId, userEmail } = req.body;

        const userExist = await userModel.findOne({ userId: userId });

        if (!userExist) {
            // 2. Correct creation method
            await userModel.create({
                userId: userId,
                email: userEmail
            });
            return res.status(201).json({ message: "UserID stored in DB successfully" });
        }

        // User already exists
        return res.status(200).json({ message: "User already exists" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// this route is mainly to store the products for the users.
app.post("/api/usercart", async (req, res) => {
    try {
        const { userId, productId } = req.body

        let cart = await cartModel.findOne({ userId })

        if (!cart) {
            cart = await cartModel.create({
                userId,
                products: [{ productId, quantity: 1 }]
            })
        } else {
            const productIndex = cart.products.findIndex(
                (item) => item.productId.toString() === productId
            )

            if (productIndex > -1) {
                cart.products[productIndex].quantity += 1
            } else {
                cart.products.push({ productId, quantity: 1 })
            }

            await cart.save()
        }

        res.status(200).json({ message: "Cart updated", cart })

    } catch (error) {
        console.log(error) // 👈 ADD THIS
        res.status(500).json({ message: "Server error" })
    }
})

// app.put("/api/usercart", async (req, res) => {
//     try {
//         const { userId, productId, action } = req.body

//         const cart = await cartModel.findOne({ userId })

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" })
//         }

//         const productIndex = cart.products.findIndex(
//             (item) => item.productId === productId
//         )

//         if (productIndex === -1) {
//             return res.status(404).json({ message: "Product not found in cart" })
//         }

//         if (action === "inc") {
//             cart.products[productIndex].quantity += 1
//         }

//         if (action === "dec") {
//             cart.products[productIndex].quantity -= 1

//             // If quantity becomes 0 → remove item
//             if (cart.products[productIndex].quantity <= 0) {
//                 cart.products.splice(productIndex, 1)
//             }
//         }

//         await cart.save()

//         res.status(200).json({ message: "Quantity updated", cart })

//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// })

app.put("/api/usercart", async (req, res) => {
  try {
    const { userId, productId, action } = req.body

    const cart = await cartModel.findOne({ userId })

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    )

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" })
    }

    if (action === "inc") {
      cart.products[productIndex].quantity += 1
    }

    if (action === "dec") {
      cart.products[productIndex].quantity -= 1

      // remove if quantity becomes 0
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1)
      }
    }

    await cart.save()

    res.status(200).json({ message: "Cart updated" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})


app.get("/api/usercart/:userId", async (req, res) => {
    try {
        const { userId } = req.params

        const cart = await cartModel
            .findOne({ userId })
            .populate("products.productId")  // 🔥 IMPORTANT

        if (!cart) {
            return res.status(200).json({ products: [] })
        }

        res.status(200).json(cart)
        console.log("CART FROM DB:", cart)
    } catch (error) {
   console.log("GET ERROR:", error)   // 👈 MUST LOG
        res.status(500).json({ message: "Server error" })
    }
})

app.post("/api/order", async (req, res) => {
  try {
    const { userId, customerInfo, products, totalAmount } = req.body

    console.log("ORDER RECEIVED:", req.body)

    // Optional: Save to Order collection

    // Clear cart after order
    await cartModel.findOneAndUpdate(
      { userId },
      { products: [] }
    )

    res.status(200).json({ message: "Order placed" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
})

// study this 
// req.body
// It gets data from request body.
// That means:
// Data sent from frontend form
// POST request
// PUT request
// JSON data
// form-data (multer)

// req.param in backend means we try to get the data comes from frontend URL


app.get("/", (req, res) => {
    app.response("hi there it work")
})


app.listen(process.env.PORT ||3000, () => {
    console.log("server running")
})

app.get("/test", (req, res) => {
  res.json({ status: "OK" });
});
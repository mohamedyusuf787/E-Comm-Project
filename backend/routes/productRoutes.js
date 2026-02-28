const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const { createProduct } = require("../controllers/productcontroller");

router.post("/", upload.single("image"), createProduct);

module.exports = router;
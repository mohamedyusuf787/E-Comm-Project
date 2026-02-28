const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId:
        { type: String, required: true, unique: true },

    name: {
        type: String
    },
    email: {
        type: String
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)
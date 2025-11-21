// Initialize mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    productName: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true,
    },
})

// Creating the model for the product schema
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
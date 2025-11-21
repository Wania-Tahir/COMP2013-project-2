// Initiate the server and connect to the database
const express = require("express");
const server = express(); 
const port = 3000; 
const mongoose = require("mongoose");
const cors = require("cors"); 
require("dotenv").config(); 
const { DB_URI } = process.env;
const Product = require("./models/products");


//Middleware
server.use(express.json()); 
server.use(express.urlencoded({ extended: true })); 
server.use(cors()); 

// Connect to the database
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });


// Routes
server.get("/", (request, response) => {
  response.send("Live");
});


server.get("/products", async (request, response) => {
    try{
        const products = await Product.find(); 
        response.send(products);

    } catch(error) {
        response.status(500).json({message: error.message});
    }
})

server.post("/products", async (request, response) => {
  const {productName, brand, image, price} = request.body;
  const newProduct = new Product({
    productName,
    brand,
    image,
    price
  });
  try {
    await newProduct.save();
    response.send({message: `${productName} has been added`})

  } catch(error) {
    response.status(400).send({message: error.message});
  }
})
server.delete("/products/:id", async (request, response) => {
  const {id} = request.params;
  try{
    await Product.findByIdAndDelete(id);
    response.send({message: `Product with ID ${id} has been deleted`})
  } catch(error) {
    response.status(400).send({message: `ID issue?`});
  }
})

server.get("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const productToEdit = await Product.findById(id);
    response.send(productToEdit);
  } catch(error) {
    response.status(400).send({message: error.message});
  }
})

server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const {productName, brand, image, price} = request.body;
  await Product.findByIdAndUpdate(id, {
    productName,
    brand,
    image,
    price,
  })
  response.send({message: `${productName} has been updated!`})

  try{

  } catch(error) {
    response.status(400).send(error.message);
  }
})
//Backend Imports
import axios from "axios";
import { useEffect, useState } from "react";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import ProductForm from "./ProductsForm";

export default function GroceriesAppContainer() {
  //States
  //Import products state
  const [productsData, setProductsData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);

//State for form
  const [formData, setFormData] = useState({
    _id: "",
    productName: "",
    brand: "",
    image: "",
    price: "",
  });

  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);

//useEffect (importing data)
  useEffect(() => {
    handleProductsDB();
  }, [postResponse]);

// Handlers
  //Handling retrieving the data from the database
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const productsWithConsistentId = response.data.map(product => ({
        ...product,
        id: product._id 
      }));
      
      setProductsData(productsWithConsistentId); 

      const quantities = response.data.map((product) => {
        return { id: product._id, quantity: 0 };
      });
      setProductQuantity(quantities);
    } catch (error) {
      console.log(error.message);
    }
  };
// Handling form data
  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

// Handling form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSend = { ...formData };
    if (!isEditing && dataToSend._id) {
        delete dataToSend._id;
    }
    
    try {
      if (isEditing) {
        await axios.patch(
          `http://localhost:3000/products/${formData._id}`,
          dataToSend
        );
        setPostResponse("Updated Successfully");
        setIsEditing(false);
      } else {
        await axios.post("http://localhost:3000/products", dataToSend);
        setPostResponse("Added Successfully");
      }

      setFormData({
        _id: "",
        productName: "",
        brand: "",
        image: "",
        price: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

 // Handling edit product
  const handleEdit = async (product) => {
    setIsEditing(true);
    setFormData({
      _id: product._id,
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
    });
    
};

// Handling delete product from the database by id
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setPostResponse("Deleted Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product._id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
    } else {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product._id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
    } else {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
    }
  };


//Cart Handlers
  const handleAddToCart = (productId) => {
    const product = productsData.find((product) => product._id === productId);
    const pQuantity = productQuantity.find(
      (product) => product.id === productId
    );
    const newCartList = [...cartList];
    const productInCart = newCartList.find(
      (product) => product._id === productId
    );

    if (!pQuantity || pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
    } else if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }
    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter(
      (product) => product._id !== productId
    );
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  return (
    <div className="groceries app">
      <h1>Groceries</h1>

      <ProductForm
        formData={formData}
        handleOnChange={handleOnchange}
        handleOnSubmit={handleOnSubmit}
        isEditing={isEditing}
      />

      <p style={{ color: "green" }}>{postResponse}</p>

      <div className="GroceriesApp-Container">
        <ProductsContainer
          products={productsData}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          productQuantity={productQuantity}
          handleOnEdit={handleEdit}
          handleOnDelete={handleDelete}
        />

        <CartContainer
          cartList={cartList}
          handleRemoveFromCart={handleRemoveFromCart}
          handleAddQuantity={handleAddQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleClearCart={handleClearCart}
        />
      </div>
    </div>
  );
}
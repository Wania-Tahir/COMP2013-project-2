
export default function ProductsForm({ 
     isEditing,
     formData, 
     handleOnChange, 
     handleOnSubmit,
     }) {
    
    return (
        <div className="">
         <form onSubmit={handleOnSubmit} className="product-form">
             <div>
             <input
                 type="text"
                name="productName"
                value={formData.productName}
                onChange={handleOnChange}
                placeholder="Name"
             />   
        </div>
            <div>
             <input
              type="text"
            name="brand"
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
            />   
         </div>
            <div>
             <input
              type="text"
            name="image"
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
             />  
        </div>
           <div>
            <input
             type="number"
           name="price"
           step="0.01"
           value={formData.price}
           onChange={handleOnChange}
           placeholder="Price"
            />    
         </div>

                <button type="submit">{isEditing ? "Update Product" : "Add Product"}</button>
            </form>
        </div>
    );
}
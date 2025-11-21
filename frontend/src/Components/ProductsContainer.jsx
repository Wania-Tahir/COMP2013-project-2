import ProductCard from "./ProductCard";

export default function ProductsContainer({
  products,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  productQuantity,
  handleOnEdit,
  handleOnDelete,
}) {
  return (
    <div className="ProductsContainer">
      {products.map((product) => {
        //to see the current quantity of a product in the cart
        const quantityObject = productQuantity.find((q) => q.id === product.id);
        const qty = quantityObject ? quantityObject.quantity : 0;

        return (
          <ProductCard
            key={product.id}
            {...product}
            id={product.id}
            _id={product._id}
            productQuantity={qty}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleOnEdit={handleOnEdit}
            handleOnDelete={handleOnDelete}
          />
        );
      })}
    </div>
  );
}

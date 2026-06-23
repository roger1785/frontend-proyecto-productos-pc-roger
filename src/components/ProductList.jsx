import ProductCard from "./ProductCard";

function ProductList({ products, isAdmin, onEditProduct, onDeleteProduct }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isAdmin={isAdmin}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;

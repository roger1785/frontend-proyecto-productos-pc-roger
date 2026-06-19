import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img src={product.image} alt={product.name} />
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <span>{product.stock} in stock</span>
      </div>
    </article>
  );
}

export default ProductCard;

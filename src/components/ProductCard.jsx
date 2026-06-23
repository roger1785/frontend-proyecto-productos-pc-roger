import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product, isAdmin, onEdit, onDelete }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <img src={product.image} alt={product.name} />
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <span>{product.stock} en stock</span>
        <button
          type="button"
          className="product-card-cart-button"
          title="Añadir al carrito"
          onClick={(event) => {
            event.stopPropagation();
            addToCart(product);
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span>Añadir</span>
        </button>
      </div>

      {isAdmin && (
        <div className="product-card-admin-actions">
          <button
            type="button"
            className="button small"
            onClick={(event) => {
              event.stopPropagation();
              onEdit(product);
            }}
          >
            Editar
          </button>
          <button
            type="button"
            className="button small danger"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(product);
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </article>
  );
}

export default ProductCard;

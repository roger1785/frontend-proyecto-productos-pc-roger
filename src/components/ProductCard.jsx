import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import cartIcon from "../assets/orange-shopping-cart-10907.svg";

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
          <img
            src={cartIcon}
            alt=""
            className="product-card-cart-icon"
            width="18"
            height="18"
            aria-hidden="true"
          />
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

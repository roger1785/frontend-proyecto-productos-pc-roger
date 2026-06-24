import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";
import cartIcon from "../assets/cart-icon.svg";

function Cart() {
  const { cart } = useCart();

  return (
    <Link to="/cart" className="cart-icon" title="Carrito de compra">
      <img src={cartIcon} alt="Carrito" className="cart-icon-image" />
      {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
    </Link>
  );
}

export default Cart;

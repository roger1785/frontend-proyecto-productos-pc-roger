import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();

  if (cart.length === 0) {
    return (
      <main>
        <section className="cart-section">
          <div className="container">
            <h1>Carrito de compra</h1>
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <Link to="/products" className="button">
                Continuar comprando
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="cart-section">
        <div className="container">
          <h1>Carrito de compra</h1>

          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value) || 1)
                      }
                      min="1"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Resumen del pedido</h2>
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-checkout">Proceder al pago</button>
              <button className="btn-continue" onClick={clearCart}>
                Vaciar carrito
              </button>
              <Link to="/products" className="btn-continue">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CartPage;

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import cartIcon from "../assets/orange-shopping-cart-10907.svg";

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="empty-message">Cargando producto</p>;
  }

  if (error || !product) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <h1>{error || "Contenido no encontrado"}</h1>

            <Link className="button" to="/products">
              Volver al catalogo
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <article className="product-detail">
            <img src={product.image} alt={product.name} />

            <div className="product-detail-content">
              <h1>{product.name}</h1>

              <p className="product-detail-description">
                {product?.description}
              </p>
              <p>Precio: ${product.price.toFixed(2)}</p>
              <span>Stock: {product.stock}</span>
              <button
                type="button"
                className="product-card-cart-button"
                title="Añadir al carrito"
                onClick={() => addToCart(product)}
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
          </article>

          <Link className="button" to="/products">
            Volver al catalogo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetailPage;

import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const featuredProducts = products.filter((product) => product.featured);
  const newProducts = products.slice(0, 3); // 3 primeros

  if (loading) {
    return <p className="empty-message">Cargando productos...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="hero-label">Proyecto final</span>
          <h1>Catálogo de Productos</h1>
          <p>
            Explora productos, consulta sus detalles y administra el
            contenido desde un panel privado.
          </p>

          <Link className="button" to="/products">
            Ver catálogo
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Contenido destacado</h2>

          <ProductList products={featuredProducts} />
        </div>
      </section>

      <ProductCarousel products={products} />

      <section className="new-products-section">
        <div className="container">
          <h2>Nuevos productos</h2>

          <ProductList products={newProducts} />
        </div>
      </section>
    </main>
  );
}

export default Home;

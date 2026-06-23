import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

function PromotionsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        // Filtrar productos con descuento o promoción
        const promotionalProducts = Array.isArray(data)
          ? data.filter((p) => p.discount || p.promotion)
          : [];

        // Si no hay productos con promoción, mostrar una selección aleatoria
        if (promotionalProducts.length === 0) {
          const allProducts = Array.isArray(data) ? data.slice(0, 6) : [];
          setProducts(allProducts);
        } else {
          setProducts(promotionalProducts);
        }
      } catch {
        setError("No se pudieron cargar los productos en promoción");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return <p className="empty-message">Cargando promociones...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <div className="section-header">
            <h2>Promociones</h2>
            <p>Descubre nuestras mejores promociones del momento.</p>
          </div>

          {products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <p className="empty-message">
              No hay productos en promoción en este momento.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default PromotionsPage;

import ProductList from "../components/ProductList";
import ProductCarousel from "../components/ProductCarousel";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { useCategory } from "../context/CategoryContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setSelectedCategory, categories } = useCategory();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts(1, 100);
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const featuredProductsRaw = Array.isArray(products)
    ? products.filter((product) => product.featured)
    : [];

  const featuredProducts =
    featuredProductsRaw.length > 0 ? featuredProductsRaw : products.slice(0, 6);

  const featuredCategories = categories.map((category, index) => ({
    ...category,
    id: category._id ?? category.id ?? `${category.name}-${index}`,
    image:
      category.image || `https://picsum.photos/320/320?random=${index + 10}`,
  }));

  const features = [
    {
      title: "Envíos 24h",
      description: "Recibe tu pedido en 24-48 horas en península.",
    },
    {
      title: "Comercio de proximidad",
      description: "Compra online y recoge en tienda local sin esperas.",
    },
    {
      title: "Pedidos para empresas",
      description: "Atención B2B y factura comercial para compras grandes.",
    },
  ];

  if (loading) {
    return <p className="empty-message">Cargando productos...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <main>
      <section className="home-hero-banner">
        <div className="home-hero-overlay" />
        <div className="container home-hero-content">
          <div className="home-hero-copy">
            <span className="hero-label">Tienda informática online</span>
            <h1>Out of office</h1>
            <p>
              Ofertas que se vienen de vacaciones. Estrena portátil, accesorios
              y componentes con envío rápido.
            </p>
            <Link className="button button-primary" to="/products">
              Descubrir
            </Link>
          </div>
          <div className="home-hero-badge">
            <Link className="button" to="/offers">
              Oferta especial
            </Link>
            <p>Los mejores precios para gaming.</p>
          </div>
        </div>
      </section>

      <section className="home-categories-section">
        <div className="container">
          <div className="section-header">
            <h2>CATEGORÍAS DESTACADAS</h2>
          </div>

          <div className="categories-grid">
            {featuredCategories.map((category) => (
              <article
                className="category-card"
                key={category.id}
                onClick={() => {
                  const categoryId = String(category._id ?? category.id);
                  setSelectedCategory(categoryId);
                  navigate(
                    `/products?category=${encodeURIComponent(categoryId)}`,
                  );
                }}
              >
                <img src={category.image} alt={category.name} />
                <div className="category-card-body">
                  <strong>{category.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProductCarousel products={products} />

      <section className="home-features-section">
        <div className="container features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2>PRODUCTOS DESTACADOS</h2>
          </div>

          <div className="featured-products-grid">
            <ProductList products={featuredProducts} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductFilters from "../components/ProductFilters";
import useFilteredSortedProducts from "../hooks/useFilteredSortedProducts";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("Todos");
  const [sortBy, setSortBy] = useState("default");

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

  const { sortedProducts } = useFilteredSortedProducts(
    products,
    search,
    selectedPrice,
    sortBy,
  );

  const hasResults = sortedProducts.length > 0;

  const prices = ["Todos", ...new Set(products.map((product) => product.price))];

  if (loading) {
    return <p className="empty-message">Cargando productos...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <div className="section-header">
            <h2>Explorar catálogo</h2>
            <p>Busca productos por nombre, precio y categoría.</p>
          </div>

          <ProductFilters
            search={search}
            selectedPrice={selectedPrice}
            sortBy={sortBy}
            prices={prices}
            onSearchChange={setSearch}
            onPriceChange={setSelectedPrice}
            onSortChange={setSortBy}
          />

          {hasResults ? (
            <ProductList products={sortedProducts} />
          ) : (
            <p className="empty-message">
              No encontramos resultados para la búsqueda
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default ProductsPage;

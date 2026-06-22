import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductFilters from "../components/ProductFilters";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const field =
          sortBy === "expensive" || sortBy === "cheapest" ? "price" : "name";
        const order = sortBy === "az" || sortBy === "cheapest" ? "asc" : "desc";

        // console.log(search, field, order, selectedPrice);

        const data = await getProducts(1, 4, search, field, order, selectedPrice);

        // console.log("Productos cargados:", data);

        setProducts(data);
      } catch {
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [search, selectedPrice, sortBy]);


  const hasResults = products.length > 0;

  const priceRanges = ["Todos", ...new Set(products.map((product) => product.price))];

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
            <p>Busca productos por nombre y descripción.</p>
          </div>

          <ProductFilters
            search={search}
            selectedPrice={selectedPrice}
            sortBy={sortBy}
            priceRanges={priceRanges}
            onSearchChange={setSearch}
            onPriceChange={setSelectedPrice}
            onSortChange={setSortBy}
          />

          {hasResults ? (
            <ProductList products={products} />
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
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function SearchBox() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const term = search.trim();

    if (!term) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);
        const data = await getProducts(1, 6, term, "name", "asc", "", "");
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="search-box">
      <input
        className="search-box-input"
        type="search"
        placeholder="Buscar por nombre o descripción..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search.trim() !== "" && (
        <div className="search-box-results">
          {isLoading ? (
            <p className="search-box-empty">Buscando...</p>
          ) : results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product._id}
                onClick={() => setSearch("")}
                className="search-box-result"
                to={`/products/${product._id}`}
              >
                <strong>{product.name}</strong>
                <span>${Number(product.price ?? 0).toFixed(2)}</span>
              </Link>
            ))
          ) : (
            <p className="search-box-empty">No se encontraron resultados</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;

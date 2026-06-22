import { Link } from "react-router-dom";
import { useState } from "react";

function SearchBox({ products }) {
  const [search, setSearch] = useState("");

  const normalizedSearch = search.toLowerCase().trim();

  const results = products
    .filter((product) => {
      const name = product.name.toLowerCase();

      return (
        name.includes(normalizedSearch) || product.price.toString().includes(normalizedSearch)
      );
    })
    .slice(0, 3);

  return (
    <div className="search-box">
      <input
        className="search-box-input"
        type="search"
        placeholder="Buscar..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search.trim() != "" && (
        <div className="search-box-results">
          {results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product._id}
                onClick={() => setSearch("")}
                className="search-box-result"
                to={`/products/${product._id}`}
              >
                <strong>{product.name}</strong>
                <span>
                  ${product.price.toFixed(2)}
                </span>
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

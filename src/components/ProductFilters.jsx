function ProductFilters({
  search,
  selectedPrice,
  sortBy,
  prices,
  onSearchChange,
  onPriceChange,
  onSortChange,
}) {
  return (
    <div className="product-filters">
      <div>
        <label className="search-label" htmlFor="search">
          Buscar por titulo o precio:
        </label>
        <input
          className="search-input"
          placeholder="Buscar por titulo o precio..."
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={selectedPrice}
        onChange={(event) => onPriceChange(event.target.value)}
      >
        <option value="all">Todos los precios</option>
        <option value="0-10">Hasta $10</option>
        <option value="10-20">De $10 a $20</option>
        <option value="20+">Más de $20</option>
      </select>

    </div>
  );
}

export default ProductFilters;

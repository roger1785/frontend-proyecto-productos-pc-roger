function ProductFilters({
  search,
  selectedPrice,
  sortBy,
  priceRanges,
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
        <option value="0-60">Hasta $60</option>
        <option value="60-200">De $60 a $200</option>
        <option value="200+">Más de $200</option>
      </select>

    </div>
  );
}

export default ProductFilters;

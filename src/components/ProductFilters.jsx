function ProductFilters({
  search,
  selectedPrice,
  sortBy,
  selectedCategory,
  categories,
  onSearchChange,
  onPriceChange,
  onSortChange,
  onCategoryChange,
}) {
  return (
    <div className="product-filters">
      <div>
        <label className="search-label" htmlFor="search">
          Buscar por nombre o precio:
        </label>
        <input
          className="search-input"
          placeholder="Buscar por nombre o precio..."
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="default">Ordenar</option>
        <option value="az">A - Z</option>
        <option value="za">Z - A</option>
        <option value="cheapest">Precio menor</option>
        <option value="expensive">Precio mayor</option>
      </select>

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

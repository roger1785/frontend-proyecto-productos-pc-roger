import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductFilters from "../components/ProductFilters";
import { useCategory } from "../context/CategoryContext";

const normalizeText = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const normalizeNumericText = (value) =>
  String(value ?? "")
    .replace(/[^\d.,]/g, "")
    .replace(",", ".");

const matchesSearchTerm = (product, term) => {
  const normalizedTerm = normalizeText(term);

  if (!normalizedTerm) {
    return true;
  }

  const matchesText =
    normalizeText(product?.name).includes(normalizedTerm) ||
    normalizeText(product?.description).includes(normalizedTerm);

  const numericTerm = normalizeNumericText(term);
  const amount = Number(product?.price);

  const matchesNumeric =
    numericTerm &&
    !Number.isNaN(amount) &&
    (String(amount).includes(numericTerm) ||
      amount.toFixed(2).includes(numericTerm));

  return matchesText || Boolean(matchesNumeric);
};

const getProductCategoryId = (product) => {
  const categoryValue = product?.category;

  if (typeof categoryValue === "string") {
    return categoryValue;
  }

  if (Array.isArray(categoryValue) && categoryValue.length > 0) {
    const firstCategory = categoryValue[0];

    if (typeof firstCategory === "string") {
      return firstCategory;
    }

    if (firstCategory && typeof firstCategory === "object") {
      return String(firstCategory._id ?? firstCategory.id ?? "");
    }
  }

  if (categoryValue && typeof categoryValue === "object") {
    return String(categoryValue._id ?? categoryValue.id ?? "");
  }

  return "";
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const { selectedCategory, setSelectedCategory, categories } = useCategory();
  const location = useLocation();

  useEffect(() => {
    const queryCategory = new URLSearchParams(location.search).get("category");

    if (!queryCategory) {
      return;
    }

    const matchedById = categories.find(
      (category) => String(category._id ?? category.id) === queryCategory,
    );

    const matchedByName = categories.find(
      (category) => category.name === queryCategory,
    );

    const resolvedCategoryId = String(
      matchedById?._id ??
        matchedById?.id ??
        matchedByName?._id ??
        matchedByName?.id ??
        queryCategory,
    );

    if (resolvedCategoryId !== selectedCategory) {
      setSelectedCategory(resolvedCategoryId);
    }
  }, [location.search, categories, selectedCategory, setSelectedCategory]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadError("");
        const hasNumericSearch = /\d/.test(search.trim());
        const field =
          sortBy === "expensive" || sortBy === "cheapest" ? "price" : "name";
        const order = sortBy === "az" || sortBy === "cheapest" ? "asc" : "desc";
        const limit = 100;
        const backendSearch = hasNumericSearch ? "" : search;

        const data = await getProducts(
          1,
          limit,
          backendSearch,
          field,
          order,
          "",
          selectedCategory,
        );

        const fetchedProducts = Array.isArray(data) ? data : [];

        setProducts(fetchedProducts);
      } catch {
        setLoadError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [search, selectedPrice, sortBy, selectedCategory]);

  const displayedProducts = products.filter((product) => {
    if (search.trim() && !matchesSearchTerm(product, search)) {
      return false;
    }

    if (selectedCategory) {
      const productCategoryId = getProductCategoryId(product);

      if (String(productCategoryId) !== String(selectedCategory)) {
        return false;
      }
    }

    if (!selectedPrice || selectedPrice === "all") return true;

    if (selectedPrice === "0-60") return product.price <= 60;
    if (selectedPrice === "60-200")
      return product.price > 60 && product.price <= 200;
    if (selectedPrice === "200+") return product.price > 200;

    return true;
  });

  const categoryOptions = categories.map((category) => ({
    id: String(category._id ?? category.id),
    name: category.name,
  }));

  const hasResults = displayedProducts.length > 0;

  if (loading) {
    return <p className="empty-message">Cargando productos...</p>;
  }

  if (loadError) {
    return <p className="empty-message">{loadError}</p>;
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
            selectedCategory={selectedCategory}
            categories={categoryOptions}
            onSearchChange={setSearch}
            onPriceChange={setSelectedPrice}
            onSortChange={setSortBy}
            onCategoryChange={setSelectedCategory}
          />

          {hasResults ? (
            <ProductList products={displayedProducts} />
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

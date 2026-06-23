import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { getCategories } from "../services/categoryService";

const normalizeText = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

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

function OffersPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(1, 100),
          getProducts(1, 100),
        ]);

        const gamingCategory = (
          Array.isArray(categoriesData) ? categoriesData : []
        ).find((category) => normalizeText(category?.name) === "gaming");

        if (!gamingCategory) {
          setProducts([]);
          return;
        }

        const gamingCategoryId = String(
          gamingCategory._id ?? gamingCategory.id,
        );

        const gamingProducts = (
          Array.isArray(productsData) ? productsData : []
        ).filter(
          (product) =>
            String(getProductCategoryId(product)) === gamingCategoryId,
        );

        setProducts(gamingProducts);
      } catch {
        setError("No se pudieron cargar las ofertas");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) {
    return <p className="empty-message">Cargando ofertas...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <div className="section-header">
            <h2>Ofertas</h2>
            <p>Productos de la categoría gaming.</p>
          </div>

          {products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <p className="empty-message">
              No hay ofertas disponibles en este momento.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default OffersPage;

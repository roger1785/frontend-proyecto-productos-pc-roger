import { useCallback, useEffect, useState, useRef } from "react";
import ProductForm from "../../components/ProductForm";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../../services/productService";

function AdminProductsPage() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const messageRef = useRef(null);
  const formRef = useRef(null);

  const loadProducts = useCallback(async () => {
    try {
      setError("");
      const data = await getProducts(1, 100, "", "name", "asc", "", "");
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setError("No se pudieron cargar los productos");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCreateProduct = async (productData) => {
    try {
      setIsSaving(true);
      setError("");

      const newProduct = await createProduct(productData);

      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setShowForm(false);
      setSelectedProduct(null);
      setMessage("Producto creado correctamente");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      setIsSaving(true);
      setError("");

      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id),
      );
      setProductToDelete(null);

      setMessage("Producto eliminado correctamente");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateProduct = async (productId, productData) => {
    try {
      setIsSaving(true);
      setError("");

      const updatedProduct = await updateProduct(productId, productData);

      const updatedProducts = products.map((product) => {
        if (product._id === productId) {
          return updatedProduct;
        }

        return product;
      });

      setProducts(updatedProducts);
      setSelectedProduct(null);
      setShowForm(false);

      setMessage("Producto actualizado correctamente");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!message) {
      return;
    }

    messageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  useEffect(() => {
    if (!productToDelete) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setProductToDelete(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [productToDelete]);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    formRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [selectedProduct]);

  if (loading) {
    return <p className="empty-message">Cargando productos...</p>;
  }

  if (error) {
    return <p className="empty-message">{error}</p>;
  }

  return (
    <section className="admin-section">
      {message && (
        <p ref={messageRef} className="admin-message">
          {message}
        </p>
      )}

      <div className="admin-page-header">
        <div>
          <h2>Administración de productos</h2>
          <p>Listado interno de productos.</p>
        </div>

        <button
          className="admin-create-button"
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setSelectedProduct(null);
          }}
        >
          {showForm ? "Cerrar el formulario" : "Nuevo producto"}
        </button>
      </div>

      {showForm && (
        <div ref={formRef}>
          <ProductForm
            product={selectedProduct}
            onCreateProduct={handleCreateProduct}
            onUpdateProduct={handleUpdateProduct}
            isSaving={isSaving}
          />
        </div>
      )}

      <div className="admin-list">
        {products.map((product) => (
          <article className="admin-list-item" key={product._id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>
                {`$${Number(product.price ?? 0).toFixed(2)} • ${product.stock} en stock`}
              </p>

              <div className="admin-actions">
                <button
                  className="admin-action-button edit"
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>
                <button
                  className="admin-action-button delete"
                  type="button"
                  onClick={() => setProductToDelete(product)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {productToDelete && (
        <div className="modal-overlay" onClick={() => setProductToDelete(null)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h2>Eliminar producto</h2>

            <p>
              ¿Desea eliminar <strong>{productToDelete.name}</strong>?
            </p>

            <div className="modal-actions">
              <button
                disabled={isSaving}
                className="modal-button secondary"
                type="button"
                onClick={() => setProductToDelete(null)}
              >
                Cancelar
              </button>

              <button
                disabled={isSaving}
                className="modal-button danger"
                type="button"
                onClick={() => handleDeleteProduct(productToDelete._id)}
              >
                {isSaving ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminProductsPage;

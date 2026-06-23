import { useEffect, useRef, useState } from "react";
import { useCategory } from "../context/CategoryContext";

const initialForm = {
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  image: "",
  featured: false,
};

function ProductForm({ onCreateProduct, onUpdateProduct, isSaving, product }) {
  const formRef = useRef(null);
  const nameInputRef = useRef(null);
  const { categories } = useCategory();

  const getCategoryId = (value) => {
    if (typeof value === "string") {
      const matchedCategory = categories.find(
        (category) => String(category._id ?? category.id) === value,
      );

      if (matchedCategory) {
        return String(matchedCategory._id ?? matchedCategory.id);
      }

      const matchedByName = categories.find(
        (category) => category.name === value,
      );
      if (matchedByName) {
        return String(matchedByName._id ?? matchedByName.id);
      }

      return value;
    }

    if (value && typeof value === "object") {
      return String(value._id ?? value.id ?? "");
    }

    return "";
  };

  const buildInitialState = () => {
    if (!product) return initialForm;

    return {
      ...initialForm,
      ...product,
      category: getCategoryId(product.category),
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
    };
  };

  const [form, setForm] = useState(buildInitialState);

  const isEditing = Boolean(product);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    nameInputRef.current?.focus();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type == "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Ingrese el nombre");
      return;
    }

    if (!form.price.trim()) {
      alert("Ingrese un precio");
      return;
    }

    if (!form.stock.trim()) {
      alert("Ingrese un stock");
      return;
    }

    if (!form.category) {
      alert("Seleccione una categoría");
      return;
    }

    if (!form.description.trim()) {
      alert("Ingrese una descripción");
      return;
    }

    if (!form.image.trim()) {
      alert("Ingrese una imagen");
      return;
    }

    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
    };

    if (isEditing) {
      await onUpdateProduct(product._id, payload);
    } else {
      await onCreateProduct(payload);
    }

    setForm(initialForm);
  };

  return (
    <form ref={formRef} className="product-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar producto" : "Nuevo Producto"}</h2>

      <div className="form-group">
        <label htmlFor="name">Nombre: </label>
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Nuevo Producto"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio: </label>
        <input
          type="number"
          placeholder="0.00"
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock: </label>
        <input
          type="number"
          placeholder="0"
          id="stock"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría: </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Seleccionar una categoría</option>
          {categories.map((category) => (
            <option
              key={category._id ?? category.id}
              value={String(category._id ?? category.id)}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción: </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen: </label>
        <input
          type="text"
          name="image"
          id="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      {form.image.trim() && (
        <div className="image-preview">
          <img src={form.image} alt="Vista previa" />
        </div>
      )}

      <button
        disabled={isSaving}
        className="button product-form-button"
        type="submit"
      >
        {isSaving ? "Guardando..." : "Guardar producto"}
      </button>
    </form>
  );
}

export default ProductForm;

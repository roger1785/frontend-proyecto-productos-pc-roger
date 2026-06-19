import { categories } from "../data/categories";
import { useEffect, useState } from "react";

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
  const [form, setForm] = useState(initialForm);

  const isEditing = Boolean(product);

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

    if (isEditing) {
      await onUpdateProduct(product._id, form);
    } else {
      await onCreateProduct(form);
    }

    setForm(initialForm);
  };

  useEffect(() => {
    if (product) {
      setForm({
        ...initialForm,
        ...product,
      });
    }
  }, [product]);

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar producto" : "Nuevo Producto"}</h2>

      <div className="form-group">
        <label htmlFor="name">Nombre: </label>
        <input
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
            <option key={category.id} value={category.id}>
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
        >
          <option value="">Seleccionar una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </textarea>
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

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}

export default ProductForm;

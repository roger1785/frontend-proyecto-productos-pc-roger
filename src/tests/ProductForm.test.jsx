import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "../components/ProductForm";

describe("ProductForm", () => {
  test("espero que muestre el formulario para crear un producto", () => {
    render(
      <ProductForm
        onCreateProduct={() => {}}
        onUpdateProduct={() => {}}
        isSaving={false}
      />,
    );

    expect(screen.getByText("Nuevo Producto")).toBeInTheDocument();
    expect(screen.getByText("Nombre:")).toBeInTheDocument();
    expect(screen.getByText("Descripción:")).toBeInTheDocument();
    expect(screen.getByText("Categoría:")).toBeInTheDocument();
    expect(screen.getByText("Stock:")).toBeInTheDocument();
    expect(screen.getByText("Imagen:")).toBeInTheDocument();
    expect(screen.getByText("Destacado:")).toBeInTheDocument();
    expect(screen.getByText("Guardar producto")).toBeInTheDocument();
  });

  test("espero que me permita completar los datos del formulario", () => {
    render(
      <ProductForm
        onCreateProduct={() => {}}
        onUpdateProduct={() => {}}
        isSaving={false}
      />,
    );

    fireEvent.click(screen.getByLabelText("Nombre:"), {
      target: { value: "Mouse" },
    });

    fireEvent.click(screen.getByLabelText("Categoría:"), {
      target: { value: "Accessories" },
    });

    fireEvent.click(screen.getByLabelText("Stock:"), {
      target: { value: "10" },
    });

    expect(screen.getByDisplayValue("Mouse")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Accessories")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
  });

  test("Esperar que muestre los datos del producto a editar", () => {
    const product = {
      _id: "1",
      name: "Mouse",
      description: "Un mouse ergonómico",
      category: "Accessories",
      stock: 10,
      image: "https://example.com/mouse.jpg",
      featured: true,
    };

    render(
      <ProductForm
        product={product}
        onCreateProduct={() => {}}
        onUpdateProduct={() => {}}
        isSaving={false}
      />,
    );

    expect(screen.getByText("Editar producto")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Mouse")).toBeInTheDocument();
  });
});

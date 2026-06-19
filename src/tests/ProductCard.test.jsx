import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const product = {
  _id: "1",
  name: "Mouse",
  category: "Accessories",
  stock: 10,
  image: "https://example.com/inception.jpg",
};

describe("ProductCard", () => {
  test("espero que muestra la informacion de un producto", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText("Mouse");
    expect(image).toBeInTheDocument();

    expect(screen.getByAltText("Mouse")).toBeInTheDocument();

    expect(image).toHaveAttribute("src", "https://example.com/inception.jpg");

    expect(screen.getByText(/mouse/i)).toBeInTheDocument();
    expect(screen.getByText("Accessories")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});

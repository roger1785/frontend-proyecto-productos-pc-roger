import { useRef } from "react";
import ProductCard from "./ProductCard";

function ProductCarousel({ products }) {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) {
      return;
    }

    const scrollAmount = 320;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return (
    <section className="product-carousel-section">
      <div className="container">
        <div className="product-carousel-header">
          <h2>TODOS LOS PRODUCTOS</h2>
          <div className="product-carousel-controls">
            <button
              type="button"
              className="product-carousel-arrow"
              aria-label="Ver productos anteriores"
              onClick={() => scrollCarousel("left")}
            >
              &#8592;
            </button>
            <button
              type="button"
              className="product-carousel-arrow"
              aria-label="Ver productos siguientes"
              onClick={() => scrollCarousel("right")}
            >
              &#8594;
            </button>
          </div>
        </div>

        <div className="product-carousel" ref={carouselRef}>
          {products.map((product) => (
            <div className="product-carousel-item" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;

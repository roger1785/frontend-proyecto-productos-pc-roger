import ProductCard from "./ProductCard";

function ProductCarousel({ products }) {
  return (
    <section className="product-carousel-section">
      <div className="container">
        <div className="product-carousel-header">
          <h2>Contenido destacado</h2>
          <span>Desleza para ver mas</span>
        </div>

        <div className="product-carousel">
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

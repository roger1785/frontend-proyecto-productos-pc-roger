import Navbar from "./Navbar";
import logo from "../assets/favicon.svg";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

function Header() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <header className="site-header">
      <div className="header-content container">
        <div className="header-item">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <Navbar />
        <SearchBox products={products} />
      </div>
    </header>
  );
}

export default Header;

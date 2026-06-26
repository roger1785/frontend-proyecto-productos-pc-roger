import Navbar from "./Navbar";
import logo from "../assets/brand-mark.svg";
import userIcon from "../assets/user-icon.svg";
import SearchBox from "./SearchBox";
import Cart from "./Cart";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useCategory } from "../context/CategoryContext";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory, categories } = useCategory();

  const headerCategories = categories.map((category) => ({
    id: String(category._id ?? category.id),
    name: category.name,
  }));

  return (
    <header className="site-header">
      <div className="header-top container">
        <div className="header-logo">
          <img src={logo} alt="Logo Out of Office" className="logo" />
        </div>
        <div className="header-category">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              navigate("/products");
            }}
            className="category-select"
          >
            <option value="">Todas las categorías</option>
            {headerCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="header-search-wrapper">
          <SearchBox />
        </div>
        <div className="header-auth">
          <Cart />
          {!user && (
            <Link to="/auth/login/" className="auth-icon" title="Entrar">
              <img
                src={userIcon}
                alt=""
                width="24"
                height="24"
                aria-hidden="true"
              />
            </Link>
          )}
          {user && <span className="user-name">{user.name || "Usuario"}</span>}
        </div>
      </div>
      <div className="header-nav-wrapper">
        <Navbar />
      </div>
    </header>
  );
}

export default Header;

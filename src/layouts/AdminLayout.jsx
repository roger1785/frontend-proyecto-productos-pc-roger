import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Adminlayout() {
  return (
    <>
    <searchBox />
      <Header />

      <main className="admin-page">
        <div className="container">
          <div className="admin-header">
            <h1>Panel Administración</h1>
            <p>Gestiona el contenido del catalogo</p>
          </div>

          <nav className="admin-nav">
            <Link to="/admin/products">Productos</Link>
            <Link to="/products">Ver sitio publico</Link>
          </nav>

          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Adminlayout;

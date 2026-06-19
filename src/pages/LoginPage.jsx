import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const initialForm = {
  email: "",
  password: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const context = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (!form.password.trim()) {
      return "La contraseña es obligatoria";
    }

    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      const validationError = validateForm();

      if (validationError) {
        setError(validationError);
        return;
      }

      setError(null);

      const user = {
        email: form.email.trim(),
        password: form.password,
      };

      const data = await login(user);

      context.login(data);

      setMessage(data.message || "Sesión iniciada correctamente");

      setForm(initialForm);

      navigate("/admin/movies");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <section className="auth-section">
        <div className="container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>

            {message && <p className="auth-message">{message}</p>}
            {error && <p className="auth-error">{error}</p>}

            <div className="form-group">
              <label htmlFor="email">Correo: </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña: </label>
              <input
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button className="button" type="submit">
              Iniciar sesión
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;

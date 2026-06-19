import { useState } from "react";
import { register } from "../services/authService";

const initialForm = {
  name: "",
  email: "",
  email_confirmation: "",
  password: "",
  password_confimation: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegisterPage() {
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
    if (!form.name.trim()) {
      return "El nombre de usuario es obligatorio";
    }

    if (!form.email.trim()) {
      return "El correo electrónico es obligatorio";
    }

    if (form.email != form.email_confirmation) {
      return "Los correos electrónicos no coinciden";
    }

    if (!emailRegex.test(form.email)) {
      return "El correo electrónico no es válido";
    }

    if (!form.password.trim()) {
      return "La contraseña es obligatoria";
    }

    if (form.password != form.password_confimation) {
      return "Las contraseñas no coinciden";
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
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      };

      const data = await register(user);

      setMessage(data.message || "Usuario registrado correctamente");

      setForm(initialForm);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main>
      <section className="auth-section">
        <div className="container">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1>Crear cuenta</h1>

            {message && <p className="auth-message">{message}</p>}
            {error && <p className="auth-error">{error}</p>}

            <div className="form-group">
              <label htmlFor="name">Nombre: </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

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
              <label htmlFor="email_confirmation">Confirmar correo: </label>
              <input
                autoComplete="off"
                type="email"
                name="email_confirmation"
                id="email_confirmation"
                value={form.email_confirmation}
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

            <div className="form-group">
              <label htmlFor="password_confimation">
                Confirmar contraseña:{" "}
              </label>
              <input
                type="password"
                name="password_confimation"
                id="password_confimation"
                value={form.password_confimation}
                onChange={handleChange}
              />
            </div>

            <button className="button" type="submit">
              Registrar
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default RegisterPage;

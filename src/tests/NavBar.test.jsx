import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

describe("Nabvar", () => {
  test("espero que muestre el register y el login", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user: null, logout: () => {} }}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Registro")).toBeInTheDocument();
  });

  test("espero que me muestre el logout cuando tenga un usuario", () => {
    const user = {
      name: "User",
      email: "user@test.com",
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user, logout: () => {} }}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });

  test("espero que me muestre el admin cuando el usuario sea admin", () => {
    const user = {
      name: "Admin",
      email: "admin@test.com",
      admin: true,
    };

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ user, logout: () => {} }}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });
});

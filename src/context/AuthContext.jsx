import { createContext, useState } from "react";

export const AuthContext = createContext();

const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser());

  const login = (data) => {
    localStorage.setItem("token", data.token);

    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};

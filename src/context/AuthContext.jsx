/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext();

const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  return JSON.parse(storedUser);
};

const findNestedValue = (object, keys) => {
  if (!object || typeof object !== "object") return null;

  for (const [key, value] of Object.entries(object)) {
    if (keys.includes(key)) {
      return value;
    }

    if (typeof value === "object" && value !== null) {
      const nested = findNestedValue(value, keys);
      if (nested !== null) {
        return nested;
      }
    }
  }

  return null;
};

const getTokenValue = (data) => {
  if (!data) return null;
  return findNestedValue(data, ["token", "accessToken", "access_token"]);
};

const getUserValue = (data) => {
  if (!data) return null;

  const userObject = findNestedValue(data, ["user", "usuario"]);
  if (userObject) return userObject;

  const response = data.data ?? data;
  const rest = Object.fromEntries(
    Object.entries(response).filter(
      ([key]) =>
        !["token", "accessToken", "access_token", "user", "usuario"].includes(
          key,
        ),
    ),
  );

  return Object.keys(rest).length > 0 ? rest : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser());

  const login = (data) => {
    const token = getTokenValue(data);
    const currentUser = getUserValue(data);

    if (token) {
      localStorage.setItem("token", token);
    }

    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      setUser(currentUser);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

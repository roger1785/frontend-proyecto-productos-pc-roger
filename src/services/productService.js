const API_URL = `${import.meta.env.VITE_API_URL}/products`;

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? `Bearer ${token}` : null;
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};

export const getProducts = async () => {
  const response = await fetch(API_URL);

  return handleResponse(response);
};

export const getProductById = async (productId) => {
  const response = await fetch(`${API_URL}/${productId}`);

  return handleResponse(response);
};

export const createProduct = async (productData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No autorizado");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(productData),
  });

  return handleResponse(response);
};

export const updateProduct = async (productId, productData) => {
  const token = getToken();

  if (!token) {
    throw new Error("No autorizado");
  }

  const response = await fetch(`${API_URL}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify(productData),
  });

  return handleResponse(response);
};

export const deleteProduct = async (productId) => {
  const token = getToken();

  if (!token) {
    throw new Error("No autorizado");
  }

  const response = await fetch(`${API_URL}/${productId}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  return handleResponse(response);
};

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};

export const register = async (userData) => {
  const response = fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });

  return handleResponse(response);
};

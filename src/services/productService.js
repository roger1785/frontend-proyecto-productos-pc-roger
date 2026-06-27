const API_URL = `${import.meta.env.VITE_API_URL}/products`;

const findToken = (value) => {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (typeof value.token === "string") return value.token;
  if (typeof value.accessToken === "string") return value.accessToken;
  if (typeof value.access_token === "string") return value.access_token;

  for (const nestedValue of Object.values(value)) {
    if (nestedValue && typeof nestedValue === "object") {
      const token = findToken(nestedValue);
      if (token) return token;
    }
  }

  return null;
};

const getToken = () => {
  const directToken = localStorage.getItem("token");

  if (directToken) {
    return directToken.startsWith("Bearer ")
      ? directToken
      : `Bearer ${directToken}`;
  }

  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  let parsedUser = null;

  try {
    parsedUser = JSON.parse(storedUser);
  } catch {
    return null;
  }

  const fallbackToken = findToken(parsedUser);

  if (!fallbackToken) {
    return null;
  }

  return fallbackToken.startsWith("Bearer ")
    ? fallbackToken
    : `Bearer ${fallbackToken}`;
};

const normalizeProduct = (product) => ({
  ...product,
  _id: product._id ?? product.id,
});

const normalizeProductResponse = (data) => {
  const maybeProduct = data?.product ?? data;
  return maybeProduct ? normalizeProduct(maybeProduct) : data;
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};

export const getProducts = async (
  page = 1,
  limit = 4,
  search = "",
  sortBy = "name",
  order = "asc",
  selectedName = "",
  category = "",
) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    search,
    sortBy,
    order,
    name: selectedName,
    category,
  });

  const response = await fetch(`${API_URL}?${queryParams.toString()}`);
  const data = await handleResponse(response);

  const normalizeProduct = (product) => ({
    ...product,
    _id: product._id ?? product.id,
  });

  const normalizeProducts = (items) =>
    Array.isArray(items) ? items.map(normalizeProduct) : [];

  // Si la respuesta tiene una propiedad 'products', retornarla
  // Si no, retornar el data directamente como array
  return Array.isArray(data)
    ? normalizeProducts(data)
    : normalizeProducts(data.products || []);
};

export const getProductById = async (productId) => {
  const response = await fetch(`${API_URL}/${productId}`);
  const data = await handleResponse(response);

  return normalizeProductResponse(data);
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

  const data = await handleResponse(response);
  return normalizeProductResponse(data);
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

  const data = await handleResponse(response);
  return normalizeProductResponse(data);
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

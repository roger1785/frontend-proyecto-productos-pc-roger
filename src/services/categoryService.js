const API_URL = `${import.meta.env.VITE_API_URL}/categories`;

const normalizeCategory = (category) => ({
  ...category,
  _id: category?._id ?? category?.id,
});

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
};

export const getCategories = async (
  page = 1,
  limit = 100,
  search = "",
  sortBy = "name",
  order = "asc",
) => {
  const queryParams = new URLSearchParams({
    page,
    limit,
    search,
    sortBy,
    order,
  });

  const response = await fetch(`${API_URL}?${queryParams.toString()}`);
  const data = await handleResponse(response);

  const items = Array.isArray(data) ? data : data?.categories;

  return Array.isArray(items) ? items.map(normalizeCategory) : [];
};

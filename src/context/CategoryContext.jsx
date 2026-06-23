import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCategories } from "../services/categoryService";

const CategoryContext = createContext();

const normalizeCategories = (items) =>
  (Array.isArray(items) ? items : [])
    .map((category) => ({
      ...category,
      _id: category?._id ?? category?.id,
      name: String(
        category?.name ?? category?.nombre ?? category?.title ?? "",
      ).trim(),
    }))
    .filter((category) => Boolean(category.name) && Boolean(category._id));

export function CategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true);

    try {
      setCategoriesError("");
      const fetchedCategories = await getCategories();
      const normalizedCategories = normalizeCategories(fetchedCategories);

      setCategories(normalizedCategories);
    } catch {
      setCategories([]);
      setCategoriesError("No se pudieron cargar las categorías");
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        categories,
        categoriesLoading,
        categoriesError,
        reloadCategories: loadCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory debe utilizarse dentro de CategoryProvider");
  }

  return context;
}

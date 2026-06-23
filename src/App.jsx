import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CategoryProvider>
          <RouterProvider router={router} />
        </CategoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

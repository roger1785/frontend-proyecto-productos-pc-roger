import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import Adminlayout from "../layouts/AdminLayout";
import DashboardPage from "../pages/Admin/DashboardPage";
import AdminProductsPage from "../pages/Admin/AdminProductsPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

import adminLoader from "../loaders/adminLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      // {
      //   path: "*",
      //   element: <NotFoundPage />,
      // },
    ],
  },
  {
    path: "/auth",
    element: <MainLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      {
        index: true,
        loader: adminLoader,
        element: <DashboardPage />,
      },
      {
        path: "products",
        loader: adminLoader,
        element: <AdminProductsPage />,
      },
    ],
  },
]);

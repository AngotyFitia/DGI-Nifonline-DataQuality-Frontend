import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import DesignSystemPlayground from "../pages/DesignSystemPlayground";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/stat",
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "ui", element: <DesignSystemPlayground /> },
    ],
  },
]);
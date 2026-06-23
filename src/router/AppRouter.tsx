import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/auth/Login";
import DesignSystemPlayground from "../pages/DesignSystemPlayground";
import ContribuablesPage from "../pages/contribuables/ContribuablesPage";
import DoublonsPage from "../pages/doublons/DoublonsPage";
import AnalyseIA from "../pages/analyses/AnalyseIA";
import Recommandations from "../pages/recommandations/Recommandations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/welcome",
    element: <MainLayout />,
    children: [
      { path: "test", element: <DesignSystemPlayground /> },
      { path: "stat", element: <Dashboard /> },
      { path: "contribuables", element: <ContribuablesPage />},
      { path: "doublons", element: <DoublonsPage />},
      { path: "analyses", element: <AnalyseIA />},
      { path: "recommandations", element: <Recommandations />}
    ]
  }
]);
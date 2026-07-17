import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Authentification from "../pages/auth/Authentification";
import DesignSystemPlayground from "../pages/DesignSystemPlayground";
import ContribuablesPage from "../pages/contribuables/ContribuablesPage";
import DoublonsPage from "../pages/doublons/DoublonsPage";
import AnalyseIA from "../pages/analyses/AnalyseIA";
import Recommandations from "../pages/recommandations/Recommandations";
import Rapports from "../pages/rapports/Rapports";
import ProfilePage from "../pages/ProfilePage";
import Inscription from "../pages/auth/Inscription";

export const router = createBrowserRouter([
  { path: "/", element: <Authentification />,},
  { path: "/inscription", element: <Inscription />},
  {
    path: "/welcome",
    element: <MainLayout />,
    children: [
      { path: "test", element: <DesignSystemPlayground /> },
      { path: "stat", element: <Dashboard /> },
      { path: "contribuables", element: <ContribuablesPage />},
      { path: "doublons", element: <DoublonsPage />},
      { path: "analyses", element: <AnalyseIA />},
      { path: "recommandations", element: <Recommandations />},
      { path: "rapports", element: <Rapports />},
      { path: "profile", element: <ProfilePage />},
      
    ]
  }
]);
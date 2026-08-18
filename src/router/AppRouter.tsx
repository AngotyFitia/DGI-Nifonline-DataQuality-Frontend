import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardUtilisateurs from "../pages/admin/DashboardUtilisateurs";
import DahsboardSecurite from "../pages/admin/DahsboardSecurite";
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
import ListeUtilisateurs from "../pages/admin/ListeUtilisateurs";
import ImportTerritoires from "../pages/admin/imports/territoires/ImportTerritoires";
import ListeTerritoires from "../pages/admin/imports/territoires/ListeTerritoires";
import ImportActivites from "../pages/admin/imports/activites/ImportActivites";

export const router = createBrowserRouter([
  { path: "/", element: <Authentification />,},
  { path: "/inscription", element: <Inscription />},
  {
    path: "/admin", 
    element: <MainLayout />,
    children: [
      { path: "statistique-utilisateurs", element: <DashboardUtilisateurs /> },  
      { path: "statistique-securite", element: <DahsboardSecurite /> },  
      { path: "liste-utilisateurs", element: <ListeUtilisateurs /> },  
      { path: "audit", element: <ListeUtilisateurs /> },  
      { path: "territoire/import", element: <ImportTerritoires /> },  
      { path: "territoire/liste", element: <ListeTerritoires /> },  
      { path: "activites/import", element: <ImportActivites /> },  
    ]
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
      { path: "recommandations", element: <Recommandations />},
      { path: "rapports", element: <Rapports />},
      { path: "profile", element: <ProfilePage />},
      
    ]
  }
]);
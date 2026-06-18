# Liste des contributions

Ce document retrace l'évolution du projet DGI et les principales contributions réalisées au fil des Pull Requests.

---

## PR #1 - Mise en place du layout et du système de thème (fondation UI)

- Description :
  Mise en place de la base de l'application frontend :
  - Création du `MainLayout` avec Sidebar et Topbar
  - Implémentation du système de thème (light/dark mode)
  - Création de la structure globale des variables CSS
  - Mise en place du contexte de thème
  - Intégration de Tailwind CSS avec variables CSS personnalisées
  - Structuration initiale du design system
  - Création des composants réutilisables : Button, Input, Card, Badge, EmptyState
  - Harmonisation du style global
  - Préparation du design system pour les futurs modules de l'application

- Lien :
  https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/1

---

## PR #2 - Création de la page de connexion (UI uniquement)

- Description :
  - Développement de la page de connexion en version UI uniquement
  - Création du layout split (branding gauche / formulaire droite)
  - Intégration du thème global
  - Utilisation des composants réutilisables (Input, Button)
  - Ajout du bouton de changement de thème
  - Optimisation responsive mobile / desktop

- Lien :
  https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/2

## PR #3 - Correction des problèmes de déploiement (Vercel)

- Description :
  - Correction du problème de routage SPA sur Vercel (erreur 404 sur les routes comme /stat)
  - Ajout de la configuration `vercel.json` pour gérer le fallback vers `index.html`
  - Correction du chargement du favicon manquant (favicon.ico)
  - Amélioration de la stabilité du déploiement frontend

- Lien :
  https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/3

---

## PR #4 - Développement du Dashboard analytique (statistiques et filtres)

- Description :
  - Mise en place du Dashboard principal de l’application UI uniquement

- Lien :
  https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/4

---

## PR #5 - Gestion des contribuables (liste, import et détail complet)

- Description :
  - Mise en place complète du module de gestion des contribuables 
  - Liste des contribuables
    - Création de la page de listing des contribuables
    - Affichage sous forme de tableau réutilisable (`Table component`)
    - Intégration de filtres avancés : recherche par NIF / nom, type de contribuable, activité,centre fiscal, statut, score min / max
    - Actions rapides sur chaque ligne : voir détails, modifier, analyse IA, historique

  - Import de données
    - Mise en place de l’interface d’import (UI)
    - Préparation de la structure pour ingestion de fichiers contribuables
    - Normalisation des données simulées pour test

  - Détail d’un contribuable (Modal avancé)
    - Création d’un modal détaillé avec navigation par onglets : Aperçu, Informations, Activités et fiscalité, Coordonnées, Documents, Analyse IA
    - Affichage structuré des données métier (identité, fiscalité, activité, contacts)

  - Analyse IA (simulation LLM)
    - Ajout d’un champ `analyseIA` dans les données contribuables
    - Intégration d’un score qualité par contribuable
    - Affichage des anomalies : données manquantes, incohérences, doublons
  - Recommandations personnalisées par contribuable (simulation IA/LLM)
  - Mise en place d’une logique de coloration contextuelle (vert / orange / rouge)

  - Améliorations UI/UX
    - Ajout de feedback visuel sur les scores et anomalies
    - Amélioration de la lisibilité des fiches détaillées
    - Structuration des données en sections claires
    - Harmonisation avec le design system existant

- Lien :
  https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/5
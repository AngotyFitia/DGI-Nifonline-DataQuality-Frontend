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

- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/1

---

## PR #2 - Création de la page de connexion (UI uniquement)

- Description :
  - Développement de la page de connexion en version UI uniquement
  - Création du layout split (branding gauche / formulaire droite)
  - Intégration du thème global
  - Utilisation des composants réutilisables (Input, Button)
  - Ajout du bouton de changement de thème
  - Optimisation responsive mobile / desktop

- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/2

## PR #3 - Correction des problèmes de déploiement (Vercel)

- Description :
  - Correction du problème de routage SPA sur Vercel (erreur 404 sur les routes comme /stat)
  - Ajout de la configuration `vercel.json` pour gérer le fallback vers `index.html`
  - Correction du chargement du favicon manquant (favicon.ico)
  - Amélioration de la stabilité du déploiement frontend

- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/3

---

## PR #4 - Développement du Dashboard analytique (statistiques et filtres)

- Description :
  - Mise en place du Dashboard principal de l’application UI uniquement

- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/4

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
    - 
  - Améliorations complémentaires
    - Configuration de la redirection automatique vers la page de connexion au lancement de l'application
    - Correction de la structure des routes React Router

- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/5

---


## PR #6 - Module Analyse IA et gestion des doublons

- Description :
  - Création de la page **Analyse IA** avec affichage des résultats d’analyse des contribuables
  - Mise en place d’un tableau des analyses avec scores, statuts et actions (voir, analyser, archiver, supprimer)
  - Intégration des donnée basées sur `contribuablesData` et `doublonsData`
  - Centralisation des données dans `analysesIAData.ts` avec calcul automatique des scores et anomalies
  - Ajout de la détection et affichage des doublons dans le système d’analyse IA
  - Utilisation des composants existants (`DashboardCard`, `Table`, `Modal`, `Tabs`, `Button`) pour assurer la cohérence UI

- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/6

---

## PR #7 - Import multi-fichiers des contribuables

- Description :
  - Ajout de la gestion indépendante des modules : identité, activités, fiscalité, contacts et documents

- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/7

---

## PR #8 - Refactor UI globale + alignement chart graphique DGI

- Description: 
  - Refactorisation complet de l’interface utilisateur pour alignement avec la charte graphique DGI
  - Mise à jour des composants UI principaux pour une cohérence globale du design system
  - Amélioration de l’accessibilité visuelle en mode clair et sombre
  
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/8


## PR #9 - Module Recommandations et génération de rapports

- Description: 
  -  Création de la page **Reommandations**
  -  Création de la page **Rapports**
  -  Refonte du style: scrollbar, topbar, alert
  -  Redirection de la page de **Imports**
  
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/9

## PR #10 - Page d'édition de profil

- Description: 
  -  Création de la page **Profil**
  -  Ajustement du couleur du Sidebar en mode mobile
  -  Ajout du bouton de deconnexion
  
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/10

## PR #11 - Integration de la page d'authenfitication

- Description: 
  -  Appelation de l'API Backend pour la gestion d'authentification
  - Integration du captcha sur les formulaires
  - Ajout des liens de backend
  
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/11

## PR #12 - gestion de connexion et deconnexion
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/12

## PR #13 - Style de Recaptcha

- Description: 
  -  Adaptation du style css du recaptcha
  
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/13

## PR #14 - Style de Recaptcha Connexion
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/14

## PR #15 - Gestion des utilisateurs
  - intégration des filtres et pagination côté UI, affichage des KPI dans le Dashboard Admin, gestion dynamique des états utilisateurs, et validation reCAPTCHA.
  
- Lien : https://github.com/AngotyFitia/DGI-DataQuality-Frontend/pull/15
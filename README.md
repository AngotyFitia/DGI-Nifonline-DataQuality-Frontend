# Plateforme intelligente d’aide au contrôle de qualité du registre des contribuables (DGI)

---

## Description

Cette application est une interface web moderne destinée à la **Direction Générale des Impôts (DGI)**.
Elle vise à améliorer la **qualité et la fiabilité des données des contribuables** en fournissant une plateforme centralisée d’analyse et de gestion.

Elle permet notamment :

* le contrôle et la validation des données fiscales
* la détection d’anomalies et de doublons
* l’analyse intelligente des registres de contribuables
* la génération de rapports d’aide à la décision
* la centralisation des imports de données
* la consultation rapide d’indicateurs métiers

L’objectif est de proposer une interface **utilisable en environnement réel (pré-production / production)** avec une forte attention portée à l’ergonomie, la performance et la lisibilité des données.

---

## Stack technique

### Frontend

* React 18
* TypeScript (strict)
* Vite
* Tailwind CSS
* React Router v6
* Lucide React (icônes)

### Backend

* Spring Boot (API principale métier)
* Python (traitement / analyse / IA selon modules)
* PostgreSQL (base de données)
* API REST structurée

### Outils

* Postman (tests et validation des endpoints)
* ESLint / Prettier (qualité du code)
* Git + GitHub (workflow collaboratif)

---

## Architecture générale

L’application suit une architecture **séparée frontend / backend** :

* Frontend React : interface utilisateur et visualisation des données
* Backend Spring Boot : logique métier, gestion des contribuables, API
* Modules Python : analyse avancée / détection / traitement intelligent
* Base de données PostgreSQL : stockage structuré des données fiscales

---

## Fonctionnalités UI

### Interface principale

* Sidebar de navigation dynamique (menu métier)
* Topbar avec accès rapide aux actions et recherches
* Layout global responsive (desktop / mobile)
* Navigation fluide entre les modules

### Modules fonctionnels

* Tableau de bord (indicateurs globaux)
* Gestion des contribuables
* Analyse intelligente (IA / règles métier)
* Détection de doublons
* Recommandations d’anomalies
* Génération de rapports
* Import de données (CSV / fichiers structurés)
* Paramètres système

---

## Système de thème

L’application supporte un mode :

* Clair
* Sombre

### Implémentation

* Gestion via **Context React**
* Variables CSS globales (`--bg-primary`, `--text-primary`, etc.)
* Toggle global accessible depuis l’interface
* Persistance du choix utilisateur

---

## Design & UX

L’interface a été conçue avec une approche **UI-first**, en s’appuyant sur :

* Figma pour la conception des maquettes
* Un design orienté **dashboard administratif**
* Une hiérarchie claire des informations
* Une priorité donnée à la lisibilité des données métier

---

## Qualité et bonnes pratiques

* Composants UI réutilisables (Button, Input, etc.)
* Centralisation des styles via Tailwind + variables CSS
* Structure modulaire par responsabilités
* Respect du responsive design (mobile-first)
* Séparation logique des couches (UI / layout / pages)

---

## Architecture du projet (Frontend)

```
src/
│
├── components/
│   ├── ui/        # composants réutilisables (Button, Input, etc.)
│   ├── layout/    # Sidebar, Topbar, MainLayout
│
├── pages/         # pages de l’application (Dashboard, etc.)
├── context/       # ThemeContext, AuthContext (si existant)
├── routes/        # configuration des routes React Router
├── assets/        # images, logos, ressources statiques
└── styles/        # variables CSS globales (theme system)
```

---

## Outils utilisés

* **Postman** : test et validation des APIs Spring Boot et Python
* **GitHub** : gestion des versions et collaboration
* **Figma** : conception des interfaces utilisateur
* **VS Code** : environnement de développement principal

---

## Objectif global

L’objectif du projet est de fournir à la **DGI une plateforme moderne, exploitable et évolutive**, permettant :

* une meilleure qualité des données fiscales
* une détection rapide des incohérences
* une aide à la décision basée sur les données
* une interface intuitive adaptée aux agents métiers


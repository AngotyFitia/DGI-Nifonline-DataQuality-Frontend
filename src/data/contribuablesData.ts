export const contribuables = [
    {
      nif: "1000 1234 567",
      nom: "Madagascar Trading S.A.R.L",
      type: "Société",
      centreFiscal: "Antananarivo Centre",
      score: 72,
      statut: "Validé",
  
      image: "https://i.pravatar.cc/150?img=12",
        
      contacts:{
        adresse: "LOT II A Bis, Antananarivo 101",
        adresseSecondaire: "LOT II A Bis, Antananarivo 102",
        region: "Analamanga",
        commune: "Ambohimanarina",
        telephone: "034 11 569 02",
        email: "contact@mada-trading.mg",
        site: "www.madatrading.mg",
      },
      
      cnaps: "CNAPS 12456",
      stat: "12457911578",
  
      capital: "50 000 000 MGA",
      effectif: 25,
  
      dateCreation: "12/05/2016",
      debutActivite: "16/08/2016",
      formeJuridique: "S.A.R.L",
  
      activitePrincipale: {
        code: "G-14.10",
        libelle: "Commerce de gros",
        categorie: "Commerce",
        dateDebut: "16/08/2016",
      },
  
      activitesSecondaires: [
        {
          code: "G-14.11",
          libelle: "Commerce de ciments",
          dateDebut: "16/12/2016",
        },
        {
          code: "H-17.10",
          libelle: "Transport routiers",
          dateDebut: "13/01/2017",
        },
      ],
  
      analyseIA: {
        niveau: "Moyen",
        dernierScore: 72,
        anomalies: {
          donneesManquantes: 3,
          incoherences: 2,
          doublons: 1,
        },
        resume: "Données partiellement complètes avec incohérences mineures détectées.",
        recommandations: [
          "Compléter les informations manquantes sur les activités secondaires",
          "Vérifier la cohérence entre activité déclarée et code NIF",
          "Fusionner les doublons potentiels d’adresses",
        ],
        date: "18/06/2026"
      },

      documents: [
        {
          nom: "Résultats.csv",
          type: "Statuts",
          date: "22/05/2016",
          taille: "100 Mo",
        },
        {
          nom: "Authentification.pdf",
          type: "Fiche d’identité",
          date: "22/06/2016",
          taille: "47 Mo",
        },
      ],
    },
  
    {
      nif: "2000 987 654",
      nom: "Tech Solutions Madagascar",
      type: "Société",
      centreFiscal: "Antananarivo Nord",
      score: 88,
      statut: "Validé",
  
      image: "https://i.pravatar.cc/150?img=5",
      contacts: {
        adresse: "Ankorondrano, Antananarivo",
        adresseSecondaire: "Ankadimbahoaka, Antananarivo",
        region: "Analamanga",
        commune: "Antananarivo Renivohitra",
        telephone: "032 45 678 90",
        email: "contact@techsolutions.mg",
        site: "www.techsolutions.mg",
      },
    
      cnaps: "CNAPS 77821",
      stat: "9988776655",
  
      capital: "120 000 000 MGA",
      effectif: 60,
  
      dateCreation: "03/02/2019",
      debutActivite: "10/03/2019",
      formeJuridique: "S.A.R.L",
  
      activitePrincipale: {
        code: "J-62.01",
        libelle: "Développement logiciel",
        categorie: "Technologie",
        dateDebut: "10/03/2019",
      },
  
      activitesSecondaires: [
        {
          code: "J-63.11",
          libelle: "Hébergement de données",
          dateDebut: "15/06/2020",
        },
      ],
  
      analyseIA: {
        niveau: "Bon",
        dernierScore: 88,
        anomalies: {
          donneesManquantes: 0,
          incoherences: 0,
          doublons: 0,
        },
        resume: "Fiche propre avec données cohérentes et complètes.",
        recommandations: [
          "Maintenir la qualité actuelle des données",
          "Ajouter des indicateurs financiers pour enrichir le profil",
        ],
        date: "18/06/2026"
      },
      documents: [
        {
          nom: "Résultats.csv",
          type: "Statuts",
          date: "22/05/2016",
          taille: "100 Mo",
        },
        {
          nom: "Authentification.pdf",
          type: "Fiche d’identité",
          date: "22/06/2016",
          taille: "47 Mo",
        },
      ],
    },
  
    {
      nif: "3000 456 789",
      nom: "Agro Export SARL",
      type: "Société",
      centreFiscal: "Antsirabe",
      score: 64,
      statut: "Validé",
  
      image: "https://i.pravatar.cc/150?img=8",
      contacts: {
        adresse: "Route nationale 7, Antsirabe",
        adresseSecondaire: "Quartier Andranomadio, Antsirabe",
        region: "Vakinankaratra",
        commune: "Antsirabe I",
        telephone: "033 22 334 55",
        email: "info@agroexport.mg",
        site: "www.agroexport.mg",
      },
    
      cnaps: "CNAPS 55678",
      stat: "1122334455",
  
      capital: "80 000 000 MGA",
      effectif: 40,
  
      dateCreation: "21/07/2014",
      debutActivite: "01/09/2014",
      formeJuridique: "S.A.R.L",
  
      activitePrincipale: {
        code: "A-01.11",
        libelle: "Culture de riz",
        categorie: "Agriculture",
        dateDebut: "01/09/2014",
      },
  
      activitesSecondaires: [
        {
          code: "A-01.13",
          libelle: "Culture de légumes",
          dateDebut: "12/03/2016",
        },
      ],
  
      analyseIA: {
        niveau: "Faible",
        dernierScore: 64,
        anomalies: {
          donneesManquantes: 4,
          incoherences: 3,
          doublons: 0,
        },
        resume: "Plusieurs incohérences et données critiques manquantes.",
        recommandations: [
          "Corriger les incohérences sur les activités agricoles",
          "Compléter les informations fiscales manquantes",
          "Vérifier la date de début d’activité principale",
          "Mettre à jour les coordonnées légales",
        ],
        date: "18/06/2026"
      },
      documents: [
        {
          nom: "Résultats.csv",
          type: "Statuts",
          date: "22/05/2016",
          taille: "100 Mo",
        },
        {
          nom: "Authentification.pdf",
          type: "Fiche d’identité",
          date: "22/06/2016",
          taille: "47 Mo",
        },
      ],
    },
  
    {
      nif: "4000 111 222",
      nom: "Transport Express Mada",
      type: "Société",
      centreFiscal: "Toamasina",
      score: 79,
      statut: "À vérifier",
  
      image: "https://i.pravatar.cc/150?img=15",
      contacts: {
        adresse: "Port de Toamasina",
        adresseSecondaire: "Zone industrielle, Toamasina",
        region: "Atsinanana",
        commune: "Toamasina I",
        telephone: "034 77 889 00",
        email: "contact@transportexpress.mg",
        site: "www.transportexpress.mg",
      },
  
      cnaps: "CNAPS 99812",
      stat: "5566778899",
  
      capital: "60 000 000 MGA",
      effectif: 35,
  
      dateCreation: "10/11/2017",
      debutActivite: "15/01/2018",
      formeJuridique: "S.A.R.L",
  
      activitePrincipale: {
        code: "H-49.41",
        libelle: "Transport routier",
        categorie: "Transport",
        dateDebut: "15/01/2018",
      },
  
      activitesSecondaires: [
        {
          code: "H-52.10",
          libelle: "Entreposage",
          dateDebut: "20/09/2019",
        },
      ],
  
      analyseIA: {
        niveau: "Moyen",
        dernierScore: 79,
        anomalies: {
          donneesManquantes: 2,
          incoherences: 1,
          doublons: 0,
        },
        resume: "Données globalement correctes mais quelques incohérences mineures.",
        recommandations: [
          "Vérifier les données logistiques déclarées",
          "Compléter les informations sur les entrepôts",
        ],
      },
      documents: [
        {
          nom: "Résultats.csv",
          type: "Statuts",
          date: "22/05/2016",
          taille: "100 Mo",
        },
        {
          nom: "Authentification.pdf",
          type: "Fiche d’identité",
          date: "22/06/2016",
          taille: "47 Mo",
        },
      ],
    },
  
    {
      nif: "5000 333 444",
      nom: "Green Energy Madagascar",
      type: "Société",
      centreFiscal: "Fianarantsoa",
      score: 91,
      statut: "À vérifier",
  
      image: "https://i.pravatar.cc/150?img=20",

      contacts: {
        adresse: "Fianarantsoa centre",
        adresseSecondaire: "Zone industrielle Mangasoa",
        region: "Haute Matsiatra",
        commune: "Fianarantsoa I",
        telephone: "032 11 223 34",
        email: "info@greenenergy.mg",
        site: "www.greenenergy.mg",
      },
  
      cnaps: "CNAPS 44551",
      stat: "7788990011",
  
      capital: "200 000 000 MGA",
      effectif: 80,
  
      dateCreation: "15/09/2020",
      debutActivite: "01/10/2020",
      formeJuridique: "S.A.R.L",
  
      activitePrincipale: {
        code: "D-35.11",
        libelle: "Production d’électricité",
        categorie: "Énergie",
        dateDebut: "01/10/2020",
      },
  
      activitesSecondaires: [
        {
          code: "D-35.14",
          libelle: "Distribution d’électricité",
          dateDebut: "10/02/2021",
        },
      ],
  
      analyseIA: {
        niveau: "Bon",
        dernierScore: 91,
        anomalies: {
          donneesManquantes: 0,
          incoherences: 0,
          doublons: 0,
        },
        resume: "Données fiables avec bonne conformité réglementaire.",
        recommandations: [
          "Surveiller la conformité énergétique",
          "Mettre à jour régulièrement les données fiscales",
        ],
        date: "18/06/2026"
      },
      documents: [
        {
          nom: "Résultats.csv",
          type: "Statuts",
          date: "22/05/2016",
          taille: "100 Mo",
        },
        {
          nom: "Authentification.pdf",
          type: "Fiche d’identité",
          date: "22/06/2016",
          taille: "47 Mo",
        },
      ],
    },
    
  ];
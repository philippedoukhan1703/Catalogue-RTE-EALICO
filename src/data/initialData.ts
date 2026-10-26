import { Equipment } from '../types';

export const initialEquipmentData: Equipment[] = [
  {
    id: "eq-1",
    "Classification Ealico": "Postes Électriques",
    "Type Ealico": "Disjoncteur Haute Tension",
    "Code modèle": "DJ-400-SF6",
    "Désignation Modèle": "Disjoncteur 400kV SF6 Tripolaire",
    Commentaire: "Disjoncteur principal pour liaison inter-postes 400kV. Surveillance de la densité de SF6 obligatoire.",
    "Equipes concernées": ["EEL", "EMSP"],
    "Nb éléments": 3,
    "Lien photo": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "FT-RTE-400-012",
    Contrôles: [
      { Désignation: "Contrôle de densité SF6 et pressions", Périodicité: "Mensuelle", Type: "Visuel et Mesure" },
      { Désignation: "Révision des mécanismes de commande", Périodicité: "Triennale", Type: "Maintenance préventive" },
      { Désignation: "Mesure des résistances de contacts", Périodicité: "Sexennale", Type: "Électrique" }
    ]
  },
  {
    id: "eq-2",
    "Classification Ealico": "Postes Électriques",
    "Type Ealico": "Transformateur de Puissance",
    "Code modèle": "TRP-225-400",
    "Désignation Modèle": "Autotransformateur 225/400kV - 600 MVA",
    Commentaire: "Transformateur autotransfo en cuve étanche avec régleur en charge. Analyse chromatographique des gaz requise.",
    "Equipes concernées": ["EEL", "EMSP", "EMSC"],
    "Nb éléments": 1,
    "Lien photo": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "FT-RTE-TRP-225",
    Contrôles: [
      { Désignation: "Analyse chromatographique des gaz dissous (DGA)", Périodicité: "Annuelle", Type: "Laboratoire" },
      { Désignation: "Contrôle des échangeurs et batteries de ventilation", Périodicité: "Semestrielle", Type: "Visuel / Thermographie" },
      { Désignation: "Vérification des protections Buchholz", Périodicité: "Annuelle", Type: "Fonctionnel" }
    ]
  },
  {
    id: "eq-3",
    "Classification Ealico": "Lignes Aériennes",
    "Type Ealico": "Pylône Haute Tension",
    "Code modèle": "PYL-T4-400",
    "Désignation Modèle": "Pylône Suspension 400kV type T4",
    Commentaire: "Pylône treillis en acier galvanisé. Inspection visuelle des boulonnages et des massifs de fondation.",
    "Equipes concernées": ["Appuis", "GDP", "EEL"],
    "Nb éléments": 12,
    "Lien photo": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "FT-RTE-PYL-04",
    Contrôles: [
      { Désignation: "Inspection visuelle anticorrosion et structures", Périodicité: "Quinquennale", Type: "Visuel / Drone" },
      { Désignation: "Contrôle des massifs de fondation", Périodicité: "Décennale", Type: "Génie civil" }
    ]
  },
  {
    id: "eq-4",
    "Classification Ealico": "Postes Électriques",
    "Type Ealico": "Sectionneur",
    "Code modèle": "SEC-225-ROT",
    "Désignation Modèle": "Sectionneur rotatif 225kV à double rupture",
    Commentaire: "Sectionneur tripolaire motorisé pour consignation de jeux de barres.",
    "Equipes concernées": ["EEL", "ASI"],
    "Nb éléments": 3,
    "Lien photo": "https://images.unsplash.com/photo-1541888946425-d0fbb18f86f5?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "FT-RTE-SEC-225",
    Contrôles: [
      { Désignation: "Graissage et manœuvre d'essai", Périodicité: "Annuelle", Type: "Mécanique" },
      { Désignation: "Contrôle des contacts fixes et mobiles", Périodicité: "Triennale", Type: "Visuel" }
    ]
  },
  {
    id: "eq-5",
    "Classification Ealico": "Systèmes de Conduite",
    "Type Ealico": "Automate de Protection",
    "Code modèle": "PROT-NUM-500",
    "Désignation Modèle": "Unité de Protection Numérique de Ligne",
    Commentaire: "Relais de protection numérique protégeant les lignes contre les courts-circuits.",
    "Equipes concernées": ["ASI", "GDP"],
    "Nb éléments": 2,
    "Lien photo": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "FT-RTE-PROT-99",
    Contrôles: [
      { Désignation: "Test d'injection secondaire et déclenchement", Périodicité: "Annuelle", Type: "Électronique" },
      { Désignation: "Vérification des synchro-couplages", Périodicité: "Bisannuelle", Type: "Fonctionnel" }
    ]
  },
  {
    id: "eq-6",
    "Classification Ealico": "Lignes Souterraines",
    "Type Ealico": "Câble HTB",
    "Code modèle": "CBL-225-PR",
    "Désignation Modèle": "Câble Souterrain 225kV PRC sous fourreau",
    Commentaire: "Liaison souterraine en polyéthylène réticulé avec chambre de jonction.",
    "Equipes concernées": ["EEL", "EMSP", "Autre"],
    "Nb éléments": 6,
    "Lien photo": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "FT-RTE-CBL-225",
    Contrôles: [
      { Désignation: "Mesure de température par fibre optique distribuée", Périodicité: "Continue", Type: "Automatique" },
      { Désignation: "Contrôle des chambres de jonction et alarmes eau", Périodicité: "Semestrielle", Type: "Visuel" }
    ]
  },
  {
    id: "eq-7",
    "Classification Ealico": "Postes Électriques",
    "Type Ealico": "Parafoudre",
    "Code modèle": "PAR-400-ZNO",
    "Désignation Modèle": "Parafoudre à oxyde de zinc 400kV",
    Commentaire: "Protection contre les surtensions atmosphériques et de manœuvre.",
    "Equipes concernées": ["EEL", "EMSP"],
    "Nb éléments": 3,
    "Lien photo": "https://images.unsplash.com/photo-1541888946425-d0fbb18f86f5?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "N",
    "Fiche Technique": "FT-RTE-PAR-400",
    Contrôles: [
      { Désignation: "Relevé du compteur de coups de foudre et courant de fuite", Périodicité: "Annuelle", Type: "Électrique" }
    ]
  },
  {
    id: "eq-8",
    "Classification Ealico": "Auxiliaires",
    "Type Ealico": "Batterie d'Accumulateurs",
    "Code modèle": "BAT-CC-110V",
    "Désignation Modèle": "Batterie Plomb-Acide 110V pour postes sources",
    Commentaire: "Alimentation secourue indispensable pour les commandes et protections en cas de black-out.",
    "Equipes concernées": ["EMSC", "ASI"],
    "Nb éléments": 1,
    "Lien photo": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "FT-RTE-BAT-110",
    Contrôles: [
      { Désignation: "Mesure de la tension des éléments et densité électrolyte", Périodicité: "Mensuelle", Type: "Électrique / Chimique" },
      { Désignation: "Test de décharge autonome", Périodicité: "Annuelle", Type: "Fonctionnel" }
    ]
  }
];

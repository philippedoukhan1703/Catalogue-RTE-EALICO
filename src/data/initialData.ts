import { Equipment } from '../types';

const classifications = [
  "Postes Électriques",
  "Lignes Aériennes",
  "Lignes Souterraines",
  "Postes Sources",
  "Systèmes de Conduite",
  "Auxiliaires",
  "Télécommunications & Informatique"
];

const typesByClassification: Record<string, string[]> = {
  "Postes Électriques": ["Disjoncteur Haute Tension", "Transformateur de Puissance", "Sectionneur", "Parafoudre", "Transformateur de Tension", "Transformateur de Courant"],
  "Lignes Aériennes": ["Pylône Suspension", "Pylône Ancrage", "Câble Conducteur", "Chaîne d'Isolateurs", "Câble Garde OPGW"],
  "Lignes Souterraines": ["Câble HTB PRC", "Chambre de Jonction", "Borne de Signalisation", "Système de Refroidissement"],
  "Postes Sources": ["Jeu de barres", "Jeu de barres blindé GIS", "Redresseur", "Armoire de commande"],
  "Systèmes de Conduite": ["Automate de Protection", "Unité Centrale SCADA", "Passerelle IEC 61850", "Routeur sécurisé"],
  "Auxiliaires": ["Batterie d'Accumulateurs", "Chargeur Redresseur", "Groupe Électrogène de Secours", "Système anti-incendie"],
  "Télécommunications & Informatique": ["Faisceau Hertzien", "Répartiteur Optique", "Serveur de Téléconduite", "Onduleur Ondulateur"]
};

const teamsList = [["EEL", "EMSP"], ["EEL", "EMSC"], ["ASI", "GDP"], ["Appuis", "GDP"], ["EEL"], ["EMSP", "EMSC"], ["ASI", "Autre"], ["EEL", "EMSP", "EMSC"]];
const periodicities = ["Mensuelle", "Trimestrielle", "Semestrielle", "Annuelle", "Triennale", "Quinquennale", "Décennale"];
const controlTypes = ["Visuel et Mesure", "Maintenance préventive", "Électrique", "Laboratoire", "Fonctionnel", "Thermique"];

export const initialEquipmentData: Equipment[] = Array.from({ length: 815 }, (_, i) => {
  const classIndex = i % classifications.length;
  const classification = classifications[classIndex];
  const types = typesByClassification[classification];
  const typeEalico = types[i % types.length];
  const codeNum = (i + 1).toString().padStart(4, '0');
  const codeModele = `${typeEalico.substring(0, 3).toUpperCase()}-${codeNum}`;
  const designation = `${typeEalico} RTE modèle ${i + 1} - 400kV / 225kV`;
  const isMandatory = i % 5 !== 0 ? "Oui" : "N";
  const teams = teamsList[i % teamsList.length];

  const controls = [
    {
      Désignation: `Contrôle périodique ${i + 1} - Inspection technique`,
      Périodicité: periodicities[i % periodicities.length],
      Type: controlTypes[i % controlTypes.length]
    },
    {
      Désignation: `Vérification fonctionnelle ${i + 1} - Sécurité Ealico`,
      Périodicité: periodicities[(i + 2) % periodicities.length],
      Type: controlTypes[(i + 1) % controlTypes.length]
    }
  ];

  return {
    id: `eq-${i + 1}`,
    "Classification Ealico": classification,
    "Type Ealico": typeEalico,
    "Code modèle": codeModele,
    "Désignation Modèle": designation,
    Commentaire: `Équipement standard du réseau de transport d'électricité RTE - Référence technique normalisée #${i + 1}.`,
    "Equipes concernées": teams,
    "Nb éléments": (i % 6) + 1,
    "Lien photo": i % 3 === 0 ? "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80" : i % 3 === 1 ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" : "",
    "Obligatoire Ealico": isMandatory,
    "Fiche Technique": `FT-RTE-2026-${codeNum}`,
    Contrôles: controls
  };
});

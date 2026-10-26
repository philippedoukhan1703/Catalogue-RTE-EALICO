export interface Control {
  Désignation: string;
  Périodicité: string;
  Type: string;
}

export interface Equipment {
  id: string;
  "Classification Ealico": string;
  "Type Ealico": string;
  "Code modèle": string;
  "Désignation Modèle": string;
  Commentaire: string;
  "Equipes concernées": string[];
  "Nb éléments": number;
  "Lien photo": string;
  "Obligatoire Ealico": string; // "Oui" or "Non"
  "Fiche Technique": string;
  Contrôles: Control[];
}

export type ViewMode = 'grid' | 'table' | 'stats';

export interface FilterState {
  search: string;
  thematique: string;
  type: string;
  equipe: string;
  obligatoire: string;
}

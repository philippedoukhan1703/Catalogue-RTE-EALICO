import pandas as pd
import json

# Lire le fichier Excel
try:
    df = pd.read_excel("Catalogue des modèles RTE V2.xlsx", sheet_name="CATALOGUE modèle RTE", header=1)  # header=1 pour ignorer la première ligne vide
    print("Fichier Excel lu avec succès !")
except Exception as e:
    print(f"Erreur lors de la lecture du fichier Excel : {e}")
    exit()

# Afficher les colonnes pour débogage
print("Colonnes détectées dans le fichier Excel :")
print(df.columns.tolist())

# Fonction pour extraire les contrôles
def extract_controls(row):
    controls = []
    # Liste des colonnes de contrôles (à adapter si nécessaire)
    control_columns = [
        ("Ctrl. applicable 1", "Périodicité Ctrl. 1", "Type Ctrl. 1"),
        ("Ctrl. applicable 2", "Périodicité Ctrl. 2", "Type Ctrl. 2"),
        ("Ctrl. applicable 3", "Périodicité Ctrl. 3", "Type Ctrl. 3"),
        ("Ctrl. applicable 4", "Périodicité Ctrl. 4", "Type Ctrl. 4")
    ]

    for ctrl_col, peri_col, type_col in control_columns:
        if ctrl_col in row and pd.notna(row[ctrl_col]):
            controls.append({
                "Désignation": str(row[ctrl_col]),
                "Périodicité": str(row[peri_col]) if peri_col in row and pd.notna(row[peri_col]) else "Non spécifiée",
                "Type": str(row[type_col]) if type_col in row and pd.notna(row[type_col]) else "Non spécifié"
            })
    return controls if controls else None

# Fonction pour extraire les équipes concernées
def extract_teams(row):
    teams = []
    # Liste des colonnes d'équipes (à adapter si nécessaire)
    team_columns = {
        "EEL": 6,
        "EMSP": 7,
        "EMSC": 8,
        "ASI": 9,
        "GDP": 10,
        "Appuis": 11,
        "Autre": 12
    }

    for team, col_index in team_columns.items():
        if col_index < len(row) and pd.notna(row[col_index]) and row[col_index] == "X":
            teams.append(team)
    return teams if teams else ["Non spécifiée"]

# Convertir en liste de dictionnaires
equipment_list = []
for _, row in df.iterrows():
    try:
        # Ignorer les lignes vides ou d'en-tête
        if pd.isna(row["Code Modèle"]) or "Code modèle" in str(row["Code Modèle"]):
            continue

        # Extraire les données
        classification = str(row["Réglementation Ealico"]) if pd.notna(row["Réglementation Ealico"]) else "Non spécifiée"
        type_ealico = str(row["Type d'élement Ealico"]) if pd.notna(row["Type d'élement Ealico"]) else "Non spécifié"
        code_modele = str(row["Code Modèle"]) if pd.notna(row["Code Modèle"]) else "Non spécifié"
        designation = str(row["Désignation Modèle "]) if pd.notna(row["Désignation Modèle "]) else "Non spécifiée"
        commentaire = str(row["Commentaire / exemples"]) if pd.notna(row["Commentaire / exemples"]) else ""
        nb_elements = int(row["Nb éléments"]) if pd.notna(row["Nb éléments"]) else 0
        lien_photo = str(row["Lien vers photo modèle"]) if pd.notna(row["Lien vers photo modèle"]) else ""
        obligatoire = "N" if pd.notna(row["Obligatoire Ealico"]) and row["Obligatoire Ealico"] == "N" else "Oui"
        fiche_technique = str(row["Fiche technique RTE"]) if pd.notna(row["Fiche technique RTE"]) else ""

        equipment = {
            "Classification Ealico": classification,
            "Type Ealico": type_ealico,
            "Code modèle": code_modele,
            "Désignation Modèle": designation,
            "Commentaire": commentaire,
            "Equipes concernées": extract_teams(row),
            "Nb éléments": nb_elements,
            "Lien photo": lien_photo,
            "Obligatoire Ealico": obligatoire,
            "Fiche Technique": fiche_technique,
            "Contrôles": extract_controls(row)
        }
        equipment_list.append(equipment)
    except Exception as e:
        print(f"Erreur lors du traitement de la ligne {_}: {e}")
        continue

# Sauvegarder en JSON
try:
    with open("data.js", "w", encoding="utf-8") as f:
        f.write("const equipmentData = ")
        json.dump(equipment_list, f, ensure_ascii=False, indent=4)
        f.write(";")
    print("Fichier data.js généré avec succès !")
except Exception as e:
    print(f"Erreur lors de l'écriture du fichier data.js : {e}")

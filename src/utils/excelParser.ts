import * as XLSX from 'xlsx';
import { Equipment, Control } from '../types';

export async function parseRTEExcelFile(file: File): Promise<Equipment[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Find sheet name "CATALOGUE modèle RTE" or fallback to first sheet
        let sheetName = workbook.SheetNames.find((name) =>
          name.toLowerCase().includes('catalogue')
        );
        if (!sheetName) {
          sheetName = workbook.SheetNames[0];
        }

        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON with header: 1 to inspect rows, or header: row objects with header at index 1 (row 2)
        // In python script: header=1 (meaning row index 1 is header, which is row 2 in Excel)
        const rawRows = XLSX.utils.sheet_to_json<any>(worksheet, { header: 1 });

        if (rawRows.length < 2) {
          throw new Error("Le fichier Excel est vide ou ne contient pas assez de lignes.");
        }

        // Find header row (usually row index 1 or 0)
        // Let's locate the row containing "Code Modèle"
        let headerRowIndex = 0;
        for (let i = 0; i < Math.min(5, rawRows.length); i++) {
          const row = rawRows[i];
          if (row && row.some((cell: any) => cell && String(cell).toLowerCase().includes('code modèle'))) {
            headerRowIndex = i;
            break;
          }
        }

        const headers = rawRows[headerRowIndex] as string[];
        const rows = rawRows.slice(headerRowIndex + 1);

        const equipmentList: Equipment[] = [];

        rows.forEach((rowArray, index) => {
          if (!rowArray || rowArray.length === 0) return;

          // Map row array to object using headers
          const row: Record<string, any> = {};
          headers.forEach((h, colIdx) => {
            if (h) {
              row[h.toString().trim()] = rowArray[colIdx];
            }
          });

          // Also keep raw array for column index checks (teams are often at specific columns in RTE sheets)
          // team_columns: EEL(6), EMSP(7), EMSC(8), ASI(9), GDP(10), Appuis(11), Autre(12)
          const codeModel = row["Code Modèle"] || row["Code modèle"];
          if (!codeModel || String(codeModel).toLowerCase().includes('code modèle')) {
            return;
          }

          const classification = row["Réglementation Ealico"] || "Non spécifiée";
          const typeEalico = row["Type d'élement Ealico"] || row["Type d'élément Ealico"] || "Non spécifié";
          const designation = row["Désignation Modèle "] || row["Désignation Modèle"] || "Non spécifiée";
          const commentaire = row["Commentaire / exemples"] || "";
          const nbElements = Number(row["Nb éléments"]) || 1;
          const lienPhoto = row["Lien vers photo modèle"] || "";
          const obligatoire = row["Obligatoire Ealico"] === "N" ? "N" : "Oui";
          const ficheTechnique = row["Fiche technique RTE"] || row["Fiche Technique"] || "";

          // Extract teams
          const teams: string[] = [];
          const teamColIndices: Record<string, number> = {
            EEL: 6,
            EMSP: 7,
            EMSC: 8,
            ASI: 9,
            GDP: 10,
            Appuis: 11,
            Autre: 12,
          };

          for (const [teamName, colIdx] of Object.entries(teamColIndices)) {
            if (rowArray[colIdx] === "X" || rowArray[colIdx] === "x") {
              teams.push(teamName);
            }
          }

          // Also check header-based team columns if present
          ["EEL", "EMSP", "EMSC", "ASI", "GDP", "Appuis", "Autre"].forEach((t) => {
            if (row[t] === "X" || row[t] === "x") {
              if (!teams.includes(t)) teams.push(t);
            }
          });

          if (teams.length === 0) teams.push("Non spécifiée");

          // Extract controls (up to 4)
          const controls: Control[] = [];
          for (let c = 1; c <= 4; c++) {
            const ctrlKey = `Ctrl. applicable ${c}`;
            const periKey = `Périodicité Ctrl. ${c}`;
            const typeKey = `Type Ctrl. ${c}`;

            if (row[ctrlKey]) {
              controls.push({
                Désignation: String(row[ctrlKey]),
                Périodicité: row[periKey] ? String(row[periKey]) : "Non spécifiée",
                Type: row[typeKey] ? String(row[typeKey]) : "Non spécifié",
              });
            }
          }

          const equipment: Equipment = {
            id: `eq-excel-${index}-${Date.now()}`,
            "Classification Ealico": String(classification),
            "Type Ealico": String(typeEalico),
            "Code modèle": String(codeModel),
            "Désignation Modèle": String(designation),
            Commentaire: String(commentaire),
            "Equipes concernées": teams,
            "Nb éléments": Number(nbElements) || 1,
            "Lien photo": String(lienPhoto),
            "Obligatoire Ealico": String(obligatoire),
            "Fiche Technique": String(ficheTechnique),
            Contrôles: controls,
          };

          equipmentList.push(equipment);
        });

        resolve(equipmentList);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}

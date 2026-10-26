import React, { useState, useEffect } from 'react';
import { Equipment, ViewMode, FilterState } from './types';
import { initialEquipmentData } from './data/initialData';
import { parseRTEExcelFile } from './utils/excelParser';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { EquipmentCard } from './components/EquipmentCard';
import { EquipmentTable } from './components/EquipmentTable';
import { EquipmentDetailModal } from './components/EquipmentDetailModal';
import { EquipmentFormModal } from './components/EquipmentFormModal';
import { StatsView } from './components/StatsView';
import { QRCodeZoomModal } from './components/QRCodeZoomModal';
import { ScrollToTopButton } from './components/ScrollToTopButton';

export default function App() {
  // Load initial state from localStorage or fallback to initialEquipmentData
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(() => {
    try {
      const saved = localStorage.getItem('rte_equipment_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 10) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load from localStorage", e);
    }
    return initialEquipmentData;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('rte_equipment_catalog', JSON.stringify(equipmentList));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [equipmentList]);

  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    thematique: '',
    type: '',
    equipe: '',
    obligatoire: '',
  });

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [qrModalEquipment, setQrModalEquipment] = useState<Equipment | null>(null);

  // Filter logic
  const filteredEquipment = equipmentList.filter((eq) => {
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      eq["Code modèle"].toLowerCase().includes(searchTerm) ||
      eq["Désignation Modèle"].toLowerCase().includes(searchTerm) ||
      eq["Classification Ealico"].toLowerCase().includes(searchTerm) ||
      eq["Type Ealico"].toLowerCase().includes(searchTerm) ||
      eq.Commentaire?.toLowerCase().includes(searchTerm);

    const matchesThematique =
      !filters.thematique || eq["Classification Ealico"] === filters.thematique;

    const matchesType = !filters.type || eq["Type Ealico"] === filters.type;

    const matchesEquipe =
      !filters.equipe || eq["Equipes concernées"]?.includes(filters.equipe);

    const matchesObligatoire =
      !filters.obligatoire ||
      (filters.obligatoire === 'Oui' && eq["Obligatoire Ealico"] !== "N") ||
      (filters.obligatoire === 'Non' && eq["Obligatoire Ealico"] === "N");

    return (
      matchesSearch &&
      matchesThematique &&
      matchesType &&
      matchesEquipe &&
      matchesObligatoire
    );
  });

  const handleResetFilters = () => {
    setFilters({
      search: '',
      thematique: '',
      type: '',
      equipe: '',
      obligatoire: '',
    });
  };

  const handleSaveEquipment = (savedEquipment: Equipment) => {
    setEquipmentList((prev) => {
      const exists = prev.some((e) => e.id === savedEquipment.id);
      if (exists) {
        return prev.map((e) => (e.id === savedEquipment.id ? savedEquipment : e));
      } else {
        return [savedEquipment, ...prev];
      }
    });
  };

  const handleDeleteEquipment = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce modèle du catalogue ?")) {
      setEquipmentList((prev) => prev.filter((e) => e.id !== id));
      if (selectedEquipment?.id === id) {
        setSelectedEquipment(null);
      }
    }
  };

  const handleResetData = () => {
    if (confirm("Voulez-vous réinitialiser le catalogue avec les données d'origine ?")) {
      setEquipmentList(initialEquipmentData);
      handleResetFilters();
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(equipmentList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "catalogue_rte_equipements.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportCSV = () => {
    const headers = ["Code Modèle", "Désignation", "Thématique", "Type", "Équipes", "Nb éléments", "Obligatoire", "Fiche Technique"];
    const rows = equipmentList.map(e => [
      `"${e["Code modèle"]}"`,
      `"${e["Désignation Modèle"]}"`,
      `"${e["Classification Ealico"]}"`,
      `"${e["Type Ealico"]}"`,
      `"${e["Equipes concernées"]?.join(', ')}"`,
      e["Nb éléments"],
      `"${e["Obligatoire Ealico"]}"`,
      `"${e["Fiche Technique"]}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'catalogue_rte_equipements.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        try {
          const parsedList = await parseRTEExcelFile(file);
          if (parsedList.length > 0) {
            setEquipmentList(parsedList);
            alert(`${parsedList.length} équipements importés avec succès depuis le fichier Excel !`);
          } else {
            alert("Aucun équipement valide n'a été trouvé dans le fichier Excel.");
          }
        } catch (err) {
          console.error(err);
          alert("Erreur lors de l'analyse du fichier Excel.");
        }
      } else if (fileName.endsWith('.json')) {
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target?.result as string);
            if (Array.isArray(parsed)) {
              setEquipmentList(parsed);
              alert("Catalogue importé avec succès !");
            } else {
              alert("Format JSON invalide (doit être un tableau d'équipements).");
            }
          } catch (err) {
            alert("Erreur lors de la lecture du fichier JSON.");
          }
        };
      } else {
        alert("Veuillez sélectionner un fichier .xlsx, .xls ou .json");
      }
    }
  };

  const hiddenFileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Hidden file input for Excel and JSON import */}
      <input
        type="file"
        ref={hiddenFileInputRef}
        onChange={handleFileImport}
        accept=".xlsx, .xls, .json"
        className="hidden"
      />

      {/* Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenAddModal={() => {
          setEditingEquipment(null);
          setIsFormOpen(true);
        }}
        onExportJSON={handleExportJSON}
        onExportCSV={handleExportCSV}
        onImportClick={() => hiddenFileInputRef.current?.click()}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <StatsOverview equipmentList={equipmentList} />

        {viewMode === 'stats' ? (
          <StatsView equipmentList={equipmentList} />
        ) : (
          <>
            <FilterBar
              filters={filters}
              setFilters={setFilters}
              equipmentList={equipmentList}
              onResetFilters={handleResetFilters}
              resultsCount={filteredEquipment.length}
            />

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((equipment) => (
                  <EquipmentCard
                    key={equipment.id}
                    equipment={equipment}
                    onSelect={(eq) => setSelectedEquipment(eq)}
                    onEdit={(eq) => {
                      setEditingEquipment(eq);
                      setIsFormOpen(true);
                    }}
                    onDelete={handleDeleteEquipment}
                    onOpenQRCode={(eq) => setQrModalEquipment(eq)}
                  />
                ))}
              </div>
            ) : (
              <EquipmentTable
                equipmentList={filteredEquipment}
                onSelect={(eq) => setSelectedEquipment(eq)}
                onEdit={(eq) => {
                  setEditingEquipment(eq);
                  setIsFormOpen(true);
                }}
                onDelete={handleDeleteEquipment}
                onOpenQRCode={(eq) => setQrModalEquipment(eq)}
              />
            )}

            {filteredEquipment.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 mt-6">
                Aucun équipement ne correspond à vos critères de recherche.
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12 space-y-1">
        <p>Réseau de Transport d'Électricité. Application de Gestion du Catalogue des Modèles d'Équipements.</p>
        <p className="font-medium text-slate-700">Copyright © Philippe DOUKHAN — 06 51 64 67 42</p>
      </footer>

      {/* Detail Modal */}
      <EquipmentDetailModal
        equipment={selectedEquipment}
        onClose={() => setSelectedEquipment(null)}
        onEdit={(eq) => {
          setEditingEquipment(eq);
          setIsFormOpen(true);
        }}
        onOpenQRCode={(eq) => setQrModalEquipment(eq)}
      />

      {/* Add / Edit Form Modal */}
      <EquipmentFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEquipment(null);
        }}
        onSave={handleSaveEquipment}
        initialEquipment={editingEquipment}
      />

      {/* QR Code Zoom Modal */}
      <QRCodeZoomModal
        equipment={qrModalEquipment}
        onClose={() => setQrModalEquipment(null)}
      />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

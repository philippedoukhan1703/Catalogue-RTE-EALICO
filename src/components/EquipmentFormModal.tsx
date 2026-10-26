import React, { useState, useEffect } from 'react';
import { Equipment, Control } from '../types';
import { X, Plus, Trash2, Save } from 'lucide-react';

interface EquipmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (equipment: Equipment) => void;
  initialEquipment?: Equipment | null;
}

export const EquipmentFormModal: React.FC<EquipmentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialEquipment,
}) => {
  const [formData, setFormData] = useState<Partial<Equipment>>({
    "Classification Ealico": "Postes Électriques",
    "Type Ealico": "",
    "Code modèle": "",
    "Désignation Modèle": "",
    Commentaire: "",
    "Equipes concernées": ["EEL"],
    "Nb éléments": 1,
    "Lien photo": "",
    "Obligatoire Ealico": "Oui",
    "Fiche Technique": "",
    Contrôles: [],
  });

  const [newControl, setNewControl] = useState<Control>({
    Désignation: "",
    Périodicité: "Annuelle",
    Type: "Visuel",
  });

  useEffect(() => {
    if (initialEquipment) {
      setFormData(initialEquipment);
    } else {
      setFormData({
        "Classification Ealico": "Postes Électriques",
        "Type Ealico": "",
        "Code modèle": "",
        "Désignation Modèle": "",
        Commentaire: "",
        "Equipes concernées": ["EEL"],
        "Nb éléments": 1,
        "Lien photo": "",
        "Obligatoire Ealico": "Oui",
        "Fiche Technique": "",
        Contrôles: [],
      });
    }
  }, [initialEquipment, isOpen]);

  if (!isOpen) return null;

  const handleAddControl = () => {
    if (!newControl.Désignation.trim()) return;
    setFormData((prev) => ({
      ...prev,
      Contrôles: [...(prev.Contrôles || []), newControl],
    }));
    setNewControl({ Désignation: "", Périodicité: "Annuelle", Type: "Visuel" });
  };

  const handleRemoveControl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      Contrôles: prev.Contrôles?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData["Code modèle"] || !formData["Désignation Modèle"]) {
      alert("Veuillez remplir au moins le code modèle et la désignation.");
      return;
    }

    const equipmentToSave: Equipment = {
      id: initialEquipment ? initialEquipment.id : `eq-${Date.now()}`,
      "Classification Ealico": formData["Classification Ealico"] || "Postes Électriques",
      "Type Ealico": formData["Type Ealico"] || "Standard",
      "Code modèle": formData["Code modèle"] || "",
      "Désignation Modèle": formData["Désignation Modèle"] || "",
      Commentaire: formData.Commentaire || "",
      "Equipes concernées": formData["Equipes concernées"] || ["EEL"],
      "Nb éléments": Number(formData["Nb éléments"]) || 1,
      "Lien photo": formData["Lien photo"] || "",
      "Obligatoire Ealico": formData["Obligatoire Ealico"] || "Oui",
      "Fiche Technique": formData["Fiche Technique"] || "",
      Contrôles: formData.Contrôles || [],
    };

    onSave(equipmentToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {initialEquipment ? "Modifier le Modèle" : "Ajouter un Modèle d'Équipement"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Code Modèle *
              </label>
              <input
                type="text"
                required
                value={formData["Code modèle"] || ""}
                onChange={(e) => setFormData({ ...formData, "Code modèle": e.target.value })}
                placeholder="Ex: DJ-400-SF6"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Désignation Modèle *
              </label>
              <input
                type="text"
                required
                value={formData["Désignation Modèle"] || ""}
                onChange={(e) => setFormData({ ...formData, "Désignation Modèle": e.target.value })}
                placeholder="Ex: Disjoncteur 400kV"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Classification Ealico (Thématique)
              </label>
              <input
                type="text"
                value={formData["Classification Ealico"] || ""}
                onChange={(e) => setFormData({ ...formData, "Classification Ealico": e.target.value })}
                placeholder="Ex: Postes Électriques"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Type Ealico
              </label>
              <input
                type="text"
                value={formData["Type Ealico"] || ""}
                onChange={(e) => setFormData({ ...formData, "Type Ealico": e.target.value })}
                placeholder="Ex: Disjoncteur Haute Tension"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Équipes (séparées par virgule)
              </label>
              <input
                type="text"
                value={formData["Equipes concernées"]?.join(', ') || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    "Equipes concernées": e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="EEL, EMSP"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre d'éléments
              </label>
              <input
                type="number"
                min="1"
                value={formData["Nb éléments"] || 1}
                onChange={(e) => setFormData({ ...formData, "Nb éléments": parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Obligatoire Ealico
              </label>
              <select
                value={formData["Obligatoire Ealico"] || "Oui"}
                onChange={(e) => setFormData({ ...formData, "Obligatoire Ealico": e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="Oui">Oui</option>
                <option value="N">Non (N)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fiche Technique RTE
              </label>
              <input
                type="text"
                value={formData["Fiche Technique"] || ""}
                onChange={(e) => setFormData({ ...formData, "Fiche Technique": e.target.value })}
                placeholder="Ex: FT-RTE-400-01"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lien Photo (URL)
              </label>
              <input
                type="url"
                value={formData["Lien photo"] || ""}
                onChange={(e) => setFormData({ ...formData, "Lien photo": e.target.value })}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Commentaire / Exemples
            </label>
            <textarea
              rows={2}
              value={formData.Commentaire || ""}
              onChange={(e) => setFormData({ ...formData, Commentaire: e.target.value })}
              placeholder="Précisions sur le modèle..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Controls Management Section */}
          <div className="pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Contrôles Associés
            </h3>

            <div className="space-y-2 mb-3">
              {formData.Contrôles?.map((ctrl, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-900">{ctrl.Désignation}</span>
                    <span className="text-slate-500 ml-2">({ctrl.Périodicité} - {ctrl.Type})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveControl(idx)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  placeholder="Désignation du contrôle"
                  value={newControl.Désignation}
                  onChange={(e) => setNewControl({ ...newControl, Désignation: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                />
              </div>
              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="Périodicité (ex: Annuelle)"
                  value={newControl.Périodicité}
                  onChange={(e) => setNewControl({ ...newControl, Périodicité: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                />
              </div>
              <div className="sm:col-span-3">
                <input
                  type="text"
                  placeholder="Type (ex: Visuel)"
                  value={newControl.Type}
                  onChange={(e) => setNewControl({ ...newControl, Type: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md"
                />
              </div>
              <div className="sm:col-span-1 flex items-center">
                <button
                  type="button"
                  onClick={handleAddControl}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center"
                  title="Ajouter le contrôle"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

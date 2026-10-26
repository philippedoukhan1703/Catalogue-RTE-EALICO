import React from 'react';
import { Equipment } from '../types';
import { Eye, Edit2, Trash2, ShieldCheck, QrCode, Image as ImageIcon } from 'lucide-react';

interface EquipmentTableProps {
  equipmentList: Equipment[];
  onSelect: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: string) => void;
  onOpenQRCode: (equipment: Equipment) => void;
  onOpenPhoto: (photoUrl: string, title: string, code: string) => void;
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipmentList,
  onSelect,
  onEdit,
  onDelete,
  onOpenQRCode,
  onOpenPhoto,
}) => {
  if (equipmentList.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
        Aucun équipement trouvé.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-4 w-16 text-center">Photo</th>
              <th className="py-3 px-4">Code Modèle</th>
              <th className="py-3 px-4">Désignation</th>
              <th className="py-3 px-4">Thématique</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Équipes</th>
              <th className="py-3 px-4 text-center">Éléments</th>
              <th className="py-3 px-4 text-center">Obligatoire</th>
              <th className="py-3 px-4 text-center">Contrôles</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {equipmentList.map((eq) => {
              const isMandatory = eq["Obligatoire Ealico"] !== "N";
              return (
                <tr
                  key={eq.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Photo Column */}
                  <td className="py-2 px-4 text-center">
                    {eq["Lien photo"] ? (
                      <div
                        onClick={() => onOpenPhoto(eq["Lien photo"], eq["Désignation Modèle"], eq["Code modèle"])}
                        className="w-10 h-10 mx-auto bg-slate-100 rounded border border-slate-200 flex items-center justify-center cursor-zoom-in overflow-hidden group/thumb"
                        title="Cliquer pour zoomer la photo"
                      >
                        <img
                          src={eq["Lien photo"]}
                          alt={eq["Désignation Modèle"]}
                          className="w-full h-full object-contain group-hover/thumb:scale-110 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <span className="text-slate-300 text-xs">-</span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-base text-blue-900 whitespace-nowrap">
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(eq["Code modèle"]);
                        alert(`Code ${eq["Code modèle"]} copié dans le presse-papier !`);
                      }}
                      title="Cliquer pour copier le code"
                      className="cursor-pointer hover:text-blue-600 transition-colors inline-block whitespace-nowrap"
                    >
                      {eq["Code modèle"]}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <button
                      onClick={() => onSelect(eq)}
                      className="hover:text-blue-600 text-left transition-colors block w-full leading-snug"
                    >
                      {eq["Désignation Modèle"]}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-slate-600 text-xs">
                    {eq["Classification Ealico"]}
                  </td>

                  <td className="py-3 px-4 text-slate-600 text-xs">
                    {eq["Type Ealico"]}
                  </td>

                  <td className="py-3 px-4 text-xs font-medium text-slate-800 whitespace-nowrap">
                    {eq["Equipes concernées"]?.join(', ') || '-'}
                  </td>

                  <td className="py-3 px-4 text-center font-mono tabular-nums">
                    {eq["Nb éléments"]}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {isMandatory ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <ShieldCheck className="w-3 h-3" /> Oui
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Non</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-center font-mono tabular-nums text-blue-600 font-medium">
                    {eq.Contrôles?.length || 0}
                  </td>

                  <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => onSelect(eq)}
                      title="Voir les détails"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOpenQRCode(eq)}
                      title="Afficher le QR Code zoomable"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(eq)}
                      title="Modifier"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(eq.id)}
                      title="Supprimer"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

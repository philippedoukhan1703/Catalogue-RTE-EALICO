import React from 'react';
import { Equipment } from '../types';
import { Wrench, ShieldAlert, ShieldCheck, FileText, Edit2, Trash2, Eye, Layers, QrCode, Image as ImageIcon } from 'lucide-react';

interface EquipmentCardProps {
  equipment: Equipment;
  onSelect: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
  onDelete: (id: string) => void;
  onOpenQRCode: (equipment: Equipment) => void;
  onOpenPhoto: (photoUrl: string, title: string, code: string) => void;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({
  equipment,
  onSelect,
  onEdit,
  onDelete,
  onOpenQRCode,
  onOpenPhoto,
}) => {
  const isMandatory = equipment["Obligatoire Ealico"] !== "N";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Top Media / Thumbnail Area (Entire & Zoomable) */}
      <div className="relative h-48 bg-slate-900/5 overflow-hidden flex items-center justify-center p-2 border-b border-slate-100">
        {equipment["Lien photo"] ? (
          <div
            onClick={() => onOpenPhoto(equipment["Lien photo"], equipment["Désignation Modèle"], equipment["Code modèle"])}
            className="w-full h-full flex items-center justify-center cursor-zoom-in group/img"
            title="Cliquer pour zoomer la photo"
          >
            <img
              src={equipment["Lien photo"]}
              alt={equipment["Désignation Modèle"]}
              className="max-h-full max-w-full object-contain group-hover/img:scale-105 transition-transform duration-300 rounded"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
              <ImageIcon className="w-4 h-4" />
              <span>Zoomer</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <Layers className="w-12 h-12 stroke-1" />
          </div>
        )}

        <div
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(equipment["Code modèle"]);
            alert(`Code ${equipment["Code modèle"]} copié dans le presse-papier !`);
          }}
          title="Cliquer pour copier le code"
          className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-sm font-mono font-bold shadow-sm cursor-pointer hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          {equipment["Code modèle"]}
        </div>

        <div className="absolute top-3 left-3">
          {isMandatory ? (
            <span className="flex items-center gap-1 bg-emerald-600/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Obligatoire
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-slate-700/90 backdrop-blur-xs text-slate-200 px-2.5 py-1 rounded-md text-xs font-medium">
              Optionnel
            </span>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed clean metadata (No pills) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
            <span>{equipment["Classification Ealico"]}</span>
            <span aria-hidden="true">·</span>
            <span>{equipment["Type Ealico"]}</span>
          </div>

          <h3
            onClick={() => onSelect(equipment)}
            className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors mb-2 leading-snug"
          >
            {equipment["Désignation Modèle"]}
          </h3>

          {equipment.Commentaire && (
            <p className="text-xs text-slate-600 line-clamp-2 mb-4">
              {equipment.Commentaire}
            </p>
          )}

          {/* Details list */}
          <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Équipes :</span>
              <span className="font-semibold text-slate-800">
                {equipment["Equipes concernées"]?.join(', ') || 'Non spécifiée'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Nb éléments :</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {equipment["Nb éléments"]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Contrôles :</span>
              <span className="font-semibold text-blue-600 tabular-nums">
                {equipment.Contrôles?.length || 0} associé(s)
              </span>
            </div>
            {equipment["Fiche Technique"] && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Fiche Tech :</span>
                <span className="font-mono text-slate-700">
                  {equipment["Fiche Technique"]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Actions Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
          <button
            onClick={() => onSelect(equipment)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Détails</span>
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onOpenQRCode(equipment)}
              title="Afficher le QR Code zoomable"
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(equipment)}
              title="Modifier"
              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(equipment.id)}
              title="Supprimer"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

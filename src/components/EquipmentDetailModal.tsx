import React from 'react';
import { Equipment } from '../types';
import { X, ShieldCheck, Wrench, FileText, Layers, Users, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface EquipmentDetailModalProps {
  equipment: Equipment | null;
  onClose: () => void;
  onEdit: (equipment: Equipment) => void;
  onOpenQRCode: (equipment: Equipment) => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  equipment,
  onClose,
  onEdit,
  onOpenQRCode,
}) => {
  if (!equipment) return null;

  const isMandatory = equipment["Obligatoire Ealico"] !== "N";
  const qrValue = JSON.stringify({
    code: equipment["Code modèle"],
    designation: equipment["Désignation Modèle"],
    thematique: equipment["Classification Ealico"],
    fiche: equipment["Fiche Technique"]
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              onClick={() => {
                navigator.clipboard.writeText(equipment["Code modèle"]);
                alert(`Code ${equipment["Code modèle"]} copié dans le presse-papier !`);
              }}
              title="Cliquer pour copier le code"
              className="font-mono bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-base font-bold shadow-sm cursor-pointer transition-colors inline-block"
            >
              {equipment["Code modèle"]}
            </span>
            <h2 className="text-lg font-bold truncate">
              {equipment["Désignation Modèle"]}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Photo & QR Code banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {equipment["Lien photo"] ? (
              <div className="md:col-span-2 relative h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={equipment["Lien photo"]}
                  alt={equipment["Désignation Modèle"]}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="md:col-span-2 h-56 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 border border-slate-200">
                <Layers className="w-12 h-12 stroke-1" />
              </div>
            )}

            {/* Clickable QR Code Thumbnail */}
            <div
              onClick={() => onOpenQRCode(equipment)}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center cursor-pointer group hover:border-blue-500 hover:bg-blue-50/20 transition-all"
              title="Cliquer pour zoomer le QR Code"
            >
              <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs group-hover:scale-105 transition-transform mb-2">
                <QRCodeSVG value={qrValue} size={110} level="M" />
              </div>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 mt-1">
                <QrCode className="w-3.5 h-3.5" />
                Zoomer QR Code
              </span>
            </div>
          </div>

          {/* Classification & Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                Thématique Ealico
              </span>
              <span className="text-sm font-bold text-slate-900">
                {equipment["Classification Ealico"] || 'Non spécifiée'}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                Type Ealico
              </span>
              <span className="text-sm font-bold text-slate-900">
                {equipment["Type Ealico"] || 'Non spécifié'}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-xs font-medium text-slate-500 block mb-1">
                Obligatoire Ealico
              </span>
              <span className={`text-sm font-bold flex items-center gap-1 ${isMandatory ? 'text-emerald-600' : 'text-slate-600'}`}>
                {isMandatory ? <ShieldCheck className="w-4 h-4" /> : null}
                {isMandatory ? 'Oui (Obligatoire)' : 'Non (Optionnel)'}
              </span>
            </div>
          </div>

          {/* Secondary details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500 block mb-0.5">
                  Équipes Concernées
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {equipment["Equipes concernées"]?.join(', ') || 'Non spécifiée'}
                </span>
              </div>
              <Users className="w-5 h-5 text-slate-400" />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500 block mb-0.5">
                  Nombre d'éléments
                </span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  {equipment["Nb éléments"]}
                </span>
              </div>
              <Layers className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Fiche Technique & Commentaire */}
          {(equipment["Fiche Technique"] || equipment.Commentaire) && (
            <div className="space-y-4">
              {equipment["Fiche Technique"] && (
                <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-900">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="text-xs font-medium block text-blue-700">Fiche Technique RTE</span>
                      <span className="text-sm font-mono font-semibold">{equipment["Fiche Technique"]}</span>
                    </div>
                  </div>
                </div>
              )}

              {equipment.Commentaire && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-medium text-slate-500 block mb-1">
                    Commentaire / Exemples
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {equipment.Commentaire}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Contrôles Associés */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Contrôles Associés ({equipment.Contrôles?.length || 0})
              </h3>
            </div>

            {equipment.Contrôles && equipment.Contrôles.length > 0 ? (
              <div className="space-y-3">
                {equipment.Contrôles.map((control, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">
                        {control.Désignation}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Type: <span className="text-slate-700 font-medium">{control.Type}</span>
                      </p>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200 self-start sm:self-auto">
                      Périodicité : {control.Périodicité}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                Aucun contrôle associé à ce modèle.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              onEdit(equipment);
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Modifier ce modèle
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-300 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

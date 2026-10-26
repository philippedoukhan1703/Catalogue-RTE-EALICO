import React from 'react';
import { Equipment } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { X, Download, Printer, QrCode } from 'lucide-react';

interface QRCodeZoomModalProps {
  equipment: Equipment | null;
  onClose: () => void;
}

export const QRCodeZoomModal: React.FC<QRCodeZoomModalProps> = ({ equipment, onClose }) => {
  if (!equipment) return null;

  const qrValue = JSON.stringify({
    code: equipment["Code modèle"],
    designation: equipment["Désignation Modèle"],
    thematique: equipment["Classification Ealico"],
    fiche: equipment["Fiche Technique"]
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const svgElement = document.getElementById('rte-equipment-qr-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `QR_${equipment["Code modèle"]}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 flex flex-col items-center text-center relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">
          QR Code d'Identification
        </h3>
        <div
          onClick={() => {
            navigator.clipboard.writeText(equipment["Code modèle"]);
            alert(`Code ${equipment["Code modèle"]} copié dans le presse-papier !`);
          }}
          title="Cliquer pour copier le code"
          className="text-xl font-bold font-mono text-blue-900 mb-6 bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-xl border border-blue-200 cursor-pointer transition-colors shadow-2xs"
        >
          {equipment["Code modèle"]}
          <span className="block text-[10px] font-sans font-normal text-slate-500">Cliquer pour copier</span>
        </div>

        {/* Zoomable / Large QR Code container */}
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm mb-6 flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-zoom-in">
          <QRCodeSVG
            id="rte-equipment-qr-svg"
            value={qrValue}
            size={220}
            level="H"
            includeMargin={true}
          />
        </div>

        <div className="w-full bg-slate-50 p-3 rounded-xl border border-slate-200 text-left mb-6 space-y-1">
          <p className="text-xs font-semibold text-slate-800 truncate">
            {equipment["Désignation Modèle"]}
          </p>
          <p className="text-xs text-slate-500">
            Thématique : <span className="font-medium text-slate-700">{equipment["Classification Ealico"]}</span>
          </p>
          {equipment["Fiche Technique"] && (
            <p className="text-xs text-slate-500">
              Fiche Tech : <span className="font-mono text-slate-700">{equipment["Fiche Technique"]}</span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger PNG</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

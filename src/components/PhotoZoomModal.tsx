import React, { useState } from 'react';
import { X, Image as ImageIcon, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface PhotoZoomModalProps {
  photoUrl: string | null;
  title: string;
  code: string;
  onClose: () => void;
}

export const PhotoZoomModal: React.FC<PhotoZoomModalProps> = ({
  photoUrl,
  title,
  code,
  onClose,
}) => {
  const [scale, setScale] = useState<number>(1); // Default Auto (100% / Ajusté)
  const [isAutoFit, setIsAutoFit] = useState<boolean>(true);

  if (!photoUrl) return null;

  const handleZoomIn = () => {
    setIsAutoFit(false);
    setScale((prev) => Math.min(prev + 0.5, 6));
  };

  const handleZoomOut = () => {
    setIsAutoFit(false);
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleAutoFit = () => {
    setIsAutoFit(true);
    setScale(1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between overflow-hidden animate-in fade-in duration-200">
      {/* Top Floating Bar (Standard position top-4) */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between text-white bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-xl border border-slate-800 shadow-2xl max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3 overflow-hidden">
          <ImageIcon className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="font-mono bg-blue-600 px-3 py-1 rounded-lg text-sm font-bold shrink-0">
            {code}
          </span>
          <h3 className="text-sm sm:text-base font-semibold truncate">
            {title}
          </h3>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          <button
            onClick={handleZoomOut}
            className="p-1 text-slate-300 hover:text-white transition-colors"
            title="Zoom moins"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleAutoFit}
            className={`px-2 py-0.5 text-xs font-mono font-bold rounded transition-colors ${
              isAutoFit ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Ajuster automatiquement à l'écran"
          >
            Auto ({Math.round(scale * 100)}%)
          </button>

          <button
            onClick={handleZoomIn}
            className="p-1 text-slate-300 hover:text-white transition-colors"
            title="Zoom plus"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleAutoFit}
            className="p-1 text-slate-300 hover:text-white transition-colors ml-1 border-l border-slate-700 pl-2"
            title="Ajuster l'image"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0 ml-2"
          title="Fermer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Image Container positioned lower vertically (pt-24 to push photo down) */}
      <div className="absolute inset-0 w-full h-full overflow-auto flex items-center justify-center pt-24 pb-8 px-8">
        <div className="min-w-full min-h-full flex items-center justify-center">
          {isAutoFit ? (
            <img
              src={photoUrl}
              alt={title}
              className="max-w-[90vw] max-h-[75vh] object-contain rounded-xl shadow-2xl transition-all duration-200"
              referrerPolicy="no-referrer"
            />
          ) : (
            <img
              src={photoUrl}
              alt={title}
              style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
              className="transition-transform duration-200 object-contain rounded-xl shadow-2xl cursor-grab active:cursor-grabbing"
              referrerPolicy="no-referrer"
            />
          )}
        </div>
      </div>
    </div>
  );
};

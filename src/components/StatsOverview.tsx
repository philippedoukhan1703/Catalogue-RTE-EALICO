import React from 'react';
import { Equipment } from '../types';
import { Layers, ShieldCheck, Wrench, Users } from 'lucide-react';

interface StatsOverviewProps {
  equipmentList: Equipment[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ equipmentList }) => {
  const totalModels = equipmentList.length;
  const mandatoryCount = equipmentList.filter(
    (e) => e["Obligatoire Ealico"] !== "N"
  ).length;
  
  const totalControls = equipmentList.reduce(
    (acc, e) => acc + (e.Contrôles ? e.Contrôles.length : 0),
    0
  );

  const uniqueTeams = new Set<string>();
  equipmentList.forEach((e) => {
    e["Equipes concernées"]?.forEach((t) => uniqueTeams.add(t));
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Modèles d'Équipements
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {totalModels}
          </p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Layers className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Obligatoires Ealico
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {mandatoryCount} <span className="text-xs font-normal text-slate-400">({Math.round((mandatoryCount / (totalModels || 1)) * 100)}%)</span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Contrôles Associés
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {totalControls}
          </p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <Wrench className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Équipes Impliquées
          </p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {uniqueTeams.size}
          </p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
          <Users className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

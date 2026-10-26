import React from 'react';
import { Equipment } from '../types';
import { Layers, ShieldCheck, Wrench, Users, BarChart2 } from 'lucide-react';

interface StatsViewProps {
  equipmentList: Equipment[];
}

export const StatsView: React.FC<StatsViewProps> = ({ equipmentList }) => {
  const totalModels = equipmentList.length;
  const mandatoryCount = equipmentList.filter(
    (e) => e["Obligatoire Ealico"] !== "N"
  ).length;
  const optionalCount = totalModels - mandatoryCount;

  // Group by Thématique
  const thematiqueCounts: Record<string, number> = {};
  equipmentList.forEach((e) => {
    const th = e["Classification Ealico"] || "Non spécifiée";
    thematiqueCounts[th] = (thematiqueCounts[th] || 0) + 1;
  });

  // Group by Team
  const teamCounts: Record<string, number> = {};
  equipmentList.forEach((e) => {
    e["Equipes concernées"]?.forEach((team) => {
      teamCounts[team] = (teamCounts[team] || 0) + 1;
    });
  });

  // Total controls
  const totalControls = equipmentList.reduce(
    (acc, e) => acc + (e.Contrôles ? e.Contrôles.length : 0),
    0
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Analyse et Synthèse du Catalogue RTE
            </h2>
            <p className="text-xs text-slate-500">
              Répartition par thématique, réglementations Ealico et équipes opérationnelles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Total Modèles
            </span>
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {totalModels}
            </span>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Modèles Obligatoires Ealico
            </span>
            <span className="text-3xl font-bold text-emerald-600 tabular-nums">
              {mandatoryCount}
            </span>
          </div>
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Modèles Optionnels
            </span>
            <span className="text-3xl font-bold text-slate-600 tabular-nums">
              {optionalCount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* By Thématique */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Répartition par Thématique Ealico
            </h3>
            <div className="space-y-3">
              {Object.entries(thematiqueCounts).map(([th, count]) => {
                const percentage = Math.round((count / (totalModels || 1)) * 100);
                return (
                  <div key={th} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>{th}</span>
                      <span className="tabular-nums font-semibold text-slate-900">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* By Team */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-600" />
              Implication par Équipe Opérationnelle
            </h3>
            <div className="space-y-3">
              {Object.entries(teamCounts).map(([team, count]) => {
                const percentage = Math.round((count / (totalModels || 1)) * 100);
                return (
                  <div key={team} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>Équipe {team}</span>
                      <span className="tabular-nums font-semibold text-slate-900">
                        {count} modèle(s)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

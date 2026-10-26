import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { FilterState, Equipment } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  equipmentList: Equipment[];
  onResetFilters: () => void;
  resultsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  equipmentList,
  onResetFilters,
  resultsCount,
}) => {
  // Extract unique options
  const thematiques = Array.from(
    new Set(equipmentList.map((e) => e["Classification Ealico"]).filter(Boolean))
  ).sort();

  const types = Array.from(
    new Set(equipmentList.map((e) => e["Type Ealico"]).filter(Boolean))
  ).sort();

  const allTeams = Array.from(
    new Set(
      equipmentList.flatMap((e) => e["Equipes concernées"] || []).filter(Boolean)
    )
  ).sort();

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par code, désignation, mots-clés..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {/* Thématique Filter */}
          <select
            value={filters.thematique}
            onChange={(e) => setFilters((prev) => ({ ...prev, thematique: e.target.value }))}
            className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Toutes thématiques</option>
            {thematiques.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Tous les types</option>
            {types.map((tp) => (
              <option key={tp} value={tp}>
                {tp}
              </option>
            ))}
          </select>

          {/* Team Filter */}
          <select
            value={filters.equipe}
            onChange={(e) => setFilters((prev) => ({ ...prev, equipe: e.target.value }))}
            className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Toutes les équipes</option>
            {allTeams.map((eq) => (
              <option key={eq} value={eq}>
                Équipe {eq}
              </option>
            ))}
          </select>

          {/* Obligatoire Filter */}
          <select
            value={filters.obligatoire}
            onChange={(e) => setFilters((prev) => ({ ...prev, obligatoire: e.target.value }))}
            className="px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Obligatoire Ealico</option>
            <option value="Oui">Oui (Obligatoire)</option>
            <option value="Non">Non (Optionnel)</option>
          </select>
        </div>
      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold text-slate-900 tabular-nums">{resultsCount}</span>{' '}
          équipement(s) correspondant aux critères
        </div>
        {(filters.search || filters.thematique || filters.type || filters.equipe || filters.obligatoire) && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Réinitialiser les filtres</span>
          </button>
        )}
      </div>
    </div>
  );
};

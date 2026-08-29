import React, { useState } from "react";
import { PHYSICS_FORMULAS } from "../../data/scienceData";
import { Search, Copy, Check, Zap, Sparkles } from "lucide-react";

export function PhysicsFormulaFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    "All Categories",
    ...Array.from(new Set(PHYSICS_FORMULAS.map((f) => f.category)))
  ];

  const filtered = PHYSICS_FORMULAS.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.formula && item.formula.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.explanation && item.explanation.toLowerCase().includes(q)) ||
      (item.variables && item.variables.some((v) =>
        (v.symbol && v.symbol.toLowerCase().includes(q)) ||
        (v.meaning && v.meaning.toLowerCase().includes(q))
      ));

    const matchesCat =
      selectedCategory === "All Categories" || item.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            NCERT Physics Formula & Derivation Directory
          </h2>
          <p className="text-xs text-slate-500">
            Formula reference with SI units, dimensional representations & board numericals
          </p>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 self-start sm:self-auto">
          Class 9-12 • JEE & NEET
        </span>
      </div>

      {/* Search & Category Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search physics formula (e.g. Coulomb, Lens Maker, Kinematics, Photoelectric)..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="space-y-4">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Found {filtered.length} Formulas & Principles
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleCopy(`phy-${idx}`, `${item.name}: ${item.formula}`)}
                      className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      {copiedId === `phy-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900">
                    {item.name}
                  </h3>

                  {/* Formula mathematical box */}
                  <div className="my-2.5 p-3 bg-slate-900 text-blue-300 rounded-xl font-mono text-xs sm:text-sm font-bold text-center overflow-x-auto shadow-inner">
                    {item.formula}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.explanation}
                  </p>
                </div>

                {/* Variable Breakdown list */}
                {item.variables && item.variables.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-500">
                    <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                      Variables & SI Units:
                    </span>
                    <ul className="space-y-0.5">
                      {(item.variables || []).map((v, vIdx) => (
                        <li key={vIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="font-mono font-bold text-blue-700 shrink-0">{v.symbol}:</span>
                          <span>{v.meaning} ({v.unit})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Example Problem if present */}
                {item.exampleProblem && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1 text-slate-700">
                    <span className="font-bold text-slate-900 block">CBSE Board Exam Numerical:</span>
                    <p className="text-slate-600">{item.exampleProblem.problem}</p>
                    <div className="font-mono text-emerald-700 font-bold pt-1">
                      Ans: {item.exampleProblem.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-500 text-sm">
            No formulas found matching "{searchQuery}". Try searching for 'Coulomb' or 'Kinematics'.
          </div>
        )}
      </div>
    </div>
  );
}

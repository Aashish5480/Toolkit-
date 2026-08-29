import React, { useState } from "react";
import { BIOLOGY_CONCEPTS } from "../../data/scienceData";
import { Search, Sparkles, BookOpen, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export function BiologyConceptFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(BIOLOGY_CONCEPTS[0]?.id || null);

  const filteredConcepts = BIOLOGY_CONCEPTS.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.chapter && item.chapter.toLowerCase().includes(q)) ||
      (item.summary && item.summary.toLowerCase().includes(q)) ||
      (item.mechanism && item.mechanism.some((p) => p && p.toLowerCase().includes(q))) ||
      (item.keyTerms && item.keyTerms.some((k) => k && k.toLowerCase().includes(q)));

    const matchesClass =
      selectedClass === "All" || (item.classLevel && item.classLevel.includes(selectedClass));

    return matchesSearch && matchesClass;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            NCERT Biology High-Yield Concept Explainer
          </h2>
          <p className="text-xs text-slate-500">
            Master critical biological processes, key bullet points, diagram requirements & common exam pitfalls
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start sm:self-auto">
          CBSE & NEET High-Yield
        </span>
      </div>

      {/* Search & Class Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concept (e.g. Lac Operon, Photosynthesis, PCR, Double Fertilisation)..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Classes (9 - 12)</option>
            <option value="Class 12">Class 12 NCERT Concepts</option>
            <option value="Class 11">Class 11 NCERT Concepts</option>
            <option value="Class 10">Class 10 NCERT Concepts</option>
          </select>
        </div>
      </div>

      {/* Concept Cards */}
      <div className="space-y-4">
        {filteredConcepts.map((concept) => {
          const isExpanded = expandedId === concept.id;

          return (
            <div
              key={concept.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all hover:border-emerald-300"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                className="w-full p-4 sm:p-5 flex items-start justify-between text-left gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {concept.classLevel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {concept.chapter}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {concept.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1">
                    {concept.summary}
                  </p>
                </div>

                <div className="p-1 rounded-lg text-slate-400 bg-white border border-slate-200 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="p-5 sm:p-6 border-t border-slate-100 space-y-4 bg-white">
                  {/* Summary */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Comprehensive Concept Overview
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {concept.summary}
                    </p>
                  </div>

                  {/* Mechanism / Steps */}
                  {concept.mechanism && concept.mechanism.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                        Mechanism & Step-by-Step Pathway
                      </h4>
                      <ul className="space-y-2">
                        {(concept.mechanism || []).map((pt, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Terms */}
                  {concept.keyTerms && concept.keyTerms.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        High-Yield Keywords & Terminology
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(concept.keyTerms || []).map((term, idx) => (
                          <span key={idx} className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md border border-slate-200">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* NEET Tips & High Yield Advice */}
                  {concept.neetTips && (
                    <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>High-Yield Board & NEET Exam Tip:</span>
                      </div>
                      <p className="text-xs text-amber-950 leading-relaxed">
                        {concept.neetTips}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { BIOLOGY_GLOSSARY } from "../../data/scienceData";
import { Search, BookOpen, Filter, Sparkles, Tag, ChevronRight } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const CATEGORIES = [
  "All Categories",
  "Genetics & Molecular Biology",
  "Human Physiology",
  "Cell Biology",
  "Ecology & Environment",
  "Botany",
  "Botany / Plant Physiology",
];

export function BiologyGlossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const filteredTerms = BIOLOGY_GLOSSARY.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      (item.term && item.term.toLowerCase().includes(q)) ||
      (item.definition && item.definition.toLowerCase().includes(q)) ||
      (item.examRelevance && item.examRelevance.toLowerCase().includes(q)) ||
      (item.keyPoints && item.keyPoints.some((k) => k && k.toLowerCase().includes(q)));

    const matchesLetter =
      selectedLetter === "All" ||
      (item.term && item.term.toUpperCase().startsWith(selectedLetter));

    const matchesCategory =
      selectedCategory === "All Categories" ||
      item.category === selectedCategory ||
      (item.category && item.category.includes(selectedCategory));

    return matchesSearch && matchesLetter && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            NCERT Biology Glossary A to Z
          </h2>
          <p className="text-xs text-slate-500">
            Authoritative biological dictionary covering Class 9-12 terms, etymologies & exam examples
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start sm:self-auto">
          {BIOLOGY_GLOSSARY.length}+ NCERT Key Terms
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search biological term (e.g. Apomixis, Nephron, RuBisCO)..."
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Alphabet Index Filter */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedLetter("All")}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-colors ${
            selectedLetter === "All"
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All (A-Z)
        </button>
        {ALPHABET.map((letter) => {
          const count = BIOLOGY_GLOSSARY.filter((t) => t.term.toUpperCase().startsWith(letter)).length;
          return (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center justify-center ${
                selectedLetter === letter
                  ? "bg-emerald-600 text-white"
                  : count > 0
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-slate-50 text-slate-300 cursor-not-allowed"
              }`}
              disabled={count === 0}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Glossary Items List */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Showing {filteredTerms.length} Terms
        </div>

        {filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredTerms.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-emerald-300 transition-all space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <h3 className="font-extrabold text-base text-slate-900">
                      {item.term}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.classLevel}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-emerald-700 block mb-2">
                    {item.category}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.definition}
                  </p>

                  {item.keyPoints && item.keyPoints.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {(item.keyPoints || []).map((kp, kIdx) => (
                        <li key={kIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {item.examRelevance && (
                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <span className="font-bold text-slate-700">Exam Context: </span>
                    <span>{item.examRelevance}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-500 text-sm">
            No biological terms found matching "{searchQuery}". Try searching for 'DNA', 'Mitosis', or 'Photosynthesis'.
          </div>
        )}
      </div>
    </div>
  );
}

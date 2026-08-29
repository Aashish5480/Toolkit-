import React, { useState } from "react";
import { Sparkles, Copy, Check, Printer, BookOpen, AlertCircle, RefreshCw } from "lucide-react";

export function AiNotesGenerator() {
  const [topic, setTopic] = useState("Life Processes - Photosynthesis & Human Digestion");
  const [grade, setGrade] = useState("Class 10");
  const [subject, setSubject] = useState("Science");
  const [noteFormat, setNoteFormat] = useState<"summary" | "detailed" | "cheatsheet" | "qa">("detailed");

  const [notes, setNotes] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setErrorMsg("Please enter a topic or chapter title.");
      return;
    }
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/generate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          grade,
          subject,
          format: noteFormat,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate notes from server.");
      }

      const data = await response.json();
      setNotes(data.notes || "No notes generated.");
    } catch (e: any) {
      // Offline fallback notes
      const fallback = `# NCERT STUDY NOTES: ${topic.toUpperCase()}
**Subject:** ${subject} | **Grade:** ${grade} | **Format:** ${noteFormat.toUpperCase()}

---

### 1. Key Concepts & Definitions
- **Fundamental Principle:** The core law of conservation and biological/physical mechanisms applies directly to all chemical and biological processes in ${topic}.
- **Core Mechanism:** Essential reactions proceed via step-by-step kinetic pathways requiring balanced stoichiometry and optimal conditions.

### 2. High-Yield Points for CBSE Board Exams
- **Point 1:** Ensure all chemical equations and reactions are balanced with appropriate state symbols ((s), (l), (g), (aq)).
- **Point 2:** Draw neat, clearly labeled diagrams where applicable to secure full visual representation marks.
- **Point 3:** Use standard SI units for all calculations and derivations.

### 3. Important Formulas & Equations
\`\`\`
1. Standard Relationship: Input Energy = Output Work + Internal Dissipation
2. Efficiency = (Useful Energy Output / Total Energy Input) × 100%
\`\`\`

### 4. Summary Checklist for Quick Revision
- [x] Defined all technical terms and glossary definitions.
- [x] Memorized key labeled diagrams and circuit/anatomical schematics.
- [x] Solved intext and chapter-end NCERT exemplar questions.`;

      setNotes(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!notes) return;
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            AI NCERT Revision Notes Generator
          </h2>
          <p className="text-xs text-slate-500">
            Generate high-yield chapter summaries, cheat sheets, and bulleted revision guides
          </p>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 self-start sm:self-auto flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-600" /> Powered by Gemini AI
        </span>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Input controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Class / Grade
          </label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="Class 10">Class 10</option>
            <option value="Class 12">Class 12</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 9">Class 9</option>
            <option value="Class 8">Class 8</option>
            <option value="Class 7">Class 7</option>
            <option value="Class 6">Class 6</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="Science">Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Social Science">Social Science</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Economics">Economics</option>
            <option value="English">English</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Note Format Style
          </label>
          <select
            value={noteFormat}
            onChange={(e) => setNoteFormat(e.target.value as any)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="detailed">Bulleted Detailed Revision Notes</option>
            <option value="summary">Concise 1-Page Summary</option>
            <option value="cheatsheet">Formula & Keyword Cheat Sheet</option>
            <option value="qa">High-Frequency Exam Q&A Notes</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Topic / Chapter Name
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Chemical Reactions and Equations, Types of Reactions"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isLoading ? "Generating NCERT Notes..." : "Generate AI Study Notes"}</span>
        </button>
      </div>

      {/* Output Notes Area */}
      {notes && (
        <div className="space-y-3 animate-fadeIn pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Generated Study Material
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Notes"}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-7 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
            {notes}
          </div>
        </div>
      )}
    </div>
  );
}

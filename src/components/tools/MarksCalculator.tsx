import React, { useState } from "react";
import { Plus, Trash2, RotateCcw, Calculator, Award, AlertCircle, CheckCircle } from "lucide-react";

interface SubjectDetail {
  id: string;
  name: string;
  theoryObt: string;
  theoryMax: string;
  practicalObt: string;
  practicalMax: string;
}

export function MarksCalculator() {
  const [boardPattern, setBoardPattern] = useState<"cbse10" | "cbse12">("cbse10");
  const [enableBestOf5, setEnableBestOf5] = useState(true);

  const [subjects, setSubjects] = useState<SubjectDetail[]>([
    { id: "1", name: "English Core / Language", theoryObt: "68", theoryMax: "80", practicalObt: "19", practicalMax: "20" },
    { id: "2", name: "Mathematics", theoryObt: "72", theoryMax: "80", practicalObt: "20", practicalMax: "20" },
    { id: "3", name: "Science / Physics", theoryObt: "60", theoryMax: "70", practicalObt: "28", practicalMax: "30" },
    { id: "4", name: "Chemistry / Social Science", theoryObt: "62", theoryMax: "70", practicalObt: "27", practicalMax: "30" },
    { id: "5", name: "Biology / Computer / Hindi", theoryObt: "65", theoryMax: "70", practicalObt: "29", practicalMax: "30" },
    { id: "6", name: "Physical Education (Optional 6th)", theoryObt: "58", theoryMax: "70", practicalObt: "28", practicalMax: "30" },
  ]);

  const [result, setResult] = useState<{
    totalObtained: number;
    totalMax: number;
    percentage: number;
    bestOf5Obtained?: number;
    bestOf5Max?: number;
    bestOf5Percentage?: number;
    division: string;
    hasCompartment: boolean;
    compartmentSubjects: string[];
    subjectBreakdowns: {
      name: string;
      totalObt: number;
      totalMax: number;
      pct: number;
      passed: boolean;
    }[];
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        name: `Subject ${subjects.length + 1}`,
        theoryObt: "",
        theoryMax: boardPattern === "cbse10" ? "80" : "70",
        practicalObt: "",
        practicalMax: boardPattern === "cbse10" ? "20" : "30",
      },
    ]);
  };

  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleCalculate = () => {
    setErrorMsg(null);
    let totObt = 0;
    let totMax = 0;
    const compartments: string[] = [];

    const breakdowns = [];

    for (let i = 0; i < subjects.length; i++) {
      const s = subjects[i];
      const thObt = parseFloat(s.theoryObt) || 0;
      const thMax = parseFloat(s.theoryMax) || 0;
      const prObt = parseFloat(s.practicalObt) || 0;
      const prMax = parseFloat(s.practicalMax) || 0;

      if (thMax <= 0 && prMax <= 0) {
        setErrorMsg(`Please specify valid max marks for ${s.name || `Subject ${i + 1}`}.`);
        setResult(null);
        return;
      }
      if (thObt > thMax || prObt > prMax) {
        setErrorMsg(`Obtained marks cannot exceed maximum marks for ${s.name || `Subject ${i + 1}`}.`);
        setResult(null);
        return;
      }

      const subTotObt = thObt + prObt;
      const subTotMax = thMax + prMax;
      const subPct = (subTotObt / subTotMax) * 100;

      // Passing rule:
      // CBSE Class 10: 33% combined (theory + internal)
      // CBSE Class 12: 33% in theory AND 33% in practical separately!
      let passed = true;
      if (boardPattern === "cbse10") {
        if (subPct < 33) {
          passed = false;
          compartments.push(s.name || `Subject ${i + 1}`);
        }
      } else {
        const thPct = thMax > 0 ? (thObt / thMax) * 100 : 100;
        const prPct = prMax > 0 ? (prObt / prMax) * 100 : 100;
        if (thPct < 33 || prPct < 33) {
          passed = false;
          compartments.push(`${s.name || `Subject ${i + 1}`} (${thPct < 33 ? "Theory < 33%" : "Practical < 33%"})`);
        }
      }

      breakdowns.push({
        name: s.name || `Subject ${i + 1}`,
        totalObt: subTotObt,
        totalMax: subTotMax,
        pct: Number(subPct.toFixed(1)),
        passed,
      });

      totObt += subTotObt;
      totMax += subTotMax;
    }

    const overallPct = (totObt / totMax) * 100;

    // Best of 5 calculation
    let b5Obt: number | undefined;
    let b5Max: number | undefined;
    let b5Pct: number | undefined;

    if (breakdowns.length >= 5) {
      // Sort subjects descending by percentage
      const sorted = [...breakdowns].sort((a, b) => b.pct - a.pct);
      const top5 = sorted.slice(0, 5);
      b5Obt = top5.reduce((sum, item) => sum + item.totalObt, 0);
      b5Max = top5.reduce((sum, item) => sum + item.totalMax, 0);
      b5Pct = Number(((b5Obt / b5Max) * 100).toFixed(2));
    }

    let division = "1st Division";
    const refPct = b5Pct || overallPct;
    if (refPct >= 75) division = "1st Division with Distinction";
    else if (refPct >= 60) division = "1st Division";
    else if (refPct >= 50) division = "2nd Division";
    else if (refPct >= 33) division = "3rd Division";
    else division = "Essential Repeat";

    setResult({
      totalObtained: Number(totObt.toFixed(1)),
      totalMax: totMax,
      percentage: Number(overallPct.toFixed(2)),
      bestOf5Obtained: b5Obt,
      bestOf5Max: b5Max,
      bestOf5Percentage: b5Pct,
      division,
      hasCompartment: compartments.length > 0,
      compartmentSubjects: compartments,
      subjectBreakdowns: breakdowns,
    });
  };

  const handleReset = () => {
    setSubjects([
      { id: "1", name: "English", theoryObt: "", theoryMax: "80", practicalObt: "", practicalMax: "20" },
      { id: "2", name: "Mathematics", theoryObt: "", theoryMax: "80", practicalObt: "", practicalMax: "20" },
      { id: "3", name: "Science", theoryObt: "", theoryMax: "80", practicalObt: "", practicalMax: "20" },
      { id: "4", name: "Social Science", theoryObt: "", theoryMax: "80", practicalObt: "", practicalMax: "20" },
      { id: "5", name: "Hindi / 2nd Lang", theoryObt: "", theoryMax: "80", practicalObt: "", practicalMax: "20" },
    ]);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Theory & Practical Marksheet Calculator
          </h2>
          <p className="text-xs text-slate-500">
            Supports CBSE Class 10 & 12 passing criteria with Best of 5 aggregation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBoardPattern("cbse10")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              boardPattern === "cbse10" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Class 10 (80+20)
          </button>
          <button
            onClick={() => setBoardPattern("cbse12")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              boardPattern === "cbse12" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Class 12 (70+30)
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Subject Input Table */}
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                <th className="pb-2">Subject</th>
                <th className="pb-2 text-center" colSpan={2}>
                  Theory Marks
                </th>
                <th className="pb-2 text-center" colSpan={2}>
                  Practical / Internal
                </th>
                <th className="pb-2 w-8 text-center">Del</th>
              </tr>
              <tr className="text-slate-400 font-medium text-[10px] border-b border-slate-100">
                <th></th>
                <th className="pb-1 text-center">Obt</th>
                <th className="pb-1 text-center">Max</th>
                <th className="pb-1 text-center">Obt</th>
                <th className="pb-1 text-center">Max</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((sub, index) => (
                <tr key={sub.id} className="hover:bg-slate-50/60">
                  <td className="py-2 pr-2 min-w-[140px]">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => {
                        const updated = [...subjects];
                        updated[index].name = e.target.value;
                        setSubjects(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 text-xs"
                      placeholder="Subject Name"
                    />
                  </td>
                  <td className="py-2 px-1 w-16 sm:w-20">
                    <input
                      type="number"
                      value={sub.theoryObt}
                      onChange={(e) => {
                        const updated = [...subjects];
                        updated[index].theoryObt = e.target.value;
                        setSubjects(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-semibold text-slate-800 text-xs text-center"
                      placeholder="Obt"
                    />
                  </td>
                  <td className="py-2 px-1 w-16 sm:w-20">
                    <input
                      type="number"
                      value={sub.theoryMax}
                      onChange={(e) => {
                        const updated = [...subjects];
                        updated[index].theoryMax = e.target.value;
                        setSubjects(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-semibold text-slate-600 text-xs text-center"
                      placeholder="Max"
                    />
                  </td>
                  <td className="py-2 px-1 w-16 sm:w-20">
                    <input
                      type="number"
                      value={sub.practicalObt}
                      onChange={(e) => {
                        const updated = [...subjects];
                        updated[index].practicalObt = e.target.value;
                        setSubjects(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-semibold text-slate-800 text-xs text-center"
                      placeholder="Obt"
                    />
                  </td>
                  <td className="py-2 px-1 w-16 sm:w-20">
                    <input
                      type="number"
                      value={sub.practicalMax}
                      onChange={(e) => {
                        const updated = [...subjects];
                        updated[index].practicalMax = e.target.value;
                        setSubjects(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-semibold text-slate-600 text-xs text-center"
                      placeholder="Max"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => handleRemoveSubject(sub.id)}
                      disabled={subjects.length <= 1}
                      className="p-1 text-slate-400 hover:text-red-600 disabled:opacity-30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleAddSubject}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Additional Subject</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCalculate}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Evaluate Marksheet</span>
            </button>
            <button
              onClick={handleReset}
              className="border border-slate-300 text-slate-700 text-xs font-semibold py-2.5 px-3.5 rounded-xl hover:bg-slate-50 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-slate-800 pb-4">
            <div className="p-3.5 bg-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-400 block font-medium">Aggregate Percentage (All)</span>
              <div className="text-3xl font-extrabold text-blue-400 mt-1">
                {result.percentage}%
              </div>
              <span className="text-[11px] text-slate-400">
                {result.totalObtained} / {result.totalMax} Total Marks
              </span>
            </div>

            {result.bestOf5Percentage && (
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-emerald-500/30">
                <span className="text-xs text-emerald-300 block font-medium">Best of 5 Percentage ⭐</span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                  {result.bestOf5Percentage}%
                </div>
                <span className="text-[11px] text-slate-400">
                  {result.bestOf5Obtained} / {result.bestOf5Max} Marks
                </span>
              </div>
            )}

            <div className="p-3.5 bg-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-400 block font-medium">Result Division</span>
              <div className="text-xl font-bold text-white mt-1">
                {result.division}
              </div>
              <span className="text-[11px] text-slate-400">
                {result.hasCompartment ? "⚠️ Compartment in some subjects" : "✅ Passed all subjects"}
              </span>
            </div>
          </div>

          {result.hasCompartment && (
            <div className="p-3 bg-red-900/40 border border-red-700/50 rounded-xl text-red-200 text-xs">
              <span className="font-bold">Compartment / Passing Alert:</span>{" "}
              {result.compartmentSubjects.join(", ")} did not meet the minimum 33% passing benchmark.
            </div>
          )}

          {/* Subject Breakdown List */}
          <div className="space-y-1.5 pt-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Individual Subject Breakdown
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {(result.subjectBreakdowns || []).map((sb, idx) => (
                <div key={idx} className="p-2.5 bg-slate-800/50 rounded-lg text-xs flex items-center justify-between">
                  <span className="text-slate-300 truncate max-w-[120px]">{sb.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{sb.totalObt}/{sb.totalMax} ({sb.pct}%)</span>
                    <span className={sb.passed ? "text-emerald-400" : "text-red-400 font-bold"}>
                      {sb.passed ? "PASS" : "FAIL"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

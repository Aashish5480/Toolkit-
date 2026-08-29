import React, { useState } from "react";
import { Calculator, RotateCcw, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

interface SubjectScore {
  id: string;
  name: string;
  obtained: string;
  max: string;
}

export function PercentageCalculator() {
  const [mode, setMode] = useState<"standard" | "percentage-to-marks" | "multi-subject">("standard");

  // Standard Mode
  const [obtainedMarks, setObtainedMarks] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [standardResult, setStandardResult] = useState<{
    percentage: number;
    grade: string;
    division: string;
    status: "pass" | "fail";
  } | null>(null);

  // Percentage to Marks Mode
  const [targetPercentage, setTargetPercentage] = useState<string>("");
  const [maxMarksTarget, setMaxMarksTarget] = useState<string>("500");
  const [requiredMarksResult, setRequiredMarksResult] = useState<number | null>(null);

  // Multi-Subject Mode
  const [subjects, setSubjects] = useState<SubjectScore[]>([
    { id: "1", name: "English", obtained: "85", max: "100" },
    { id: "2", name: "Mathematics", obtained: "92", max: "100" },
    { id: "3", name: "Science", obtained: "88", max: "100" },
    { id: "4", name: "Social Science", obtained: "90", max: "100" },
    { id: "5", name: "Hindi / 2nd Language", obtained: "86", max: "100" },
  ]);
  const [multiResult, setMultiResult] = useState<{
    totalObtained: number;
    totalMax: number;
    percentage: number;
    division: string;
    grade: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calculate Standard
  const handleCalculateStandard = () => {
    setErrorMsg(null);
    const obt = parseFloat(obtainedMarks);
    const tot = parseFloat(totalMarks);

    if (isNaN(obt) || isNaN(tot) || tot <= 0) {
      setErrorMsg("Please enter valid positive numbers for obtained and total marks.");
      setStandardResult(null);
      return;
    }

    if (obt > tot) {
      setErrorMsg("Obtained marks cannot exceed total maximum marks.");
      setStandardResult(null);
      return;
    }

    const pct = (obt / tot) * 100;
    let grade = "A1";
    let division = "1st Division (Distinction)";
    let status: "pass" | "fail" = "pass";

    if (pct >= 90) {
      grade = "A1";
      division = "1st Division (Distinction - Excellent)";
    } else if (pct >= 80) {
      grade = "A2";
      division = "1st Division (Distinction)";
    } else if (pct >= 70) {
      grade = "B1";
      division = "1st Division (Merit)";
    } else if (pct >= 60) {
      grade = "B2";
      division = "1st Division";
    } else if (pct >= 50) {
      grade = "C1";
      division = "2nd Division";
    } else if (pct >= 40) {
      grade = "C2";
      division = "3rd Division";
    } else if (pct >= 33) {
      grade = "D";
      division = "Pass Division";
    } else {
      grade = "E (Essential Repeat)";
      division = "Needs Improvement";
      status = "fail";
    }

    setStandardResult({
      percentage: Number(pct.toFixed(2)),
      grade,
      division,
      status,
    });
  };

  // Calculate Percentage to Marks
  const handleCalculatePercentageToMarks = () => {
    setErrorMsg(null);
    const pct = parseFloat(targetPercentage);
    const max = parseFloat(maxMarksTarget);

    if (isNaN(pct) || isNaN(max) || pct < 0 || pct > 100 || max <= 0) {
      setErrorMsg("Please enter a valid percentage (0-100) and positive total marks.");
      setRequiredMarksResult(null);
      return;
    }

    const req = (pct * max) / 100;
    setRequiredMarksResult(Number(req.toFixed(2)));
  };

  // Calculate Multi-Subject
  const handleCalculateMulti = () => {
    setErrorMsg(null);
    let totObt = 0;
    let totMax = 0;

    for (let i = 0; i < subjects.length; i++) {
      const s = subjects[i];
      const obt = parseFloat(s.obtained);
      const max = parseFloat(s.max);

      if (isNaN(obt) || isNaN(max) || max <= 0 || obt < 0) {
        setErrorMsg(`Please enter valid marks for ${s.name || `Subject ${i + 1}`}.`);
        setMultiResult(null);
        return;
      }
      if (obt > max) {
        setErrorMsg(`Obtained marks cannot exceed maximum marks for ${s.name || `Subject ${i + 1}`}.`);
        setMultiResult(null);
        return;
      }
      totObt += obt;
      totMax += max;
    }

    const pct = (totObt / totMax) * 100;
    let grade = "A1";
    let division = "1st Division";

    if (pct >= 90) grade = "A1 (91-100%)";
    else if (pct >= 81) grade = "A2 (81-90%)";
    else if (pct >= 71) grade = "B1 (71-80%)";
    else if (pct >= 61) grade = "B2 (61-70%)";
    else if (pct >= 51) grade = "C1 (51-60%)";
    else if (pct >= 41) grade = "C2 (41-50%)";
    else if (pct >= 33) grade = "D (33-40%)";
    else grade = "E (Needs Improvement)";

    if (pct >= 75) division = "1st Division with Distinction";
    else if (pct >= 60) division = "1st Division";
    else if (pct >= 50) division = "2nd Division";
    else if (pct >= 33) division = "3rd Division";
    else division = "Essential Repeat (Failed)";

    setMultiResult({
      totalObtained: Number(totObt.toFixed(1)),
      totalMax: totMax,
      percentage: Number(pct.toFixed(2)),
      division,
      grade,
    });
  };

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        name: `Subject ${subjects.length + 1}`,
        obtained: "",
        max: "100",
      },
    ]);
  };

  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    setObtainedMarks("");
    setTotalMarks("");
    setStandardResult(null);
    setTargetPercentage("");
    setRequiredMarksResult(null);
    setMultiResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 gap-1">
        <button
          onClick={() => {
            setMode("standard");
            setErrorMsg(null);
          }}
          className={`flex-1 py-2 px-3 rounded-lg transition-all ${
            mode === "standard" ? "bg-white text-blue-700 shadow-xs font-bold" : "hover:text-slate-900"
          }`}
        >
          Marks to Percentage
        </button>
        <button
          onClick={() => {
            setMode("multi-subject");
            setErrorMsg(null);
          }}
          className={`flex-1 py-2 px-3 rounded-lg transition-all ${
            mode === "multi-subject" ? "bg-white text-blue-700 shadow-xs font-bold" : "hover:text-slate-900"
          }`}
        >
          Multi-Subject Table
        </button>
        <button
          onClick={() => {
            setMode("percentage-to-marks");
            setErrorMsg(null);
          }}
          className={`flex-1 py-2 px-3 rounded-lg transition-all ${
            mode === "percentage-to-marks" ? "bg-white text-blue-700 shadow-xs font-bold" : "hover:text-slate-900"
          }`}
        >
          Percentage to Marks
        </button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Mode 1: Standard Calculation */}
      {mode === "standard" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Total Obtained Marks
              </label>
              <input
                type="number"
                value={obtainedMarks}
                onChange={(e) => setObtainedMarks(e.target.value)}
                placeholder="e.g. 450"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Maximum Total Marks
              </label>
              <input
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
                placeholder="e.g. 500"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCalculateStandard}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Percentage</span>
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Standard Result Card */}
          {standardResult && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Your Score</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                    {standardResult.percentage}%
                  </div>
                </div>
                <div className="text-right sm:text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    standardResult.status === "pass" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-red-500/20 text-red-300 border border-red-500/40"
                  }`}>
                    {standardResult.status === "pass" ? "PASSED" : "FAILED / COMPARTMENT"}
                  </span>
                  <div className="text-sm font-semibold text-slate-200 mt-1">
                    Grade: {standardResult.grade}
                  </div>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>0%</span>
                  <span>Pass: 33%</span>
                  <span>1st Div: 60%</span>
                  <span>Distinction: 75%</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(standardResult.percentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-slate-300 flex items-center justify-between">
                <span>Result Category:</span>
                <span className="font-bold text-white">{standardResult.division}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Multi-Subject Table */}
      {mode === "multi-subject" && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                  <th className="pb-2">Subject Name</th>
                  <th className="pb-2 w-28 sm:w-36">Obtained</th>
                  <th className="pb-2 w-28 sm:w-36">Max Marks</th>
                  <th className="pb-2 w-10 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((sub, index) => (
                  <tr key={sub.id} className="hover:bg-slate-50/70">
                    <td className="py-2 pr-2">
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) => {
                          const updated = [...subjects];
                          updated[index].name = e.target.value;
                          setSubjects(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 text-xs sm:text-sm"
                        placeholder="Subject"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        value={sub.obtained}
                        onChange={(e) => {
                          const updated = [...subjects];
                          updated[index].obtained = e.target.value;
                          setSubjects(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs sm:text-sm"
                        placeholder="e.g. 85"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        value={sub.max}
                        onChange={(e) => {
                          const updated = [...subjects];
                          updated[index].max = e.target.value;
                          setSubjects(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs sm:text-sm"
                        placeholder="e.g. 100"
                      />
                    </td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() => handleRemoveSubject(sub.id)}
                        disabled={subjects.length <= 1}
                        className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30"
                        title="Delete Subject"
                      >
                        <Trash2 className="w-4 h-4" />
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
              <span>Add Another Subject</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCalculateMulti}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs"
              >
                Calculate Aggregate
              </button>
              <button
                onClick={handleReset}
                className="border border-slate-300 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Multi Result */}
          {multiResult && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-3 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-slate-800/80 rounded-xl">
                  <span className="text-[11px] text-slate-400 block font-medium">Total Obtained</span>
                  <span className="text-xl font-bold text-white">{multiResult.totalObtained}</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl">
                  <span className="text-[11px] text-slate-400 block font-medium">Max Total</span>
                  <span className="text-xl font-bold text-white">{multiResult.totalMax}</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl">
                  <span className="text-[11px] text-slate-400 block font-medium">Percentage</span>
                  <span className="text-xl font-bold text-blue-400">{multiResult.percentage}%</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-xl">
                  <span className="text-[11px] text-slate-400 block font-medium">Grade Band</span>
                  <span className="text-xl font-bold text-emerald-400">{multiResult.grade}</span>
                </div>
              </div>
              <div className="pt-2 text-center text-xs text-slate-300 font-semibold">
                Result Status: {multiResult.division}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Percentage to Marks */}
      {mode === "percentage-to-marks" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Target Percentage (%)
              </label>
              <input
                type="number"
                value={targetPercentage}
                onChange={(e) => setTargetPercentage(e.target.value)}
                placeholder="e.g. 85"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Maximum Total Marks
              </label>
              <input
                type="number"
                value={maxMarksTarget}
                onChange={(e) => setMaxMarksTarget(e.target.value)}
                placeholder="e.g. 500"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCalculatePercentageToMarks}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-xs flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Required Marks</span>
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              Reset
            </button>
          </div>

          {requiredMarksResult !== null && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md text-center space-y-2 animate-fadeIn">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Required Marks Needed
              </span>
              <div className="text-4xl font-extrabold text-emerald-400">
                {requiredMarksResult} <span className="text-lg text-slate-300">/ {maxMarksTarget}</span>
              </div>
              <p className="text-xs text-slate-300">
                To achieve <span className="font-bold text-white">{targetPercentage}%</span> out of {maxMarksTarget} total marks, you must score at least {requiredMarksResult} marks.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Plus, Trash2, RotateCcw, Calculator, Award, Info, AlertCircle } from "lucide-react";

interface SubjectGP {
  id: string;
  name: string;
  gradePoint: string;
}

export function CgpaCalculator() {
  const [subjects, setSubjects] = useState<SubjectGP[]>([
    { id: "1", name: "Language 1 (English)", gradePoint: "9" },
    { id: "2", name: "Language 2 (Hindi/Reg)", gradePoint: "8" },
    { id: "3", name: "Mathematics", gradePoint: "10" },
    { id: "4", name: "Science", gradePoint: "9" },
    { id: "5", name: "Social Science", gradePoint: "9" },
  ]);

  const [result, setResult] = useState<{
    cgpa: number;
    percentage: number;
    grade: string;
    totalGradePoints: number;
    totalSubjects: number;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        name: `Subject ${subjects.length + 1}`,
        gradePoint: "",
      },
    ]);
  };

  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const handleCalculate = () => {
    setErrorMsg(null);
    let sumGP = 0;

    for (let i = 0; i < subjects.length; i++) {
      const gp = parseFloat(subjects[i].gradePoint);
      if (isNaN(gp) || gp < 0 || gp > 10) {
        setErrorMsg(`Please enter a valid grade point (between 0 and 10) for ${subjects[i].name || `Subject ${i + 1}`}.`);
        setResult(null);
        return;
      }
      sumGP += gp;
    }

    const cgpa = sumGP / subjects.length;
    const percentage = cgpa * 9.5; // Official CBSE Multiplier

    let grade = "A1";
    if (cgpa >= 9.1) grade = "A1 (Outstanding)";
    else if (cgpa >= 8.1) grade = "A2 (Excellent)";
    else if (cgpa >= 7.1) grade = "B1 (Very Good)";
    else if (cgpa >= 6.1) grade = "B2 (Good)";
    else if (cgpa >= 5.1) grade = "C1 (Fair)";
    else if (cgpa >= 4.1) grade = "C2 (Average)";
    else if (cgpa >= 3.3) grade = "D (Pass)";
    else grade = "E (Needs Improvement / Essential Repeat)";

    setResult({
      cgpa: Number(cgpa.toFixed(2)),
      percentage: Number(percentage.toFixed(2)),
      grade,
      totalGradePoints: Number(sumGP.toFixed(1)),
      totalSubjects: subjects.length,
    });
  };

  const handleReset = () => {
    setSubjects([
      { id: "1", name: "Language 1 (English)", gradePoint: "" },
      { id: "2", name: "Language 2 (Hindi/Reg)", gradePoint: "" },
      { id: "3", name: "Mathematics", gradePoint: "" },
      { id: "4", name: "Science", gradePoint: "" },
      { id: "5", name: "Social Science", gradePoint: "" },
    ]);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            CBSE CGPA & Percentage Calculator
          </h2>
          <p className="text-xs text-slate-500">
            Standard 5-subject evaluation with official 9.5 conversion multiplier
          </p>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 self-start sm:self-auto">
          CBSE Formula: % = CGPA × 9.5
        </span>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Subject Inputs Table */}
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <th className="pb-2">Subject Name</th>
                <th className="pb-2 w-36 sm:w-44">Grade Point (0 - 10)</th>
                <th className="pb-2 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map((sub, index) => (
                <tr key={sub.id} className="hover:bg-slate-50/60">
                  <td className="py-2 pr-2">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => {
                        const updated = [...subjects];
                        updated[index].name = e.target.value;
                        setSubjects(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 text-xs sm:text-sm"
                      placeholder="Subject Name"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={sub.gradePoint}
                      onChange={(e) => {
                        const updated = [...subjects];
                        updated[index].gradePoint = e.target.value;
                        setSubjects(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-slate-900 text-xs sm:text-sm text-center focus:bg-white focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 9.0"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => handleRemoveSubject(sub.id)}
                      disabled={subjects.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30"
                      title="Remove Subject"
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
            <span>Add 6th Subject / Additional</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCalculate}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate CGPA</span>
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

      {/* Results Display */}
      {result && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-800 pb-4">
            <div className="p-4 bg-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-400 font-medium block">Overall CGPA (Scale of 10)</span>
              <div className="text-4xl font-extrabold text-blue-400 mt-1">
                {result.cgpa} <span className="text-sm font-normal text-slate-400">/ 10.0</span>
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                Total GP Sum: {result.totalGradePoints} ({result.totalSubjects} subjects)
              </span>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-400 font-medium block">Equivalent Percentage</span>
              <div className="text-4xl font-extrabold text-emerald-400 mt-1">
                {result.percentage}%
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                Formula: {result.cgpa} × 9.5 = {result.percentage}%
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">Grade Performance Band:</span>
              <span className="font-bold text-white">{result.grade}</span>
            </div>
            <span className="text-slate-400 text-xs">
              Pass Criterion: CGPA ≥ 3.3 in all 5 core subjects
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

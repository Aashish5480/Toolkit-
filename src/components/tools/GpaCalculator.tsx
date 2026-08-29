import React, { useState } from "react";
import { Plus, Trash2, RotateCcw, Calculator, AlertCircle, Award } from "lucide-react";

interface CourseRow {
  id: string;
  name: string;
  credits: string;
  gradePoint: string;
}

export function GpaCalculator() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: "1", name: "Engineering Physics / Core 1", credits: "4", gradePoint: "9" },
    { id: "2", name: "Calculus & Linear Algebra", credits: "4", gradePoint: "10" },
    { id: "3", name: "Computer Programming (C++/Python)", credits: "3", gradePoint: "9" },
    { id: "4", name: "Chemistry / Environmental", credits: "3", gradePoint: "8" },
    { id: "5", name: "Engineering Graphics & Design", credits: "2", gradePoint: "9" },
    { id: "6", name: "Physics & Computing Lab", credits: "1.5", gradePoint: "10" },
  ]);

  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    totalQualityPoints: number;
    percentageEquiv: number;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        name: `Course ${courses.length + 1}`,
        credits: "3",
        gradePoint: "8",
      },
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleCalculate = () => {
    setErrorMsg(null);
    let totalCredits = 0;
    let totalQualityPoints = 0;

    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      const cr = parseFloat(c.credits);
      const gp = parseFloat(c.gradePoint);

      if (isNaN(cr) || cr <= 0) {
        setErrorMsg(`Please enter valid credit hours for ${c.name || `Course ${i + 1}`}.`);
        setResult(null);
        return;
      }
      if (isNaN(gp) || gp < 0 || gp > 10) {
        setErrorMsg(`Please enter a valid grade point (0-10) for ${c.name || `Course ${i + 1}`}.`);
        setResult(null);
        return;
      }

      totalCredits += cr;
      totalQualityPoints += cr * gp;
    }

    if (totalCredits === 0) {
      setErrorMsg("Total credits cannot be zero.");
      setResult(null);
      return;
    }

    const gpa = totalQualityPoints / totalCredits;
    // Standard UGC / AICTE percentage conversion: (GPA - 0.75) * 10 or GPA * 9.5
    const percentageEquiv = gpa * 9.5;

    setResult({
      gpa: Number(gpa.toFixed(2)),
      totalCredits: Number(totalCredits.toFixed(1)),
      totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
      percentageEquiv: Number(percentageEquiv.toFixed(2)),
    });
  };

  const handleReset = () => {
    setCourses([
      { id: "1", name: "Course 1", credits: "", gradePoint: "" },
      { id: "2", name: "Course 2", credits: "", gradePoint: "" },
      { id: "3", name: "Course 3", credits: "", gradePoint: "" },
    ]);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Weighted GPA & SGPA Calculator
          </h2>
          <p className="text-xs text-slate-500">
            Credit-weighted calculation: GPA = Σ (Credits × Grade Point) ÷ Total Credits
          </p>
        </div>
        <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100 self-start sm:self-auto">
          College & UGC 10-Point Scale
        </span>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px]">
                <th className="pb-2">Course / Subject</th>
                <th className="pb-2 w-28 sm:w-36">Credit Hours</th>
                <th className="pb-2 w-28 sm:w-36">Grade Point (0-10)</th>
                <th className="pb-2 w-10 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course, index) => (
                <tr key={course.id} className="hover:bg-slate-50/60">
                  <td className="py-2 pr-2">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => {
                        const updated = [...courses];
                        updated[index].name = e.target.value;
                        setCourses(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-800 text-xs sm:text-sm"
                      placeholder="Course Name"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="12"
                      value={course.credits}
                      onChange={(e) => {
                        const updated = [...courses];
                        updated[index].credits = e.target.value;
                        setCourses(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 text-xs sm:text-sm text-center"
                      placeholder="e.g. 4"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={course.gradePoint}
                      onChange={(e) => {
                        const updated = [...courses];
                        updated[index].gradePoint = e.target.value;
                        setCourses(updated);
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-900 text-xs sm:text-sm text-center focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 9"
                    />
                  </td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      disabled={courses.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-30"
                      title="Remove Course"
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
            onClick={handleAddCourse}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Another Course</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCalculate}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold py-2.5 px-5 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Weighted GPA</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-800 pb-4 text-center">
            <div className="p-3.5 bg-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-400 block font-medium">Weighted Semester GPA (SGPA)</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 mt-1">
                {result.gpa} <span className="text-sm font-normal text-slate-400">/ 10.0</span>
              </div>
            </div>
            <div className="p-3.5 bg-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-400 block font-medium">Total Credit Points</span>
              <div className="text-3xl font-bold text-white mt-1">
                {result.totalQualityPoints}
              </div>
              <span className="text-[11px] text-slate-400">({result.totalCredits} total credits)</span>
            </div>
            <div className="p-3.5 bg-slate-800/80 rounded-xl">
              <span className="text-xs text-slate-400 block font-medium">Estimated Percentage</span>
              <div className="text-3xl font-bold text-emerald-400 mt-1">
                {result.percentageEquiv}%
              </div>
              <span className="text-[11px] text-slate-400">(GPA × 9.5 formula)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useMemo } from "react";
import { NCERT_CURRICULUM, generateQuestionPaper } from "../../data/ncertData";
import { QuestionPaper } from "../../types";
import { Sparkles, Printer, Copy, Check, Download, FileText, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";

export function QuestionPaperGenerator() {
  const [selectedClass, setSelectedClass] = useState<number>(10);
  const [selectedSubject, setSelectedSubject] = useState<string>("Science");
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [totalMarks, setTotalMarks] = useState<number>(80);
  const [timeAllowed, setTimeAllowed] = useState<string>("3 Hours");
  const [schoolName, setSchoolName] = useState<string>("DELHI PUBLIC ACADEMY / MODEL BOARD EXAMINATION");
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [generatedPaper, setGeneratedPaper] = useState<QuestionPaper | null>(() => {
    // Generate initial sample Class 10 Science board paper
    return generateQuestionPaper(10, "Science", 80, "3 Hours", "DELHI PUBLIC ACADEMY / MODEL BOARD EXAMINATION");
  });

  // Current available subjects for class
  const classCurriculum = useMemo(() => {
    const key = `Class ${selectedClass}`;
    return NCERT_CURRICULUM[key] || NCERT_CURRICULUM["Class 10"];
  }, [selectedClass]);

  const availableSubjects = useMemo(() => {
    return classCurriculum?.subjects?.map((s) => s.name) || [];
  }, [classCurriculum]);

  const availableChapters = useMemo(() => {
    const subj = classCurriculum?.subjects?.find((s) => s.name === selectedSubject);
    return subj?.chapters || [];
  }, [classCurriculum, selectedSubject]);

  // When class changes, reset subject if needed
  const handleClassChange = (grade: number) => {
    setSelectedClass(grade);
    const key = `Class ${grade}`;
    const curr = NCERT_CURRICULUM[key] || NCERT_CURRICULUM["Class 10"];
    if (curr && curr.subjects && curr.subjects.length > 0) {
      setSelectedSubject(curr.subjects[0].name);
      setSelectedChapters([]);
    }
  };

  const handleGenerate = () => {
    const paper = generateQuestionPaper(
      selectedClass,
      selectedSubject,
      totalMarks,
      timeAllowed,
      schoolName,
      selectedChapters.length > 0 ? selectedChapters : undefined
    );
    setGeneratedPaper(paper);
    setShowAnswerKey(false);
  };

  const toggleChapter = (chap: string) => {
    if (selectedChapters.includes(chap)) {
      setSelectedChapters(selectedChapters.filter((c) => c !== chap));
    } else {
      setSelectedChapters([...selectedChapters, chap]);
    }
  };

  const handleCopyPaper = () => {
    if (!generatedPaper) return;
    const paperSchool = generatedPaper.schoolName || generatedPaper.header?.schoolName || "STUDENT TOOLKIT INDIA";
    const paperTitle = generatedPaper.title || generatedPaper.header?.examTitle || "PRACTICE EXAMINATION";
    const paperTime = generatedPaper.timeAllowed || generatedPaper.header?.timeAllowed || "3 Hours";
    const paperMarks = generatedPaper.totalMarks || generatedPaper.header?.maxMarks || 80;
    const paperInstructions = generatedPaper.instructions || generatedPaper.header?.instructions || [];
    const paperSections = generatedPaper.sections || [];

    let text = `${paperSchool}\n${paperTitle}\nTime: ${paperTime} | Max Marks: ${paperMarks}\n\n`;
    text += "GENERAL INSTRUCTIONS:\n";
    paperInstructions.forEach((ins, i) => {
      text += `${i + 1}. ${ins}\n`;
    });
    text += "\n";

    paperSections.forEach((sec) => {
      const secMarks = sec.totalMarks || sec.questions.reduce((sum, q) => sum + q.marks, 0);
      text += `\n==================== ${sec.name}: ${sec.description} (${secMarks} Marks) ====================\n\n`;
      (sec.questions || []).forEach((q) => {
        text += `Q${q.id}. [${q.marks} Mark${q.marks > 1 ? "s" : ""}] ${q.question}\n`;
        if (q.options) {
          q.options.forEach((opt, idx) => {
            text += `   (${String.fromCharCode(65 + idx)}) ${opt}\n`;
          });
        }
        text += "\n";
      });
    });

    if (showAnswerKey) {
      text += "\n\n==================== OFFICIAL MARKING SCHEME & ANSWERS ====================\n\n";
      paperSections.forEach((sec) => {
        (sec.questions || []).forEach((q) => {
          text += `Q${q.id} Answer: ${q.answerKey ? q.answerKey + " - " : ""}${q.solution || ""}\n`;
        });
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            NCERT Question Paper Generator (Class 1 to 12)
          </h2>
          <p className="text-xs text-slate-500">
            100% CBSE blueprint compliant exam papers with Section A-E structure, marking schemes & answer keys
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start sm:self-auto">
          CBSE Blueprint Aligned
        </span>
      </div>

      {/* Generator Control Panel */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
          Step 1: Configure Exam Paper Specifications
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Class */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Class / Standard
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              {[10, 12, 11, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((c) => (
                <option key={c} value={c}>
                  Class {c} (NCERT)
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedChapters([]);
              }}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              {availableSubjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Total Marks */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Exam Format & Marks
            </label>
            <select
              value={totalMarks}
              onChange={(e) => {
                const m = Number(e.target.value);
                setTotalMarks(m);
                if (m === 20) setTimeAllowed("45 Minutes");
                else if (m === 40) setTimeAllowed("1.5 Hours");
                else if (m === 50) setTimeAllowed("2 Hours");
                else setTimeAllowed("3 Hours");
              }}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value={80}>80 Marks (Annual Board Exam Model - 3h)</option>
              <option value={70}>70 Marks (Class 11/12 Practical Subjects - 3h)</option>
              <option value={50}>50 Marks (Half-Yearly / Term Assessment - 2h)</option>
              <option value={40}>40 Marks (Periodic Test II - 1.5h)</option>
              <option value={20}>20 Marks (Unit Test / Class Test - 45m)</option>
            </select>
          </div>

          {/* Time Allowed */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Time Allowed
            </label>
            <input
              type="text"
              value={timeAllowed}
              onChange={(e) => setTimeAllowed(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800"
            />
          </div>

          {/* Institution Header Name */}
          <div className="sm:col-span-2 lg:col-span-4">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              School / Institution Header (Displayed on Question Paper)
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="e.g. KENDRIYA VIDYALAYA SANGATHAN / MODEL BOARD EXAM"
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-1.5 text-xs font-medium text-slate-800"
            />
          </div>
        </div>

        {/* Chapter Selection Pills */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              Syllabus Selection ({selectedChapters.length === 0 ? "Full Syllabus" : `${selectedChapters.length} Chapters Selected`})
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedChapters([])}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                Select Full Syllabus
              </button>
              <button
                onClick={() => setSelectedChapters([...availableChapters])}
                className="text-[11px] font-bold text-slate-500 hover:underline"
              >
                Select All ({availableChapters.length})
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-white rounded-xl border border-slate-200">
            {availableChapters.map((chap) => {
              const isSel = selectedChapters.includes(chap);
              return (
                <button
                  key={chap}
                  onClick={() => toggleChapter(chap)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                    isSel
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSel ? "✓ " : "+ "}
                  {chap}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Complete CBSE Board Question Paper</span>
        </button>
      </div>

      {/* Generated Paper View */}
      {generatedPaper && (
        <div className="space-y-4 animate-fadeIn">
          {/* Action buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-slate-900 text-white rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">
                ✓ Paper Ready: {generatedPaper.totalQuestions} Questions
              </span>
              <span className="text-xs text-slate-400">({generatedPaper.totalMarks} Marks)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAnswerKey(!showAnswerKey)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  showAnswerKey
                    ? "bg-emerald-500 text-white border-emerald-400"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:text-white"
                }`}
              >
                {showAnswerKey ? "Hide Marking Scheme" : "Show Answer Key & Marking Scheme"}
              </button>

              <button
                onClick={handleCopyPaper}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Paper"}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Printable Question Paper Container */}
          <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-10 text-slate-900 shadow-sm space-y-6 print:border-none print:p-0">
            {/* Header */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <h1 className="text-base sm:text-xl font-extrabold uppercase tracking-wide text-slate-950">
                {generatedPaper.schoolName || generatedPaper.header?.schoolName || "STUDENT TOOLKIT INDIA"}
              </h1>
              <h2 className="text-sm sm:text-base font-bold text-slate-800">
                {generatedPaper.title || generatedPaper.header?.examTitle || "PRACTICE EXAMINATION"}
              </h2>
              <div className="flex items-center justify-between text-xs font-bold pt-2 text-slate-700 border-t border-slate-200 mt-2">
                <span>Time Allowed: {generatedPaper.timeAllowed || generatedPaper.header?.timeAllowed || "3 Hours"}</span>
                <span>Subject: {generatedPaper.subject || generatedPaper.header?.subject || selectedSubject}</span>
                <span>Maximum Marks: {generatedPaper.totalMarks || generatedPaper.header?.maxMarks || totalMarks}</span>
              </div>
            </div>

            {/* General Instructions */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs text-slate-800">
              <span className="font-extrabold uppercase tracking-wider block text-slate-950">
                General Instructions:
              </span>
              <ol className="list-decimal list-inside space-y-1 leading-relaxed">
                {(generatedPaper.instructions || generatedPaper.header?.instructions || []).map((ins, idx) => (
                  <li key={idx}>{ins}</li>
                ))}
              </ol>
            </div>

            {/* Sections and Questions */}
            <div className="space-y-8">
              {(generatedPaper.sections || []).map((section) => {
                const secMarks = section.totalMarks || (section.questions || []).reduce((acc, q) => acc + (q.marks || 0), 0);
                return (
                  <div key={section.name} className="space-y-4">
                    {/* Section Title */}
                    <div className="text-center py-2 bg-slate-100 border-y border-slate-300 font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-900">
                      {section.name}: {section.description} ({secMarks} Marks)
                    </div>

                    {/* Question Items */}
                    <div className="space-y-4">
                      {(section.questions || []).map((q) => (
                        <div
                          key={q.id}
                          className="space-y-2 pb-3 border-b border-slate-100 last:border-none"
                        >
                          <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                            <div className="font-semibold text-slate-900 flex-1 leading-relaxed">
                              <span className="font-bold mr-2 text-slate-950">Q{q.id}.</span>
                              {q.question}
                            </div>
                            <span className="font-bold text-slate-700 shrink-0 font-mono text-xs">
                              [{q.marks} Mark{q.marks > 1 ? "s" : ""}]
                            </span>
                          </div>

                          {/* Multiple Choice Options if present */}
                          {q.options && q.options.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6 pt-1 text-xs text-slate-800">
                              {q.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-2">
                                  <span className="font-bold font-mono">
                                    ({String.fromCharCode(65 + optIdx)})
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Answer Key / Marking Scheme Display */}
                          {showAnswerKey && (
                            <div className="mt-2.5 p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1 animate-fadeIn">
                              <span className="font-bold uppercase tracking-wider block text-emerald-800">
                                Answer & Marking Scheme Rationale:
                              </span>
                              <div className="leading-relaxed">
                                {q.answerKey && (
                                  <span className="font-bold mr-1">
                                    Correct Option: ({q.answerKey})
                                  </span>
                                )}
                                {q.solution}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Clock, Plus, Trash2, Calendar, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface CountdownTarget {
  id: string;
  name: string;
  category: string;
  targetDate: string; // ISO string
  isCustom?: boolean;
}

const DEFAULT_EXAMS: CountdownTarget[] = [
  {
    id: "cbse-10",
    name: "CBSE Class 10 Board Exams 2026/2027",
    category: "School Board",
    targetDate: "2027-02-15T09:00:00",
  },
  {
    id: "cbse-12",
    name: "CBSE Class 12 Board Exams 2026/2027",
    category: "School Board",
    targetDate: "2027-02-15T09:00:00",
  },
  {
    id: "neet-ug",
    name: "NEET UG 2026/2027 (National Medical Entrance)",
    category: "Medical",
    targetDate: "2027-05-02T14:00:00",
  },
  {
    id: "jee-main-1",
    name: "JEE Main 2027 Session 1 (Engineering)",
    category: "Engineering",
    targetDate: "2027-01-22T09:00:00",
  },
  {
    id: "cuet-ug",
    name: "CUET UG 2026/2027 (Central Universities)",
    category: "University",
    targetDate: "2027-05-18T09:00:00",
  },
  {
    id: "upsc-prelims",
    name: "UPSC Civil Services Prelims 2026/2027",
    category: "National Civil Services",
    targetDate: "2027-05-23T09:00:00",
  },
  {
    id: "nda-exam",
    name: "NDA & NA Examination (UPSC)",
    category: "Defence",
    targetDate: "2027-04-18T09:00:00",
  }
];

export function ExamCountdown() {
  const [exams, setExams] = useState<CountdownTarget[]>(() => {
    try {
      const saved = localStorage.getItem("sti_custom_exams");
      if (saved) {
        return [...DEFAULT_EXAMS, ...JSON.parse(saved)];
      }
    } catch (e) {}
    return DEFAULT_EXAMS;
  });

  const [now, setNow] = useState(Date.now());
  const [customName, setCustomName] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddCustomExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customDate) return;

    const newExam: CountdownTarget = {
      id: Date.now().toString(),
      name: customName.trim(),
      category: "My Custom Exam",
      targetDate: new Date(customDate).toISOString(),
      isCustom: true,
    };

    const updated = [...exams, newExam];
    setExams(updated);

    const customOnly = updated.filter((x) => x.isCustom);
    localStorage.setItem("sti_custom_exams", JSON.stringify(customOnly));

    setCustomName("");
    setCustomDate("");
    setShowAddForm(false);
  };

  const handleRemoveCustom = (id: string) => {
    const updated = exams.filter((x) => x.id !== id);
    setExams(updated);
    const customOnly = updated.filter((x) => x.isCustom);
    localStorage.setItem("sti_custom_exams", JSON.stringify(customOnly));
  };

  const getTimeParts = (targetStr: string) => {
    const target = new Date(targetStr).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPassed: false };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Live Exam Countdown Timers (CBSE, NEET, JEE & Custom)
          </h2>
          <p className="text-xs text-slate-500">
            Real-time ticking countdown clocks with daily milestones and revision targets
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Exam</span>
        </button>
      </div>

      {/* Add Custom Exam Modal/Form */}
      {showAddForm && (
        <form onSubmit={handleAddCustomExam} className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-3">
          <div className="font-bold text-xs text-blue-900 uppercase tracking-wider">
            Create Custom Exam Timer
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Exam / Test Name
              </label>
              <input
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Physics Mid-Term Unit Test"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Exam Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs"
            >
              Start Countdown
            </button>
          </div>
        </form>
      )}

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => {
          const { days, hours, minutes, seconds, isPassed } = getTimeParts(exam.targetDate);

          return (
            <div
              key={exam.id}
              className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/20">
                    {exam.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-white mt-1.5 leading-snug">
                    {exam.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Target: {new Date(exam.targetDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      weekday: "short"
                    })}
                  </span>
                </div>

                {exam.isCustom && (
                  <button
                    onClick={() => handleRemoveCustom(exam.id)}
                    className="text-slate-400 hover:text-red-400 p-1"
                    title="Remove custom exam"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Live Time Units */}
              {isPassed ? (
                <div className="py-4 text-center bg-slate-800/80 rounded-xl text-emerald-400 font-bold text-sm">
                  Exam Date Arrived / Concluded
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-slate-800/90 rounded-xl p-2.5 border border-slate-700/50">
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 block font-mono">
                      {days}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Days
                    </span>
                  </div>
                  <div className="bg-slate-800/90 rounded-xl p-2.5 border border-slate-700/50">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white block font-mono">
                      {hours.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Hours
                    </span>
                  </div>
                  <div className="bg-slate-800/90 rounded-xl p-2.5 border border-slate-700/50">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white block font-mono">
                      {minutes.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Mins
                    </span>
                  </div>
                  <div className="bg-slate-800/90 rounded-xl p-2.5 border border-slate-700/50">
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block font-mono">
                      {seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Secs
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

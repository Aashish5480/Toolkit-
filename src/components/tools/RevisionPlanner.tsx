import React, { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, CheckCircle2, RotateCcw, Sparkles, Filter, Check } from "lucide-react";

interface RevisionTopic {
  id: string;
  subject: string;
  chapter: string;
  initialStudyDate: string; // YYYY-MM-DD
  confidence: "Low" | "Medium" | "High";
  revisions: {
    label: string; // "Day 1", "Day 3", "Day 7", "Day 21", "Day 45"
    daysOffset: number;
    dueDate: string;
    completed: boolean;
  }[];
}

const INTERVALS = [
  { label: "1st Rev (Day 1)", offset: 1 },
  { label: "2nd Rev (Day 3)", offset: 3 },
  { label: "3rd Rev (Day 7)", offset: 7 },
  { label: "4th Rev (Day 21)", offset: 21 },
  { label: "5th Rev (Day 45)", offset: 45 },
];

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function RevisionPlanner() {
  const [topics, setTopics] = useState<RevisionTopic[]>(() => {
    try {
      const saved = localStorage.getItem("sti_revision_topics");
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    const todayStr = new Date().toISOString().split("T")[0];
    return [
      {
        id: "1",
        subject: "Physics",
        chapter: "Ray Optics & Optical Instruments",
        initialStudyDate: todayStr,
        confidence: "Medium",
        revisions: INTERVALS.map((inv) => ({
          label: inv.label,
          daysOffset: inv.offset,
          dueDate: addDays(todayStr, inv.offset),
          completed: false,
        })),
      },
      {
        id: "2",
        subject: "Biology",
        chapter: "Molecular Basis of Inheritance (DNA & RNA)",
        initialStudyDate: addDays(todayStr, -3),
        confidence: "Low",
        revisions: INTERVALS.map((inv) => ({
          label: inv.label,
          daysOffset: inv.offset,
          dueDate: addDays(addDays(todayStr, -3), inv.offset),
          completed: inv.offset <= 3,
        })),
      },
    ];
  });

  const [subject, setSubject] = useState("Chemistry");
  const [chapter, setChapter] = useState("");
  const [initialDate, setInitialDate] = useState(new Date().toISOString().split("T")[0]);
  const [confidence, setConfidence] = useState<"Low" | "Medium" | "High">("Medium");
  const [filterMode, setFilterMode] = useState<"all" | "due" | "completed">("all");

  useEffect(() => {
    try {
      localStorage.setItem("sti_revision_topics", JSON.stringify(topics));
    } catch (e) {}
  }, [topics]);

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapter.trim()) return;

    const newTopic: RevisionTopic = {
      id: Date.now().toString(),
      subject,
      chapter: chapter.trim(),
      initialStudyDate: initialDate,
      confidence,
      revisions: INTERVALS.map((inv) => ({
        label: inv.label,
        daysOffset: inv.offset,
        dueDate: addDays(initialDate, inv.offset),
        completed: false,
      })),
    };

    setTopics([...topics, newTopic]);
    setChapter("");
  };

  const handleToggleRevision = (topicId: string, revIndex: number) => {
    setTopics(
      topics.map((top) => {
        if (top.id !== topicId) return top;
        const updatedRevs = [...top.revisions];
        updatedRevs[revIndex].completed = !updatedRevs[revIndex].completed;
        return { ...top, revisions: updatedRevs };
      })
    );
  };

  const handleDeleteTopic = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id));
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Spaced Repetition & Revision Schedule Tracker
          </h2>
          <p className="text-xs text-slate-500">
            Automates Ebbinghaus forgetting curve intervals (Day 1, 3, 7, 21, 45) for permanent memory
          </p>
        </div>
        <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100 self-start sm:self-auto">
          Ebbinghaus Scientific Method
        </span>
      </div>

      {/* Add New Topic Form */}
      <form onSubmit={handleAddTopic} className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 space-y-3">
        <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
          Add New Chapter to Spaced Revision Tracker
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Social Science">Social Science</option>
              <option value="English">English</option>
              <option value="Economics">Economics</option>
              <option value="Accountancy">Accountancy</option>
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Chapter / Unit</label>
            <input
              type="text"
              required
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="e.g. Chemical Kinetics"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Studied On Date</label>
            <input
              type="date"
              value={initialDate}
              onChange={(e) => setInitialDate(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-800"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Track Topic</span>
            </button>
          </div>
        </div>
      </form>

      {/* Revision Topic Cards */}
      <div className="space-y-4">
        {topics.map((topic) => {
          const completedCount = topic.revisions.filter((r) => r.completed).length;
          const pct = Math.round((completedCount / topic.revisions.length) * 100);

          return (
            <div
              key={topic.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {topic.subject}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {topic.chapter}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    First Studied: {topic.initialStudyDate} • {pct}% Revision Cycles Completed
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-purple-600">
                    {completedCount} / {topic.revisions.length} Done
                  </span>
                  <button
                    onClick={() => handleDeleteTopic(topic.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 5-Step Spaced Timeline */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {topic.revisions.map((rev, revIdx) => {
                  const isDue = rev.dueDate <= todayStr && !rev.completed;

                  return (
                    <button
                      key={revIdx}
                      onClick={() => handleToggleRevision(topic.id, revIdx)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between gap-1 transition-all ${
                        rev.completed
                          ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                          : isDue
                          ? "bg-red-50 border-red-300 text-red-900 animate-pulse"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          {rev.label.split(" ")[0]} {rev.label.split(" ")[1]}
                        </span>
                        <input
                          type="checkbox"
                          checked={rev.completed}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 pointer-events-none"
                        />
                      </div>
                      <span className="text-xs font-bold font-mono block">
                        {rev.dueDate}
                      </span>
                      <span className="text-[10px] font-semibold">
                        {rev.completed ? "✓ Done" : isDue ? "⚠️ DUE NOW" : "Upcoming"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

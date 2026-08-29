import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Clock, Calendar, Sparkles, Printer, Copy, Check } from "lucide-react";

interface StudyTask {
  id: string;
  subject: string;
  title: string;
  durationMins: number;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

export function DailyStudyPlanner() {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    try {
      const saved = localStorage.getItem("sti_daily_tasks");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: "1",
        subject: "Mathematics",
        title: "Solve 20 NCERT Trigonometry Exercise problems",
        durationMins: 60,
        priority: "High",
        completed: true,
      },
      {
        id: "2",
        subject: "Science",
        title: "Read Chapter 4 Carbon & its Compounds + Make reaction notes",
        durationMins: 75,
        priority: "High",
        completed: false,
      },
      {
        id: "3",
        subject: "English",
        title: "Write 1 Formal Analytical Paragraph sample essay",
        durationMins: 30,
        priority: "Medium",
        completed: false,
      },
      {
        id: "4",
        subject: "Social Science",
        title: "Revise Map Work & Dates for Nationalism in India",
        durationMins: 45,
        priority: "Medium",
        completed: false,
      },
    ];
  });

  const [subject, setSubject] = useState("Mathematics");
  const [taskTitle, setTaskTitle] = useState("");
  const [duration, setDuration] = useState(45);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [dailyReflection, setDailyReflection] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("sti_daily_tasks", JSON.stringify(tasks));
    } catch (e) {}
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: StudyTask = {
      id: Date.now().toString(),
      subject,
      title: taskTitle.trim(),
      durationMins: duration,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
  };

  const handleToggle = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const totalPlannedMinutes = tasks.reduce((sum, t) => sum + t.durationMins, 0);
  const completedMinutes = tasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.durationMins, 0);

  const handleCopy = () => {
    const text = tasks
      .map(
        (t) =>
          `[${t.completed ? "x" : " "}] ${t.subject} (${t.durationMins}m, ${t.priority}): ${t.title}`
      )
      .join("\n");
    navigator.clipboard.writeText(`DAILY STUDY PLAN (${date})\nTotal Planned: ${totalPlannedMinutes} mins\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Daily Study Task & Time Tracker
          </h2>
          <p className="text-xs text-slate-500">
            Organize high-yield daily academic goals by priority and subject
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800"
          />
          <button
            onClick={handleCopy}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Progress & Summary Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-slate-900 text-white rounded-xl space-y-1">
          <span className="text-xs text-slate-400 font-medium">Daily Task Progress</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">{progressPercent}%</span>
            <span className="text-xs text-slate-300 font-normal">
              ({completedCount} of {tasks.length} tasks)
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
            <div
              className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-xs text-slate-500 font-medium">Planned Study Time</span>
          <div className="text-2xl font-bold text-slate-900">
            {Math.floor(totalPlannedMinutes / 60)}h {totalPlannedMinutes % 60}m
          </div>
          <span className="text-[11px] text-slate-500 block">
            Completed: {Math.floor(completedMinutes / 60)}h {completedMinutes % 60}m
          </span>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
          <span className="text-xs text-slate-500 font-medium">High Priority Items</span>
          <div className="text-2xl font-bold text-red-600">
            {tasks.filter((t) => t.priority === "High" && !t.completed).length} Remaining
          </div>
          <span className="text-[11px] text-slate-500 block">
            Focus on finishing high-priority syllabus topics first
          </span>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 space-y-3">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
          Add New Study Goal
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science / Physics">Science / Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Social Science">Social Science</option>
              <option value="English">English</option>
              <option value="Hindi / Regional">Hindi / Regional</option>
              <option value="Computer / IT">Computer / IT</option>
              <option value="Accountancy / Commerce">Accountancy / Commerce</option>
              <option value="General Revision">General Revision</option>
            </select>
          </div>

          <div className="sm:col-span-5">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Task Description</label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Read NCERT Chapter 3 & solve intext Qs"
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-800"
            >
              <option value={20}>20 Mins</option>
              <option value={30}>30 Mins</option>
              <option value={45}>45 Mins</option>
              <option value={60}>1 Hour</option>
              <option value={90}>1.5 Hours</option>
              <option value={120}>2 Hours</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs flex items-center justify-center gap-1 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggle(task.id)}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
              task.completed
                ? "bg-slate-50 border-slate-200 opacity-60 line-through"
                : "bg-white border-slate-200 hover:border-blue-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    {task.subject}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      task.priority === "High"
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : task.priority === "Medium"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {task.durationMins}m
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
                  {task.title}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(task.id);
              }}
              className="text-slate-400 hover:text-red-600 p-1.5"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

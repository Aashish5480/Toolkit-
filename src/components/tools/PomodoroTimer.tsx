import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX, CheckCircle, Plus, Trash2 } from "lucide-react";

type Mode = "study" | "shortBreak" | "longBreak";

export function PomodoroTimer() {
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const [mode, setMode] = useState<Mode>("study");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Focus tasks list
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: "1", text: "Solve 15 Optics ray diagram numericals", done: false },
    { id: "2", text: "Memorize Organic Chemistry named reactions", done: true },
    { id: "3", text: "Review NCERT Biology diagrams", done: false }
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  const intervalRef = useRef<number | null>(null);

  // Play synthetic pleasant completion chime using Web Audio API
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            playChime();
            // Transition modes
            if (mode === "study") {
              const nextCount = completedSessions + 1;
              setCompletedSessions(nextCount);
              if (nextCount % 4 === 0) {
                setMode("longBreak");
                return longBreakMinutes * 60;
              } else {
                setMode("shortBreak");
                return shortBreakMinutes * 60;
              }
            } else {
              setMode("study");
              return studyMinutes * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, mode, studyMinutes, shortBreakMinutes, longBreakMinutes, completedSessions, soundEnabled]);

  const handleModeChange = (newMode: Mode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === "study") setSecondsLeft(studyMinutes * 60);
    else if (newMode === "shortBreak") setSecondsLeft(shortBreakMinutes * 60);
    else setSecondsLeft(longBreakMinutes * 60);
  };

  const handleReset = () => {
    setIsActive(false);
    if (mode === "study") setSecondsLeft(studyMinutes * 60);
    else if (mode === "shortBreak") setSecondsLeft(shortBreakMinutes * 60);
    else setSecondsLeft(longBreakMinutes * 60);
  };

  const handleSkip = () => {
    setIsActive(false);
    if (mode === "study") {
      setMode("shortBreak");
      setSecondsLeft(shortBreakMinutes * 60);
    } else {
      setMode("study");
      setSecondsLeft(studyMinutes * 60);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalCycleSeconds =
    mode === "study"
      ? studyMinutes * 60
      : mode === "shortBreak"
      ? shortBreakMinutes * 60
      : longBreakMinutes * 60;
  const progressPercent = ((totalCycleSeconds - secondsLeft) / totalCycleSeconds) * 100;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTaskText.trim(), done: false }]);
    setNewTaskText("");
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Pomodoro Focus Study Timer
          </h2>
          <p className="text-xs text-slate-500">
            Scientifically proven 25m focus & 5m recovery cycles for high cognitive retention
          </p>
        </div>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold self-start sm:self-auto border ${
            soundEnabled
              ? "bg-blue-50 text-blue-700 border-blue-200"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? "Audio Bell ON" : "Audio Muted"}</span>
        </button>
      </div>

      {/* Main Timer Display */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 text-center shadow-xl relative overflow-hidden space-y-6">
        {/* Progress Background bar */}
        <div
          className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Mode Selector */}
        <div className="flex justify-center gap-2">
          <button
            onClick={() => handleModeChange("study")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === "study"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Study Focus ({studyMinutes}m)
          </button>
          <button
            onClick={() => handleModeChange("shortBreak")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === "shortBreak"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Short Break ({shortBreakMinutes}m)
          </button>
          <button
            onClick={() => handleModeChange("longBreak")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              mode === "longBreak"
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Long Break ({longBreakMinutes}m)
          </button>
        </div>

        {/* Big Digital Numbers */}
        <div className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-white font-mono select-none">
          {formatTime(secondsLeft)}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
              isActive ? "bg-amber-600 hover:bg-amber-500" : "bg-blue-600 hover:bg-blue-500"
            }`}
            title={isActive ? "Pause Timer" : "Start Focus Timer"}
          >
            {isActive ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
          </button>

          <button
            onClick={handleReset}
            className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title="Reset Current Cycle"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSkip}
            className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
            title="Skip to Next Session"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Session tracker dots */}
        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
          <span>Sessions Completed Today:</span>
          <span className="font-bold text-emerald-400 text-sm">{completedSessions}</span>
          <div className="flex items-center gap-1.5 ml-2">
            {[1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`w-2.5 h-2.5 rounded-full ${
                  (completedSessions % 4) >= dot
                    ? "bg-emerald-400"
                    : "bg-slate-800 border border-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preset Customizer */}
      <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Focus (Mins)</label>
          <input
            type="number"
            min="1"
            max="90"
            value={studyMinutes}
            onChange={(e) => {
              const val = Number(e.target.value) || 25;
              setStudyMinutes(val);
              if (mode === "study" && !isActive) setSecondsLeft(val * 60);
            }}
            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 text-center"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Short Break</label>
          <input
            type="number"
            min="1"
            max="30"
            value={shortBreakMinutes}
            onChange={(e) => {
              const val = Number(e.target.value) || 5;
              setShortBreakMinutes(val);
              if (mode === "shortBreak" && !isActive) setSecondsLeft(val * 60);
            }}
            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 text-center"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-600 mb-1">Long Break</label>
          <input
            type="number"
            min="1"
            max="60"
            value={longBreakMinutes}
            onChange={(e) => {
              const val = Number(e.target.value) || 15;
              setLongBreakMinutes(val);
              if (mode === "longBreak" && !isActive) setSecondsLeft(val * 60);
            }}
            className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 text-center"
          />
        </div>
      </div>

      {/* Focus Session Task Checklist */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Current Focus Task Checklist
        </h3>

        <form onSubmit={handleAddTask} className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Add task to complete during this Pomodoro..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id)}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                task.done
                  ? "bg-slate-50 border-slate-200 text-slate-400 line-through"
                  : "bg-white border-slate-200 text-slate-800 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleTask(task.id)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-xs sm:text-sm font-medium">{task.text}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id);
                }}
                className="text-slate-400 hover:text-red-600 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

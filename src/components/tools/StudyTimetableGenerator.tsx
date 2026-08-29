import React, { useState } from "react";
import { Calendar, Clock, BookOpen, Download, Printer, Copy, Check, Sparkles, RefreshCw } from "lucide-react";

interface TimetableSlot {
  time: string;
  activity: string;
  type: "study" | "break" | "revision" | "school" | "routine";
  subject?: string;
  notes?: string;
}

export function StudyTimetableGenerator() {
  const [stream, setStream] = useState<string>("Class 10 (Board Exam)");
  const [dailyHours, setDailyHours] = useState<number>(5);
  const [wakeTime, setWakeTime] = useState<string>("06:00");
  const [sleepTime, setSleepTime] = useState<string>("22:30");
  const [coachingHours, setCoachingHours] = useState<string>("08:00 - 14:30 (School)");
  const [focusSubjects, setFocusSubjects] = useState<string>("Mathematics, Science");
  const [scheduleType, setScheduleType] = useState<"weekday" | "weekend">("weekday");

  const [timetable, setTimetable] = useState<TimetableSlot[] | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const subs = focusSubjects.split(",").map((s) => s.trim()).filter(Boolean);
    const primarySub = subs[0] || "Mathematics";
    const secondarySub = subs[1] || "Science / Physics";
    const tertiarySub = subs[2] || "Social Science / Chemistry";

    const slots: TimetableSlot[] = [
      {
        time: "06:00 AM - 06:30 AM",
        activity: "Wake up, Hydration & Morning Stretching",
        type: "routine",
        notes: "Freshen up without touching smartphone screen"
      },
      {
        time: "06:30 AM - 07:45 AM",
        activity: `High-Focus Morning Slot: ${primarySub}`,
        type: "study",
        subject: primarySub,
        notes: "Deep conceptual study & formula derivation while mind is fresh"
      },
      {
        time: "07:45 AM - 08:30 AM",
        activity: "Breakfast & School / College Preparation",
        type: "routine"
      },
      {
        time: "08:30 AM - 02:30 PM",
        activity: "School / College / Coaching Sessions",
        type: "school",
        notes: "Active note-taking and clarifying doubts with teachers"
      },
      {
        time: "02:30 PM - 03:30 PM",
        activity: "Lunch, Rest & Power Relaxation",
        type: "break",
        notes: "Healthy nutritious meal + 20 min power rest"
      },
      {
        time: "03:30 PM - 05:00 PM",
        activity: `Afternoon Study Block: ${secondarySub}`,
        type: "study",
        subject: secondarySub,
        notes: "NCERT textbook exercises and chapter-end numericals"
      },
      {
        time: "05:00 PM - 05:45 PM",
        activity: "Physical Activity / Outdoor Walk & Tea Break",
        type: "break",
        notes: "Crucial for blood flow and memory consolidation"
      },
      {
        time: "05:45 PM - 07:30 PM",
        activity: `Evening Problem Solving: ${primarySub} & ${tertiarySub}`,
        type: "study",
        subject: primarySub,
        notes: "PyQs (Previous Year Questions) and timed test practice"
      },
      {
        time: "07:30 PM - 08:15 PM",
        activity: "Language & Theory Subject Revision",
        type: "study",
        subject: "English / Hindi / Optional",
        notes: "Short summaries, grammar rules & writing practice"
      },
      {
        time: "08:15 PM - 09:15 PM",
        activity: "Dinner & Family Time",
        type: "routine"
      },
      {
        time: "09:15 PM - 10:15 PM",
        activity: "Daily Spaced Revision & Flashcard Review",
        type: "revision",
        notes: "Review everything studied today; prepare tomorrow's task checklist"
      },
      {
        time: "10:15 PM - 10:30 PM",
        activity: "Wind Down & Screen-Free Bedtime",
        type: "routine",
        notes: "Quality 7.5 hours continuous sleep for cognitive memory retention"
      }
    ];

    setTimetable(slots);
  };

  const handleCopy = () => {
    if (!timetable) return;
    const text = timetable
      .map((s) => `• ${s.time}: ${s.activity} ${s.notes ? `(${s.notes})` : ""}`)
      .join("\n");
    navigator.clipboard.writeText(`STUDENT TOOLKIT INDIA - STUDY TIMETABLE\nStream: ${stream}\nFocus: ${focusSubjects}\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Personalized Study Timetable Generator
          </h2>
          <p className="text-xs text-slate-500">
            Build a scientifically balanced daily routine tailored for Indian school & board exams
          </p>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 self-start sm:self-auto">
          Active Recall & Spaced Breaks
        </span>
      </div>

      {/* Configuration Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Student Class / Target Stream
          </label>
          <select
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="Class 10 (Board Exam)">Class 10 (CBSE/ICSE Board)</option>
            <option value="Class 12 Science (PCM/PCB)">Class 12 Science (PCM/PCB)</option>
            <option value="Class 12 Commerce">Class 12 Commerce</option>
            <option value="Class 12 Arts / Humanities">Class 12 Humanities / Arts</option>
            <option value="NEET Medical Aspirant">NEET Medical Aspirant</option>
            <option value="JEE Engineering Aspirant">JEE Engineering Aspirant</option>
            <option value="Class 6 to 8 Foundation">Class 6 to 8 Foundation</option>
            <option value="Class 9 High School">Class 9 High School</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Target Self-Study Hours (Daily)
          </label>
          <select
            value={dailyHours}
            onChange={(e) => setDailyHours(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value={3}>3 Hours / Day (Moderate / School Days)</option>
            <option value={4}>4 Hours / Day (Standard Recommended)</option>
            <option value={5}>5 Hours / Day (Intense Board Prep)</option>
            <option value={6}>6 Hours / Day (Competitive Exam Track)</option>
            <option value={8}>8 Hours / Day (Full-Time / Weekend)</option>
            <option value={10}>10 Hours / Day (Exam Month / Holidays)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Day Schedule Type
          </label>
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => setScheduleType("weekday")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                scheduleType === "weekday" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600"
              }`}
            >
              School Day (Weekday)
            </button>
            <button
              onClick={() => setScheduleType("weekend")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                scheduleType === "weekend" ? "bg-white text-blue-700 shadow-xs" : "text-slate-600"
              }`}
            >
              Holiday / Weekend
            </button>
          </div>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Priority / Weak Subjects (comma separated)
          </label>
          <input
            type="text"
            value={focusSubjects}
            onChange={(e) => setFocusSubjects(e.target.value)}
            placeholder="e.g. Mathematics, Organic Chemistry, Physics Optics"
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleGenerate}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Balanced Timetable</span>
        </button>
      </div>

      {/* Output Schedule */}
      {timetable && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {stream} — {scheduleType === "weekday" ? "Daily School Routine" : "Intense Holiday Schedule"}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Schedule"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Timetable</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {timetable.map((slot, index) => {
              const isStudy = slot.type === "study";
              const isRevision = slot.type === "revision";
              const isBreak = slot.type === "break";
              const isSchool = slot.type === "school";

              return (
                <div
                  key={index}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    isStudy
                      ? "bg-blue-50/60 border-blue-200/80 text-blue-950"
                      : isRevision
                      ? "bg-emerald-50/60 border-emerald-200/80 text-emerald-950"
                      : isBreak
                      ? "bg-amber-50/60 border-amber-200/80 text-amber-950"
                      : isSchool
                      ? "bg-purple-50/60 border-purple-200/80 text-purple-950"
                      : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-24 sm:w-28 font-mono text-xs font-bold shrink-0 text-slate-600">
                      {slot.time.split(" - ")[0]}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-900">
                        {slot.activity}
                      </div>
                      {slot.notes && (
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {slot.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase self-start sm:self-center shrink-0 ${
                      isStudy
                        ? "bg-blue-600 text-white"
                        : isRevision
                        ? "bg-emerald-600 text-white"
                        : isBreak
                        ? "bg-amber-600 text-white"
                        : isSchool
                        ? "bg-purple-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {slot.type}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Calendar, RotateCcw, Award, CheckCircle2, XCircle, AlertCircle, Clock, ShieldCheck } from "lucide-react";

interface ExamEligibilityRule {
  examName: string;
  minAgeYears: number;
  maxAgeYears: number;
  cutoffMonthDay: string; // MM-DD
  description: string;
}

const INDIAN_EXAM_RULES: ExamEligibilityRule[] = [
  {
    examName: "NEET-UG 2026 (Medical)",
    minAgeYears: 17,
    maxAgeYears: 100, // No upper age limit for NEET UG per NMC
    cutoffMonthDay: "12-31",
    description: "Must have completed 17 years of age on or before 31st Dec of the year of admission. No upper age limit.",
  },
  {
    examName: "JEE Main & Advanced (Engineering)",
    minAgeYears: 16,
    maxAgeYears: 25,
    cutoffMonthDay: "10-01",
    description: "Passed Class 12 in 2024, 2025 or appearing in 2026. Age limit criteria for General is typically up to 25 years.",
  },
  {
    examName: "NDA & NA Exam (UPSC)",
    minAgeYears: 16.5,
    maxAgeYears: 19.5,
    cutoffMonthDay: "01-01",
    description: "Unmarried male & female candidates aged between 16.5 and 19.5 years as on the first day of commencement.",
  },
  {
    examName: "UPSC Civil Services (IAS/IPS)",
    minAgeYears: 21,
    maxAgeYears: 32,
    cutoffMonthDay: "08-01",
    description: "Must be minimum 21 years and maximum 32 years of age as on 1st August of the examination year (General).",
  },
  {
    examName: "SSC CGL (Combined Graduate Level)",
    minAgeYears: 18,
    maxAgeYears: 30,
    cutoffMonthDay: "08-01",
    description: "Graduation degree holder between 18 and 30/32 years depending on the specific government post applied.",
  },
  {
    examName: "Kendriya Vidyalaya (Class 1 Admission)",
    minAgeYears: 6,
    maxAgeYears: 8,
    cutoffMonthDay: "03-31",
    description: "Child must be minimum 6 years of age as on 31st March of the academic year as per NEP 2020 guidelines.",
  },
  {
    examName: "Navodaya Vidyalaya JNVST (Class 6)",
    minAgeYears: 10,
    maxAgeYears: 12,
    cutoffMonthDay: "05-01",
    description: "Candidate seeking admission must not have been born before May 1, 2014 and after July 31, 2016.",
  }
];

export function AgeCalculator() {
  const [dob, setDob] = useState<string>("2008-05-15");
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalHours: number;
    daysUntilNextBirthday: number;
    nextBirthdayDayOfWeek: string;
    eligibilities: {
      exam: string;
      status: "Eligible" | "Underage" | "Overage";
      details: string;
    }[];
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCalculate = () => {
    setErrorMsg(null);
    if (!dob || !targetDate) {
      setErrorMsg("Please select both your Date of Birth and the Calculation Date.");
      setResult(null);
      return;
    }

    const birthDate = new Date(dob);
    const calcDate = new Date(targetDate);

    if (isNaN(birthDate.getTime()) || isNaN(calcDate.getTime())) {
      setErrorMsg("Invalid date format provided.");
      setResult(null);
      return;
    }

    if (birthDate > calcDate) {
      setErrorMsg("Date of birth cannot be in the future relative to the target calculation date.");
      setResult(null);
      return;
    }

    let years = calcDate.getFullYear() - birthDate.getFullYear();
    let months = calcDate.getMonth() - birthDate.getMonth();
    let days = calcDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(calcDate.getFullYear(), calcDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffTime = calcDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    // Next birthday calculation from today
    const today = new Date();
    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil(
      (nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nextBirthdayDayOfWeek = daysOfWeek[nextBday.getDay()];

    // Decimal exact age in years
    const exactAgeYears = years + months / 12 + days / 365.25;

    // Evaluate Indian Exam Eligibilities
    const eligibilities = INDIAN_EXAM_RULES.map((rule) => {
      let status: "Eligible" | "Underage" | "Overage" = "Eligible";
      if (exactAgeYears < rule.minAgeYears) {
        status = "Underage";
      } else if (exactAgeYears > rule.maxAgeYears) {
        status = "Overage";
      }
      return {
        exam: rule.examName,
        status,
        details: rule.description,
      };
    });

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      daysUntilNextBirthday,
      nextBirthdayDayOfWeek,
      eligibilities,
    });
  };

  const handleReset = () => {
    setDob("");
    setTargetDate(new Date().toISOString().split("T")[0]);
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Exact Age & Indian Exam Eligibility Calculator
          </h2>
          <p className="text-xs text-slate-500">
            Calculate precise years, months, days and test eligibility for NEET, JEE, NDA, UPSC & KVs
          </p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start sm:self-auto">
          Updated for 2026 Cutoff Rules
        </span>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Date of Birth (DOB)
          </label>
          <div className="relative">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Calculate Age As On (Target / Cutoff Date)
          </label>
          <div className="relative">
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Common Indian Exam Preset Buttons */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
          Quick Exam Cutoff Date Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTargetDate("2026-12-31")}
            className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 px-2.5 py-1 rounded-lg font-medium transition-colors"
          >
            NEET 2026 Cutoff (31 Dec 2026)
          </button>
          <button
            onClick={() => setTargetDate("2026-08-01")}
            className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 px-2.5 py-1 rounded-lg font-medium transition-colors"
          >
            UPSC/SSC Cutoff (1 Aug 2026)
          </button>
          <button
            onClick={() => setTargetDate("2026-03-31")}
            className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 px-2.5 py-1 rounded-lg font-medium transition-colors"
          >
            KV Admission (31 Mar 2026)
          </button>
          <button
            onClick={() => setTargetDate(new Date().toISOString().split("T")[0])}
            className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 px-2.5 py-1 rounded-lg font-medium transition-colors"
          >
            Today's Date
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleCalculate}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Calendar className="w-4 h-4" />
          <span>Calculate Exact Age & Eligibility</span>
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5 animate-fadeIn">
          {/* Main Age Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="text-center border-b border-slate-800 pb-4">
              <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                Your Exact Age
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 mt-1">
                {result.years} <span className="text-lg text-slate-300 font-normal">Years</span>, {result.months} <span className="text-lg text-slate-300 font-normal">Months</span>, {result.days} <span className="text-lg text-slate-300 font-normal">Days</span>
              </div>
            </div>

            {/* Total Granular Units */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">Total Days Lived</span>
                <span className="text-lg font-bold text-white">{result.totalDays.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">Total Weeks</span>
                <span className="text-lg font-bold text-white">{result.totalWeeks.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">Total Hours</span>
                <span className="text-lg font-bold text-white">{result.totalHours.toLocaleString()}</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">Next Birthday In</span>
                <span className="text-lg font-bold text-emerald-400">{result.daysUntilNextBirthday} days</span>
                <span className="text-[10px] text-slate-400 block">({result.nextBirthdayDayOfWeek})</span>
              </div>
            </div>
          </div>

          {/* Exam Eligibility List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3>National & State Competitive Exam Eligibility Status</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(result.eligibilities || []).map((el, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-1.5 ${
                    el.status === "Eligible"
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-950"
                      : "bg-red-50/50 border-red-200 text-red-950"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{el.exam}</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 ${
                        el.status === "Eligible"
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {el.status === "Eligible" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>{el.status}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">{el.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

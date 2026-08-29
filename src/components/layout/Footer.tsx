import React from "react";
import { GraduationCap, Heart, Sparkles, BookOpen, ShieldCheck, Mail } from "lucide-react";

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => onNavigate("/")}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-lg text-white block leading-tight">
                  Student Toolkit <span className="text-blue-400">India</span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Free Study, Exam & AI Tools
                </span>
              </div>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Student Toolkit India is a dedicated, free academic utility platform built for Indian school students (Class 1–12), CBSE, NCERT, state boards, and NEET/JEE aspirants. Calculate marks, plan study routines, generate mock question papers, and accelerate exam preparation.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Free & No Sign-up Required
              </span>
            </div>
          </div>

          {/* Tools Col */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Popular Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("/tools/percentage-calculator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Percentage Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/cgpa-calculator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  CBSE CGPA Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/gpa-calculator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Weighted GPA Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/marks-calculator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Marksheet Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/age-calculator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Age & Exam Eligibility Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/exam-countdown")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Exam Countdown Clocks
                </button>
              </li>
            </ul>
          </div>

          {/* Study & AI Tools Col */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Study & AI Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("/tools/study-timetable-generator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Study Timetable Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/pomodoro-timer")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Pomodoro Focus Timer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/daily-study-planner")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Daily Study Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/revision-planner")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Spaced Revision Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/ai-notes-generator")}
                  className="hover:text-blue-400 transition-colors text-blue-300 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-blue-400" /> AI Notes Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/ai-mcq-generator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  AI MCQ Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/pdf-summarizer")}
                  className="hover:text-blue-400 transition-colors"
                >
                  PDF Study Summarizer
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Legal Col */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Academic Resources
            </h3>
            <ul className="space-y-2 text-xs mb-6">
              <li>
                <button
                  onClick={() => onNavigate("/question-paper-generator")}
                  className="hover:text-blue-400 transition-colors text-amber-300 font-semibold"
                >
                  ⭐ Question Paper Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/biology-mcq-generator")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Biology NEET MCQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/biology-glossary")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Biology Glossary A-Z
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/chemistry-formula-finder")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Chemistry Formula Sheet
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/physics-formula-finder")}
                  className="hover:text-blue-400 transition-colors"
                >
                  Physics Formula Directory
                </button>
              </li>
            </ul>

            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Company & Legal
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigate("/about")} className="hover:text-blue-400">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/contact")} className="hover:text-blue-400">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/privacy-policy")} className="hover:text-blue-400">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/terms")} className="hover:text-blue-400">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("/disclaimer")} className="hover:text-blue-400">
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            © 2026 Student Toolkit India. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Built for Indian Students & Teachers</span>
            <span>•</span>
            <span>CBSE & NCERT Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from "react";
import { ALL_TOOLS, CATEGORIES } from "../../data/toolsData";
import { AdsterraAd } from "../ads/AdsterraAd";
import { Search, Sparkles, BookOpen, Clock, Calculator, ArrowRight, ShieldCheck, Zap, Award, CheckCircle2, FileText, ChevronRight } from "lucide-react";

interface HomePageProps {
  onNavigate: (slug: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const matchesSearch =
      searchQuery === "" ||
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredTools = ALL_TOOLS.filter((t) =>
    ["question-paper-generator", "percentage-calculator", "study-timetable-generator", "biology-mcq-generator", "ai-notes-generator", "exam-countdown"].includes(t.slug)
  );

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-6 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>21+ Free Educational Tools for Indian Students & Aspirants</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Smart Study & Exam Toolkit for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">
              Indian Students
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base sm:leading-relaxed max-w-2xl mx-auto font-normal">
            CBSE & ICSE marks calculators, NCERT question paper generator, AI study notes, spaced repetition planners, and NEET formula directories — 100% free, fast, and no login required.
          </p>

          {/* Search Box in Hero */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 21 tools (e.g. CBSE 10th percentage, NCERT question paper, Pomodoro)..."
              className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-medium text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            <span className="text-xs text-slate-400 font-semibold">Popular:</span>
            {[
              { label: "Question Paper Gen", slug: "question-paper-generator" },
              { label: "CBSE % Calculator", slug: "percentage-calculator" },
              { label: "Timetable Generator", slug: "study-timetable-generator" },
              { label: "NEET Biology MCQs", slug: "biology-mcq-generator" },
              { label: "AI Study Notes", slug: "ai-notes-generator" },
            ].map((tag) => (
              <button
                key={tag.slug}
                onClick={() => onNavigate(tag.slug)}
                className="text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-full border border-slate-700 transition-colors"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Adsterra Home Section Ad 1 */}
      <AdsterraAd placement="middle" id="home-hero-bottom-ad" />

      {/* Popular / Featured Tools Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured Study & Exam Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Most frequently used tools by CBSE, ICSE, and state board toppers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <div
              key={tool.slug}
              onClick={() => onNavigate(tool.slug)}
              className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {tool.category}
                  </span>
                  {tool.isAiPowered && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded flex items-center gap-1 border border-indigo-100">
                      <Sparkles className="w-2.5 h-2.5" /> AI Powered
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adsterra Home Section Ad 2 */}
      <AdsterraAd placement="content" id="home-featured-bottom-ad" />

      {/* All 21 Tools Directory with Category Filtering */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Complete 21-Tool Academic Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse our comprehensive suite of educational calculators, planners, and AI revision engines
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
            Showing {filteredTools.length} of {ALL_TOOLS.length} Tools
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.slug}
              onClick={() => onNavigate(tool.slug)}
              className="group bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                  {tool.isAiPowered && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 border border-blue-100">
                      <Sparkles className="w-2.5 h-2.5" /> AI
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-blue-600">
                <span>Open Tool</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Student Toolkit India */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Why Indian Students Rely on Student Toolkit
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Engineered specifically for CBSE, ICSE, State Boards, and competitive exams with zero friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2.5">
            <Zap className="w-7 h-7 text-amber-400" />
            <h3 className="font-bold text-base text-white">100% Free & No Sign-Up</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              No account creation, no subscriptions, and no paywalls. Access every calculator, question paper, and formula sheet instantly.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2.5">
            <Award className="w-7 h-7 text-blue-400" />
            <h3 className="font-bold text-base text-white">NCERT & CBSE Blueprint Aligned</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All question papers follow the official 5-section CBSE format (Section A-E) with exact mark distributions, step marking, and answer keys.
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2.5">
            <ShieldCheck className="w-7 h-7 text-emerald-400" />
            <h3 className="font-bold text-base text-white">Fast & Mobile-First</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Optimized for Android smartphones and 4G/5G mobile connections across India with zero bloat and printable PDF export.
            </p>
          </div>
        </div>
      </section>

      {/* Target Boards & Exams Hub */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Target Exams & Academic Boards Supported
          </h2>
          <p className="text-xs text-slate-500">
            Dedicated tools calibrated to official grading criteria and curricula
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { title: "CBSE Board", desc: "Class 1 to 12 • Best of 5 rules • Official blueprints" },
            { title: "ICSE / ISC", desc: "English + Top 4 rules • Point conversions" },
            { title: "NEET UG", desc: "Biology MCQs • High-yield Botany & Zoology formulas" },
            { title: "JEE Main", desc: "Physics & Chemistry formula directories • Timers" },
            { title: "State Boards", desc: "UP Board, Maharashtra, Tamil Nadu, Bihar, Karnataka" },
            { title: "CUET UG", desc: "Domain subject practice & section planners" },
            { title: "College & University", desc: "10-Point CGPA to % conversions (UGC / AICTE)" },
            { title: "Olympiads & NTSE", desc: "Analytical questions & conceptual doubt clearing" },
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h3>
              <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

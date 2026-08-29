import React, { useState, useEffect } from "react";
import { ALL_TOOLS } from "./data/toolsData";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ToolLayout } from "./components/layout/ToolLayout";
import { HomePage } from "./components/home/HomePage";
import { StaticPages } from "./components/pages/StaticPages";
import { MetaTags } from "./components/seo/MetaTags";
import { AdsterraAd } from "./components/ads/AdsterraAd";

// 21 Tool Components
import { PercentageCalculator } from "./components/tools/PercentageCalculator";
import { CgpaCalculator } from "./components/tools/CgpaCalculator";
import { GpaCalculator } from "./components/tools/GpaCalculator";
import { MarksCalculator } from "./components/tools/MarksCalculator";
import { AgeCalculator } from "./components/tools/AgeCalculator";
import { StudyTimetableGenerator } from "./components/tools/StudyTimetableGenerator";
import { ExamCountdown } from "./components/tools/ExamCountdown";
import { PomodoroTimer } from "./components/tools/PomodoroTimer";
import { DailyStudyPlanner } from "./components/tools/DailyStudyPlanner";
import { RevisionPlanner } from "./components/tools/RevisionPlanner";
import { BiologyMcqGenerator } from "./components/tools/BiologyMcqGenerator";
import { BiologyGlossary } from "./components/tools/BiologyGlossary";
import { BiologyConceptFinder } from "./components/tools/BiologyConceptFinder";
import { ChemistryFormulaFinder } from "./components/tools/ChemistryFormulaFinder";
import { PhysicsFormulaFinder } from "./components/tools/PhysicsFormulaFinder";
import { AiNotesGenerator } from "./components/tools/AiNotesGenerator";
import { AiMcqGenerator } from "./components/tools/AiMcqGenerator";
import { AiQuestionAnswerGenerator } from "./components/tools/AiQuestionAnswerGenerator";
import { AiStudyPlanGenerator } from "./components/tools/AiStudyPlanGenerator";
import { PdfSummarizer } from "./components/tools/PdfSummarizer";
import { QuestionPaperGenerator } from "./components/tools/QuestionPaperGenerator";

export default function App() {
  // Parse initial route from URL path or fallback to home
  const getInitialRoute = (): string => {
    try {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
      if (!path) return "home";
      if (path.startsWith("tools/")) {
        return path.replace("tools/", "");
      }
      return path;
    } catch (e) {
      return "home";
    }
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);

  // Sync route with browser history (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (target: string) => {
    let clean = (target || "").replace(/^\/+/, "");
    if (clean.startsWith("tools/")) {
      clean = clean.replace(/^tools\//, "");
    }
    if (clean.startsWith("tools?")) {
      clean = "home";
    }
    if (!clean || clean === "tools" || clean === "/") {
      clean = "home";
    }

    setCurrentRoute(clean);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      let urlPath = "/";
      if (clean === "home") {
        urlPath = "/";
      } else if (["about", "contact", "privacy", "terms", "disclaimer", "sitemap"].includes(clean)) {
        urlPath = `/${clean}`;
      } else {
        urlPath = `/tools/${clean}`;
      }

      if (window.location.pathname !== urlPath) {
        window.history.pushState({}, "", urlPath);
      }
    } catch (e) {
      // safe fallback
    }
  };

  // Find active tool config if route matches a tool slug
  const activeTool = ALL_TOOLS.find((t) => t.slug === currentRoute);

  // Render active tool component
  const renderToolComponent = (slug: string) => {
    switch (slug) {
      case "percentage-calculator":
        return <PercentageCalculator />;
      case "cgpa-calculator":
        return <CgpaCalculator />;
      case "gpa-calculator":
        return <GpaCalculator />;
      case "marks-calculator":
        return <MarksCalculator />;
      case "age-calculator":
        return <AgeCalculator />;
      case "study-timetable-generator":
        return <StudyTimetableGenerator />;
      case "exam-countdown":
        return <ExamCountdown />;
      case "pomodoro-timer":
        return <PomodoroTimer />;
      case "daily-study-planner":
        return <DailyStudyPlanner />;
      case "revision-planner":
        return <RevisionPlanner />;
      case "biology-mcq-generator":
        return <BiologyMcqGenerator />;
      case "biology-glossary":
        return <BiologyGlossary />;
      case "biology-concept-finder":
        return <BiologyConceptFinder />;
      case "chemistry-formula-finder":
        return <ChemistryFormulaFinder />;
      case "physics-formula-finder":
        return <PhysicsFormulaFinder />;
      case "ai-notes-generator":
        return <AiNotesGenerator />;
      case "ai-mcq-generator":
        return <AiMcqGenerator />;
      case "ai-question-answer-generator":
        return <AiQuestionAnswerGenerator />;
      case "ai-study-plan-generator":
        return <AiStudyPlanGenerator />;
      case "pdf-summarizer":
        return <PdfSummarizer />;
      case "question-paper-generator":
        return <QuestionPaperGenerator />;
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white">
      {/* Dynamic SEO Meta Tags & JSON-LD */}
      <MetaTags
        title={
          activeTool
            ? `${activeTool.title} - Free Online Tool | Student Toolkit India`
            : currentRoute === "home"
            ? "Student Toolkit India | 21+ Free Educational Tools for Students & Aspirants"
            : `${currentRoute.toUpperCase()} | Student Toolkit India`
        }
        description={
          activeTool
            ? activeTool.metaDescription
            : "Free CBSE & ICSE percentage calculators, NCERT question paper generator, AI study notes, spaced revision planner, and NEET formula directories for Indian students."
        }
        canonicalUrl={`https://studenttoolkit.in/${activeTool ? `tools/${activeTool.slug}` : currentRoute === "home" ? "" : currentRoute}`}
        tool={activeTool}
      />

      {/* Main Global Navigation */}
      <Navbar onNavigate={handleNavigate} currentRoute={currentRoute} />

      {/* Global Top Advertisement */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-2">
        <AdsterraAd placement="top" id="global-top-ad" />
      </div>

      {/* Primary Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {currentRoute === "home" && <HomePage onNavigate={handleNavigate} />}

        {activeTool && (
          <ToolLayout tool={activeTool} onNavigate={handleNavigate}>
            {renderToolComponent(activeTool.slug)}
          </ToolLayout>
        )}

        {["about", "contact", "privacy", "terms", "disclaimer", "sitemap"].includes(currentRoute) && (
          <StaticPages
            page={currentRoute as "about" | "contact" | "privacy" | "terms" | "disclaimer" | "sitemap"}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Bottom / Pre-Footer Advertisement */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-4">
        <AdsterraAd placement="footer" id="global-prefooter-ad" />
      </div>

      {/* Global Comprehensive Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

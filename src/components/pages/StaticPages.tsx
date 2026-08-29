import React from "react";
import { ALL_TOOLS } from "../../data/toolsData";
import { Mail, Shield, BookOpen, FileText, CheckCircle2, Heart } from "lucide-react";
import { AdsterraAd } from "../ads/AdsterraAd";
import { AutoParagraphAds } from "../ads/AutoParagraphAds";

interface StaticPageProps {
  page: "about" | "contact" | "privacy" | "terms" | "disclaimer" | "sitemap";
  onNavigate: (slug: string) => void;
}

export function StaticPages({ page, onNavigate }: StaticPageProps) {
  if (page === "about") {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            About Student Toolkit India
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Free, fast, and accessible academic tools empowering millions of Indian school students and competitive exam aspirants.
          </p>
        </div>

        <AutoParagraphAds frequency={2} maxAds={2} placement="content">
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Student Toolkit India</strong> is a dedicated, open educational platform built specifically to support students preparing for CBSE, ICSE, State Boards, NEET UG, JEE Main, and CUET examinations across India.
            </p>
            <p>
              Preparing for board and entrance examinations in India often involves complex percentage calculations (like CBSE Best of 5, ICSE rules, and university CGPA scales), intensive revision schedules, and finding authentic, syllabus-aligned question papers. Student Toolkit India provides a unified, mobile-first suite of 21+ tools completely free of charge.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">Our Core Principles</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>100% Free Forever:</strong> No paywalls, no mandatory account sign-ups, and no hidden subscriptions.</li>
              <li><strong>NCERT & CBSE Blueprint Alignment:</strong> Every question paper and formula sheet strictly respects official council blueprints and marks allocations.</li>
              <li><strong>Speed & Privacy:</strong> All standard calculations run instantly and locally in your browser. AI study assistants are secured with server-side processing without storing your personal details.</li>
            </ul>
          </div>
        </AutoParagraphAds>

        <AdsterraAd placement="bottom" id="about-bottom-ad" />
      </div>
    );
  }

  if (page === "contact") {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="border-b border-slate-100 pb-4 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Contact Support & Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Have a question, suggestion for a new tool, or found an erratum in a question paper? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl space-y-2">
            <Mail className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">Email Academic Support</h3>
            <p className="text-xs text-slate-600">
              Reach our educational curriculum team at:
            </p>
            <a href="mailto:support@studenttoolkit.in" className="text-xs font-bold text-blue-600 hover:underline">
              support@studenttoolkit.in
            </a>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <h3 className="font-bold text-slate-900 text-sm">Suggest a Tool / Feature</h3>
            <p className="text-xs text-slate-600">
              Need a specialized formula solver or state board calculator? Let us know and we'll build it!
            </p>
          </div>
        </div>

        <AdsterraAd placement="bottom" id="contact-bottom-ad" />
      </div>
    );
  }

  if (page === "privacy") {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
          Privacy Policy
        </h1>
        <p><em>Last Updated: March 2026</em></p>

        <AutoParagraphAds frequency={2} maxAds={2} placement="content">
          <div>
            <h2 className="text-base font-bold text-slate-900 pt-2">1. Overview</h2>
            <p>
              Student Toolkit India ("we", "our") respects your privacy. We do not require users to create an account or provide personal identifying information (PII) to use our calculators and tools.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">2. Local Storage Usage</h2>
            <p>
              Preferences such as your exam date countdowns, custom daily study tasks, and spaced repetition checklists are stored purely on your local device via standard browser <code>localStorage</code>. This data never leaves your device.
            </p>

            <h2 className="text-base font-bold text-slate-900 pt-2">3. AI Tool Queries</h2>
            <p>
              When you submit an academic question or request AI revision notes, the query text is transmitted securely to our server backend to generate responses via Google Gemini AI. No personal identifying records are stored or linked to queries.
            </p>
          </div>
        </AutoParagraphAds>

        <AdsterraAd placement="bottom" id="privacy-bottom-ad" />
      </div>
    );
  }

  if (page === "terms") {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
          Terms of Service
        </h1>
        <p>
          By accessing and using Student Toolkit India, you agree to use our educational materials and calculators solely for lawful, academic, and personal learning purposes.
        </p>
        <h2 className="text-base font-bold text-slate-900 pt-2">Fair Educational Use</h2>
        <p>
          The question papers and revision notes provided on this platform are for practice and educational assistance. While we strive for absolute accuracy in accordance with NCERT and CBSE blueprints, students are encouraged to refer to official board circulars and textbooks for final curriculum confirmation.
        </p>

        <AdsterraAd placement="bottom" id="terms-bottom-ad" />
      </div>
    );
  }

  if (page === "disclaimer") {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
          Academic & Trademark Disclaimer
        </h1>
        <p>
          Student Toolkit India is an independent educational platform and is not officially affiliated with, endorsed by, or sponsored by CBSE (Central Board of Secondary Education), NCERT (National Council of Educational Research and Training), CISCE, NTA (National Testing Agency), or any government body.
        </p>
        <p>
          All trademarks, exam names, and board acronyms (e.g. CBSE, ICSE, NEET, JEE) referenced on this website are the property of their respective trademark holders. Reference to them is made strictly under fair educational nominative use.
        </p>

        <AdsterraAd placement="bottom" id="disclaimer-bottom-ad" />
      </div>
    );
  }

  // Sitemap
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pb-2 border-b border-slate-100">
        Website Sitemap & Tools Index
      </h1>
      <p className="text-xs sm:text-sm text-slate-500">
        Direct directory links to all 21 educational tools and support pages.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {ALL_TOOLS.map((t) => (
          <button
            key={t.slug}
            onClick={() => onNavigate(t.slug)}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 text-left hover:bg-slate-50 transition-all flex items-center justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-600">{t.category}</span>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900">{t.title}</h3>
            </div>
            <span className="text-xs font-bold text-slate-400">→</span>
          </button>
        ))}
      </div>

      <AdsterraAd placement="bottom" id="sitemap-bottom-ad" />
    </div>
  );
}

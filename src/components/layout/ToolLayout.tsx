import React, { useState } from "react";
import { ToolMetadata } from "../../types";
import { Breadcrumbs } from "./Breadcrumbs";
import { MetaTags } from "../seo/MetaTags";
import { TOOLS_DATA } from "../../data/toolsData";
import { AdsterraAd } from "../ads/AdsterraAd";
import {
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  BookOpen,
  Share2,
  Check
} from "lucide-react";

interface ToolLayoutProps {
  tool: ToolMetadata;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export function ToolLayout({ tool, onNavigate, children }: ToolLayoutProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  // Find related tools objects
  const relatedTools = TOOLS_DATA.filter((t) =>
    (tool?.relatedToolSlugs || []).includes(t.slug)
  ).slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Structured Data Schema (SoftwareApplication & FAQPage)
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.name,
      "headline": tool.tagline,
      "description": tool.description,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://studenttoolkit.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": "https://studenttoolkit.in/tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": tool.name,
          "item": `https://studenttoolkit.in/tools/${tool.slug}`
        }
      ]
    },
    ...(tool?.faqs && tool.faqs.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": (tool.faqs || []).map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }
        ]
      : [])
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <MetaTags
        title={`${tool.name} - Free Online Tool for Indian Students`}
        description={tool.description}
        canonicalUrl={`https://studenttoolkit.in/tools/${tool.slug}`}
        schema={structuredData}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Top Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Tools", path: "/tools" },
            { label: tool.category, path: `/tools?category=${encodeURIComponent(tool.category)}` },
            { label: tool.name }
          ]}
          onNavigate={onNavigate}
        />

        {/* Header Title Section */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                  {tool.category}
                </span>
                {tool.badge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/60">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    {tool.badge}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">
                  Free Student Tool
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {tool.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl">
                {tool.tagline}. {tool.description}
              </p>
            </div>

            {/* Share Tool button */}
            <div className="shrink-0 self-start sm:self-center">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-2xs"
                title="Share this tool with classmates"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Share Tool</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Adsterra Top Tool Placement */}
        <AdsterraAd placement="top" id={`ad-tool-top-${tool.slug}`} />

        {/* 4. THE ACTUAL WORKING TOOL (Near the top of the page!) */}
        <section id="interactive-tool-area" aria-label="Interactive Tool Workspace">
          {children}
        </section>

        {/* Adsterra Middle Tool Placement */}
        <AdsterraAd placement="middle" id={`ad-tool-mid-${tool.slug}`} />

        {/* 5. How to Use Section */}
        {tool?.howToUse && tool.howToUse.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2>How to Use the {tool.name}</h2>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(tool.howToUse || []).map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {idx + 1}
                  </div>
                  <span className="text-sm text-slate-700 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* 6. Example & Calculation Section */}
        {tool?.example && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2>Practical Example & Step-by-Step Breakdown</h2>
            </div>
            <div className="bg-slate-900 text-slate-100 rounded-xl p-5 sm:p-6 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {tool.example.title}
              </div>
              <p className="text-sm text-slate-300 font-medium">
                {tool.example.scenario}
              </p>
              <div className="border-t border-slate-800 pt-3 space-y-1.5 font-mono text-xs text-slate-300">
                {(tool.example.steps || []).map((st, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-blue-400">›</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-sm font-semibold text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{tool.example.result}</span>
              </div>
            </div>
          </section>
        )}

        {/* 7. Important Tips & CBSE/Exam Best Practices */}
        {tool?.tips && tool.tips.length > 0 && (
          <section className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 rounded-2xl border border-amber-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-lg">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <h2>Important Tips for Indian Students & Board Exams</h2>
            </div>
            <ul className="space-y-2.5">
              {(tool.tips || []).map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-amber-900/90 leading-relaxed">
                  <span className="text-amber-600 font-bold mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 8. FAQ Accordion */}
        {tool?.faqs && tool.faqs.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3 divide-y divide-slate-100">
              {(tool.faqs || []).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={idx > 0 ? "pt-3" : ""}>
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full py-2.5 flex items-center justify-between text-left gap-4 font-semibold text-slate-800 hover:text-blue-600 transition-colors focus:outline-none"
                    >
                      <span className="text-sm sm:text-base">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="pb-3 text-sm text-slate-600 leading-relaxed pt-1 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Adsterra Bottom Tool Placement */}
        <AdsterraAd placement="bottom" id={`ad-tool-btm-${tool.slug}`} />

        {/* 9 & 10. Related Tools & Internal Links */}
        {relatedTools.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Related Study & Exam Tools
              </h2>
              <button
                onClick={() => onNavigate("/tools")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View All 21 Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((rt) => (
                <button
                  key={rt.id}
                  onClick={() => {
                    if (rt.slug === "question-paper-generator") {
                      onNavigate("/question-paper-generator");
                    } else {
                      onNavigate(`/tools/${rt.slug}`);
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 text-left transition-all group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-blue-600 block uppercase tracking-wide mb-1">
                      {rt.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {rt.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {rt.tagline}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center text-xs font-semibold text-blue-600 gap-1">
                    <span>Open Tool</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

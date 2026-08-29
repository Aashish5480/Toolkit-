import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Menu,
  X,
  BookOpen,
  Sparkles,
  Award,
  FlaskConical,
  Percent,
  FileSpreadsheet,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { TOOLS_DATA } from "../../data/toolsData";

interface NavbarProps {
  currentPath?: string;
  currentRoute?: string;
  onNavigate: (path: string) => void;
}

export function Navbar({ currentPath, currentRoute, onNavigate }: NavbarProps) {
  const activePath = currentPath || (currentRoute ? (currentRoute === "home" ? "/" : `/tools/${currentRoute}`) : "/");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTools = searchQuery.trim()
    ? TOOLS_DATA.filter((tool) => {
        const query = searchQuery.toLowerCase();
        return (
          tool.name.toLowerCase().includes(query) ||
          tool.category.toLowerCase().includes(query) ||
          tool.tagline.toLowerCase().includes(query) ||
          (tool.keywords && tool.keywords.some((k) => k.toLowerCase().includes(query)))
        );
      })
    : [];

  const handleSelectTool = (slug: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    setMobileMenuOpen(false);
    if (slug === "question-paper-generator") {
      onNavigate("/question-paper-generator");
    } else {
      onNavigate(`/tools/${slug}`);
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Tools", path: "/tools" },
    { label: "Study Tools", path: "/tools?category=Study+Tools" },
    { label: "Exam Tools", path: "/tools?category=Exam+Tools" },
    { label: "Science", path: "/tools?category=Science+Tools" },
    { label: "AI Tools", path: "/tools?category=AI+Study+Tools" },
    { label: "Question Paper Generator", path: "/question-paper-generator", highlight: true },
    { label: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Banner / Announcement */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 px-4 py-1 text-center text-xs font-medium text-blue-100 flex items-center justify-center gap-2">
        <span className="bg-blue-500/30 text-white px-2 py-0.5 rounded-full text-[11px] font-semibold border border-blue-400/30">
          CBSE & NCERT 2026
        </span>
        <span>100% Free Educational Tools for Indian Students & Teachers</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => {
              onNavigate("/");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Student Toolkit India Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block leading-tight">
                Student Toolkit <span className="text-blue-400 font-extrabold">India</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium block">
                Free Study, Exam & AI Tools
              </span>
            </div>
          </button>

          {/* Global Search Bar (Desktop) */}
          <div className="hidden lg:block relative flex-1 max-w-xs xl:max-w-sm" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search tools (e.g. CGPA, Biology)..."
                className="w-full bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {searchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Search Results ({filteredTools.length})
                </div>
                {filteredTools.length > 0 ? (
                  <div className="py-1">
                    {filteredTools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectTool(tool.slug)}
                        className="w-full px-3 py-2.5 text-left flex items-start gap-3 hover:bg-slate-800 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-950 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white group-hover:text-blue-300">
                            {tool.name}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">
                            {tool.tagline}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No tools found matching "{searchQuery}". Try searching for 'percentage', 'biology', or 'planner'.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                activePath === link.path ||
                (link.path.includes("category=") && activePath.includes(link.path));
              return (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.path)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    link.highlight
                      ? "bg-blue-600/20 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white"
                      : isActive
                      ? "bg-slate-800 text-blue-400 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Explore Free Tools CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onNavigate("/tools")}
              className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Free Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-3 pt-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. CGPA, Biology, MCQ)..."
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile search dropdown */}
          {searchQuery.trim().length > 0 && (
            <div className="mt-2 bg-slate-900 border border-slate-700 rounded-lg p-2 max-h-60 overflow-y-auto">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.slug)}
                    className="w-full text-left p-2 hover:bg-slate-800 rounded text-sm text-slate-200 block"
                  >
                    <span className="font-semibold text-blue-400">{tool.name}</span>
                    <span className="text-xs text-slate-400 block truncate">{tool.tagline}</span>
                  </button>
                ))
              ) : (
                <div className="p-2 text-xs text-slate-400 text-center">No tools found.</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onNavigate(link.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium block transition-colors ${
                link.highlight
                  ? "bg-blue-600 text-white font-semibold"
                  : activePath === link.path
                  ? "bg-slate-800 text-blue-400 font-semibold"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onNavigate("/tools");
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-2.5 rounded-lg text-center shadow"
            >
              Explore All 21 Free Tools
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

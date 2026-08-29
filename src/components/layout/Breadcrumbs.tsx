import React from "react";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (path: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-2.5 text-xs text-slate-500 flex items-center flex-wrap gap-1.5">
      <button
        onClick={() => onNavigate("/")}
        className="flex items-center gap-1 hover:text-blue-600 transition-colors focus:outline-none"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>
      {(items || []).map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.path ? (
            <button
              onClick={() => onNavigate(item.path!)}
              className="hover:text-blue-600 transition-colors font-medium focus:outline-none"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { AD_CONFIG, AdPlacementConfig } from "../../config/adConfig";

export interface AdsterraAdProps {
  key?: React.Key;
  placement?: "top" | "middle" | "content" | "bottom" | "footer" | "inline" | string;
  customScriptUrl?: string;
  className?: string;
  showLabel?: boolean;
  minHeight?: number;
  id?: string;
  rootMargin?: string;
}

export function AdsterraAd({
  placement = "content",
  customScriptUrl,
  className = "",
  showLabel = true,
  minHeight,
  id,
  rootMargin = "200px 0px",
}: AdsterraAdProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [, setHasError] = useState(false);

  // Lookup placement config
  const placementConfig: AdPlacementConfig =
    AD_CONFIG.placements[placement] || {
      id: `adsterra-${placement}`,
      enabled: true,
      scriptUrl: AD_CONFIG.defaultScriptUrl,
      minHeight: 60,
      label: "Advertisement",
    };

  const scriptUrl = customScriptUrl || placementConfig.scriptUrl || AD_CONFIG.defaultScriptUrl;
  const effectiveMinHeight = minHeight ?? placementConfig.minHeight ?? 60;
  const effectiveId = id || `${placementConfig.id}-${Math.random().toString(36).substring(2, 8)}`;

  // Intersection Observer to trigger lazy loading when ad container enters the viewport
  useEffect(() => {
    if (!AD_CONFIG.enabled || !placementConfig.enabled) return;

    // Fallback if IntersectionObserver is not supported
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const currentWrapper = wrapperRef.current;
    if (!currentWrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(currentWrapper);

    return () => {
      observer.disconnect();
    };
  }, [placementConfig.enabled, rootMargin]);

  // Load the Adsterra script only once the container is visible/near the viewport
  useEffect(() => {
    if (!isVisible) return;

    const container = containerRef.current;
    if (!container) return;

    // Clear previous children to prevent duplicate script tags on remount
    container.innerHTML = "";

    try {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = scriptUrl;
      script.async = true;

      script.onload = () => {
        setAdLoaded(true);
      };

      script.onerror = () => {
        // Silently handle adblockers or network errors without breaking the page
        setHasError(true);
      };

      container.appendChild(script);
    } catch (e) {
      setHasError(true);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [isVisible, scriptUrl]);

  // If advertising is globally disabled or disabled for this placement
  if (!AD_CONFIG.enabled || !placementConfig.enabled) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      id={effectiveId}
      className={`adsterra-ad-container w-full max-w-full overflow-hidden my-4 sm:my-6 transition-all ${className}`}
      style={{ minHeight: adLoaded ? undefined : `${effectiveMinHeight}px` }}
      data-placement={placement}
    >
      <div className="w-full flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50/70 border border-slate-200/60 transition-colors">
        {/* Subtle, standard Advertisement Badge */}
        {showLabel && AD_CONFIG.showLabel && (
          <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mb-1 select-none">
            {placementConfig.label || "Advertisement"}
          </span>
        )}

        {/* Adsterra script container */}
        <div
          ref={containerRef}
          className="w-full flex items-center justify-center overflow-hidden min-h-[50px]"
          style={{ maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}

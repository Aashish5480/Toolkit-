import React, { useEffect, useRef, useState } from "react";
import { AD_CONFIG, AdPlacementConfig, ADSTERRA_INVOKE_DOMAIN } from "../../config/adConfig";

export interface AdsterraAdProps {
  key?: React.Key;
  placement?: "top" | "middle" | "content" | "bottom" | "footer" | "inline" | string;
  customScriptUrl?: string;
  bannerKey?: string;
  width?: number;
  height?: number;
  className?: string;
  showLabel?: boolean;
  minHeight?: number;
  id?: string;
  rootMargin?: string;
}

export function AdsterraAd({
  placement = "content",
  customScriptUrl,
  bannerKey,
  width,
  height,
  className = "",
  showLabel = true,
  minHeight,
  id,
  rootMargin = "200px 0px",
}: AdsterraAdProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  // Lookup placement config
  const placementConfig: AdPlacementConfig =
    AD_CONFIG.placements[placement] || {
      id: `adsterra-${placement}`,
      enabled: true,
      type: "banner",
      bannerKey: AD_CONFIG.defaultBannerKey,
      width: AD_CONFIG.defaultBannerWidth,
      height: AD_CONFIG.defaultBannerHeight,
      label: "Advertisement",
    };

  const effectiveBannerKey = bannerKey || placementConfig.bannerKey || AD_CONFIG.defaultBannerKey;
  const effectiveWidth = width || placementConfig.width || AD_CONFIG.defaultBannerWidth || 320;
  const effectiveHeight = height || placementConfig.height || AD_CONFIG.defaultBannerHeight || 50;
  const scriptUrl = customScriptUrl || placementConfig.scriptUrl || AD_CONFIG.defaultScriptUrl;
  const effectiveId = id || `${placementConfig.id}-${Math.random().toString(36).substring(2, 8)}`;

  // Intersection Observer for viewport visibility
  useEffect(() => {
    if (!AD_CONFIG.enabled || !placementConfig.enabled) return;

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

  // Load Banner or Script
  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // Case 1: Standard Adsterra Banner (atOptions format inside isolated iframe)
    if (effectiveBannerKey) {
      setHasContent(true);
      const iframe = document.createElement("iframe");
      iframe.width = `${effectiveWidth}`;
      iframe.height = `${effectiveHeight}`;
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";
      iframe.style.width = `${effectiveWidth}px`;
      iframe.style.height = `${effectiveHeight}px`;
      iframe.scrolling = "no";
      iframe.title = "Advertisement";

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body, html { margin: 0; padding: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '${effectiveBannerKey}',
                'format' : 'iframe',
                'height' : ${effectiveHeight},
                'width' : ${effectiveWidth},
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="${ADSTERRA_INVOKE_DOMAIN}/${effectiveBannerKey}/invoke.js"></script>
          </body>
        </html>
      `;

      container.appendChild(iframe);
      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
      return;
    }

    // Case 2: Direct Script Execution (Social Bar / Popunder / Native script)
    try {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = scriptUrl;
      script.async = true;

      script.onload = () => {
        setTimeout(() => {
          if (container.children.length > 1 || container.clientHeight > 20) {
            setHasContent(true);
          }
        }, 500);
      };

      container.appendChild(script);
    } catch {
      // Ignore network / adblock errors
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [isVisible, effectiveBannerKey, effectiveWidth, effectiveHeight, scriptUrl]);

  if (!AD_CONFIG.enabled || !placementConfig.enabled) {
    return null;
  }

  const isBanner = !!effectiveBannerKey;

  return (
    <div
      ref={wrapperRef}
      id={effectiveId}
      className={`adsterra-ad-wrapper w-full max-w-full flex justify-center overflow-hidden transition-all ${
        isBanner || hasContent ? "my-3 sm:my-5" : ""
      } ${className}`}
      data-placement={placement}
    >
      <div
        className={`inline-flex flex-col items-center justify-center transition-colors ${
          isBanner || hasContent ? "p-2 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs" : ""
        }`}
        style={{ minWidth: isBanner ? "fit-content" : undefined }}
      >
        {/* Advertisement Label */}
        {(showLabel || AD_CONFIG.showLabel) && (isBanner || hasContent) && (
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 select-none">
            {placementConfig.label || "Advertisement"}
          </span>
        )}

        {/* Adsterra script container */}
        <div
          ref={containerRef}
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: isBanner ? `${effectiveWidth}px` : "100%",
            height: isBanner ? `${effectiveHeight}px` : undefined,
            minHeight: isBanner ? `${effectiveHeight}px` : undefined,
            maxWidth: "100%",
          }}
        />
      </div>
    </div>
  );
}



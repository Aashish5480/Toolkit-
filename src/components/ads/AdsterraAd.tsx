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

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine effective key & dimensions: 728x90 on desktop/tablet, 320x50 on mobile
  const chosenBannerKey = isMobile
    ? bannerKey || placementConfig.mobileBannerKey || AD_CONFIG.mobileBannerKey
    : bannerKey || placementConfig.bannerKey || AD_CONFIG.defaultBannerKey;

  const chosenWidth = isMobile
    ? width || placementConfig.mobileBannerKey ? AD_CONFIG.mobileBannerWidth : 320
    : width || placementConfig.width || AD_CONFIG.defaultBannerWidth || 728;

  const chosenHeight = isMobile
    ? height || placementConfig.mobileBannerKey ? AD_CONFIG.mobileBannerHeight : 50
    : height || placementConfig.height || AD_CONFIG.defaultBannerHeight || 90;

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
    if (chosenBannerKey) {
      setHasContent(true);
      const iframe = document.createElement("iframe");
      iframe.width = `${chosenWidth}`;
      iframe.height = `${chosenHeight}`;
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";
      iframe.style.width = `${chosenWidth}px`;
      iframe.style.height = `${chosenHeight}px`;
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
                'key' : '${chosenBannerKey}',
                'format' : 'iframe',
                'height' : ${chosenHeight},
                'width' : ${chosenWidth},
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="${ADSTERRA_INVOKE_DOMAIN}/${chosenBannerKey}/invoke.js"></script>
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
  }, [isVisible, chosenBannerKey, chosenWidth, chosenHeight, scriptUrl]);

  if (!AD_CONFIG.enabled || !placementConfig.enabled) {
    return null;
  }

  const isBanner = !!chosenBannerKey;

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
            width: isBanner ? `${chosenWidth}px` : "100%",
            height: isBanner ? `${chosenHeight}px` : undefined,
            minHeight: isBanner ? `${chosenHeight}px` : undefined,
            maxWidth: "100%",
          }}
        />
      </div>
    </div>
  );
}



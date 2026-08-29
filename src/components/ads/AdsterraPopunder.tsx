import { useEffect, useRef } from "react";
import { ADSTERRA_POPUNDER_SCRIPT_URL, AD_CONFIG } from "../../config/adConfig";

interface AdsterraPopunderProps {
  currentRoute: string;
}

/**
 * Global Adsterra Popunder Manager
 * - Injects the official Popunder script once globally in the <head> tag
 * - Prevents duplicate script tags during SPA lifecycle
 * - Observes route changes across tools, home, and static pages
 * - Does not interfere with click handlers, form inputs, calculators, or PDF generators
 * - Compatible with mobile and desktop browsers & Vercel deployment
 */
export function AdsterraPopunder({ currentRoute }: AdsterraPopunderProps) {
  const isFirstMount = useRef(true);
  const previousRoute = useRef(currentRoute);

  useEffect(() => {
    if (!AD_CONFIG.enabled || !ADSTERRA_POPUNDER_SCRIPT_URL) return;

    const SCRIPT_ID = "adsterra-popunder-global-script";

    // 1. Check if the script is already present in document head or body
    let scriptElement = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!scriptElement) {
      try {
        scriptElement = document.createElement("script");
        scriptElement.id = SCRIPT_ID;
        scriptElement.type = "text/javascript";
        scriptElement.src = ADSTERRA_POPUNDER_SCRIPT_URL;
        scriptElement.async = true;
        document.head.appendChild(scriptElement);
      } catch {
        // Silently catch in restricted/sandboxed environments
      }
    }

    // 2. Track route transitions for single-page application navigation
    if (isFirstMount.current) {
      isFirstMount.current = false;
      previousRoute.current = currentRoute;
    } else if (previousRoute.current !== currentRoute) {
      previousRoute.current = currentRoute;
      // On route change in React SPA, Adsterra's document-level event listeners
      // remain attached and handle the user's subsequent interaction naturally.
    }
  }, [currentRoute]);

  return null;
}

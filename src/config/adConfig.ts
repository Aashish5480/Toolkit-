// Centralized Adsterra Ad Configuration
// Configured with Adsterra 320x50 Banner (Key: 9767658d24ae7a0c8c6174636b6a254c)

export interface AdPlacementConfig {
  id: string;
  enabled: boolean;
  type?: "banner" | "native" | "script";
  bannerKey?: string; // Adsterra atOptions 'key' for banner
  width?: number;
  height?: number;
  scriptUrl?: string;
  label?: string;
}

export interface AdsterraConfig {
  enabled: boolean;
  defaultBannerKey: string;
  defaultBannerWidth: number;
  defaultBannerHeight: number;
  defaultScriptUrl: string;
  showLabel: boolean;
  maxAdsPerShortPage: number;
  maxAdsPerMediumPage: number;
  maxAdsPerLongPage: number;
  paragraphAdFrequency: number;
  placements: Record<string, AdPlacementConfig>;
}

// User-provided Adsterra 320x50 Banner Key
export const ADSTERRA_BANNER_KEY = "9767658d24ae7a0c8c6174636b6a254c";
export const ADSTERRA_BANNER_WIDTH = 320;
export const ADSTERRA_BANNER_HEIGHT = 50;
export const ADSTERRA_INVOKE_DOMAIN = "https://www.highrevenueformat.com";

// Global script URL provided by Adsterra publisher network (Social Bar / Popunder / Direct)
export const ADSTERRA_DEFAULT_SCRIPT_URL =
  "https://pl31069833.profitableratecpmnetwork.com/cd/f2/10/cdf21021d6d6e39d4b808f3f842da59a.js";

export const AD_CONFIG: AdsterraConfig = {
  enabled: true,
  defaultBannerKey: ADSTERRA_BANNER_KEY,
  defaultBannerWidth: ADSTERRA_BANNER_WIDTH,
  defaultBannerHeight: ADSTERRA_BANNER_HEIGHT,
  defaultScriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
  showLabel: true,
  maxAdsPerShortPage: 3,
  maxAdsPerMediumPage: 6,
  maxAdsPerLongPage: 10,
  paragraphAdFrequency: 3,
  placements: {
    top: {
      id: "adsterra-top",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_BANNER_KEY,
      width: ADSTERRA_BANNER_WIDTH,
      height: ADSTERRA_BANNER_HEIGHT,
      label: "Advertisement",
    },
    middle: {
      id: "adsterra-middle",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_BANNER_KEY,
      width: ADSTERRA_BANNER_WIDTH,
      height: ADSTERRA_BANNER_HEIGHT,
      label: "Advertisement",
    },
    content: {
      id: "adsterra-content",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_BANNER_KEY,
      width: ADSTERRA_BANNER_WIDTH,
      height: ADSTERRA_BANNER_HEIGHT,
      label: "Sponsored",
    },
    bottom: {
      id: "adsterra-bottom",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_BANNER_KEY,
      width: ADSTERRA_BANNER_WIDTH,
      height: ADSTERRA_BANNER_HEIGHT,
      label: "Advertisement",
    },
    footer: {
      id: "adsterra-footer",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_BANNER_KEY,
      width: ADSTERRA_BANNER_WIDTH,
      height: ADSTERRA_BANNER_HEIGHT,
      label: "Advertisement",
    },
  },
};



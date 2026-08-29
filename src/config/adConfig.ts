// Centralized Adsterra Ad Configuration
// Configured with Adsterra 728x90 Leaderboard (Key: 4cc44d8c648453c09d5e134f438313bf)
// and Mobile 320x50 Banner (Key: 9767658d24ae7a0c8c6174636b6a254c)

export interface AdPlacementConfig {
  id: string;
  enabled: boolean;
  type?: "banner" | "native" | "script";
  bannerKey?: string; // Adsterra atOptions 'key' for banner
  mobileBannerKey?: string;
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
  mobileBannerKey: string;
  mobileBannerWidth: number;
  mobileBannerHeight: number;
  defaultScriptUrl: string;
  showLabel: boolean;
  maxAdsPerShortPage: number;
  maxAdsPerMediumPage: number;
  maxAdsPerLongPage: number;
  paragraphAdFrequency: number;
  placements: Record<string, AdPlacementConfig>;
}

// User-provided Adsterra 728x90 Leaderboard Banner Key
export const ADSTERRA_LEADERBOARD_KEY = "4cc44d8c648453c09d5e134f438313bf";
export const ADSTERRA_LEADERBOARD_WIDTH = 728;
export const ADSTERRA_LEADERBOARD_HEIGHT = 90;

// User-provided Adsterra 320x50 Mobile Banner Key
export const ADSTERRA_MOBILE_KEY = "9767658d24ae7a0c8c6174636b6a254c";
export const ADSTERRA_MOBILE_WIDTH = 320;
export const ADSTERRA_MOBILE_HEIGHT = 50;

export const ADSTERRA_INVOKE_DOMAIN = "https://www.highrevenueformat.com";

// User-provided Adsterra Popunder Script URL
export const ADSTERRA_POPUNDER_SCRIPT_URL =
  "https://pl31082178.profitableratecpmnetwork.com/ad/b6/eb/adb6ebb53b3f4ce33238f03b786487a1.js";

// Global script URL provided by Adsterra publisher network (Social Bar / Direct)
export const ADSTERRA_DEFAULT_SCRIPT_URL =
  "https://pl31069833.profitableratecpmnetwork.com/cd/f2/10/cdf21021d6d6e39d4b808f3f842da59a.js";

export const AD_CONFIG: AdsterraConfig = {
  enabled: true,
  defaultBannerKey: ADSTERRA_LEADERBOARD_KEY,
  defaultBannerWidth: ADSTERRA_LEADERBOARD_WIDTH,
  defaultBannerHeight: ADSTERRA_LEADERBOARD_HEIGHT,
  mobileBannerKey: ADSTERRA_MOBILE_KEY,
  mobileBannerWidth: ADSTERRA_MOBILE_WIDTH,
  mobileBannerHeight: ADSTERRA_MOBILE_HEIGHT,
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
      bannerKey: ADSTERRA_LEADERBOARD_KEY,
      mobileBannerKey: ADSTERRA_MOBILE_KEY,
      width: ADSTERRA_LEADERBOARD_WIDTH,
      height: ADSTERRA_LEADERBOARD_HEIGHT,
      label: "Advertisement",
    },
    middle: {
      id: "adsterra-middle",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_LEADERBOARD_KEY,
      mobileBannerKey: ADSTERRA_MOBILE_KEY,
      width: ADSTERRA_LEADERBOARD_WIDTH,
      height: ADSTERRA_LEADERBOARD_HEIGHT,
      label: "Advertisement",
    },
    content: {
      id: "adsterra-content",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_LEADERBOARD_KEY,
      mobileBannerKey: ADSTERRA_MOBILE_KEY,
      width: ADSTERRA_LEADERBOARD_WIDTH,
      height: ADSTERRA_LEADERBOARD_HEIGHT,
      label: "Sponsored",
    },
    bottom: {
      id: "adsterra-bottom",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_LEADERBOARD_KEY,
      mobileBannerKey: ADSTERRA_MOBILE_KEY,
      width: ADSTERRA_LEADERBOARD_WIDTH,
      height: ADSTERRA_LEADERBOARD_HEIGHT,
      label: "Advertisement",
    },
    footer: {
      id: "adsterra-footer",
      enabled: true,
      type: "banner",
      bannerKey: ADSTERRA_LEADERBOARD_KEY,
      mobileBannerKey: ADSTERRA_MOBILE_KEY,
      width: ADSTERRA_LEADERBOARD_WIDTH,
      height: ADSTERRA_LEADERBOARD_HEIGHT,
      label: "Advertisement",
    },
  },
};



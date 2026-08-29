// Centralized Adsterra Ad Configuration
// You can easily update, replace, or add new Adsterra ad codes/scripts here for different placements without modifying individual pages.

export interface AdPlacementConfig {
  id: string;
  enabled: boolean;
  scriptUrl: string;
  minHeight?: number;
  label?: string;
}

export interface AdsterraConfig {
  enabled: boolean;
  defaultScriptUrl: string;
  showLabel: boolean;
  maxAdsPerShortPage: number;
  maxAdsPerMediumPage: number;
  maxAdsPerLongPage: number;
  paragraphAdFrequency: number; // Insert ad every N substantial paragraphs
  placements: Record<string, AdPlacementConfig>;
}

// EXACT script URL as provided by Adsterra publisher network
export const ADSTERRA_DEFAULT_SCRIPT_URL =
  "https://pl31069833.profitableratecpmnetwork.com/cd/f2/10/cdf21021d6d6e39d4b808f3f842da59a.js";

export const AD_CONFIG: AdsterraConfig = {
  enabled: true,
  defaultScriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
  showLabel: true,
  maxAdsPerShortPage: 3,
  maxAdsPerMediumPage: 6,
  maxAdsPerLongPage: 10,
  paragraphAdFrequency: 3, // Every 3-4 substantial paragraphs
  placements: {
    top: {
      id: "adsterra-top",
      enabled: true,
      scriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
      minHeight: 60,
      label: "Advertisement",
    },
    middle: {
      id: "adsterra-middle",
      enabled: true,
      scriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
      minHeight: 90,
      label: "Advertisement",
    },
    content: {
      id: "adsterra-content",
      enabled: true,
      scriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
      minHeight: 90,
      label: "Sponsored",
    },
    bottom: {
      id: "adsterra-bottom",
      enabled: true,
      scriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
      minHeight: 90,
      label: "Advertisement",
    },
    footer: {
      id: "adsterra-footer",
      enabled: true,
      scriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
      minHeight: 60,
      label: "Advertisement",
    },
    inline: {
      id: "adsterra-inline",
      enabled: true,
      scriptUrl: ADSTERRA_DEFAULT_SCRIPT_URL,
      minHeight: 60,
      label: "Advertisement",
    },
  },
};

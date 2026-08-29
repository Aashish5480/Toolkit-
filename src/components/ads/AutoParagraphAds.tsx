import React from "react";
import { AdsterraAd } from "./AdsterraAd";
import { AD_CONFIG } from "../../config/adConfig";

interface AutoParagraphAdsProps {
  children: React.ReactNode;
  frequency?: number; // default from AD_CONFIG (e.g. every 3-4 paragraphs)
  maxAds?: number;
  className?: string;
  placement?: string;
}

export function AutoParagraphAds({
  children,
  frequency = AD_CONFIG.paragraphAdFrequency,
  maxAds = AD_CONFIG.maxAdsPerMediumPage,
  className = "",
  placement = "content",
}: AutoParagraphAdsProps) {
  const childArray = React.Children.toArray(children);
  const elementsWithAds: React.ReactNode[] = [];
  let paragraphCount = 0;
  let adsInserted = 0;

  childArray.forEach((child, index) => {
    elementsWithAds.push(child);

    // Only count standard substantial paragraph/text elements
    if (React.isValidElement(child)) {
      const isParagraph =
        child.type === "p" ||
        (typeof child.props?.className === "string" &&
          (child.props.className.includes("text-") || child.props.className.includes("paragraph")));

      // Ensure we NEVER inject ads inside form elements, inputs, buttons, or navigation
      const isFormOrButton =
        child.type === "form" ||
        child.type === "button" ||
        child.type === "input" ||
        child.type === "nav" ||
        child.type === "header" ||
        child.type === "footer";

      if (isParagraph && !isFormOrButton) {
        paragraphCount++;

        // After every N paragraphs, insert an ad container if within max limit
        if (
          paragraphCount >= frequency &&
          adsInserted < maxAds &&
          index < childArray.length - 1 // Don't insert right after the very last element
        ) {
          elementsWithAds.push(
            <AdsterraAd
              key={`auto-ad-${index}-${adsInserted}`}
              placement={placement}
              id={`auto-content-ad-${adsInserted + 1}`}
            />
          );
          paragraphCount = 0;
          adsInserted++;
        }
      }
    }
  });

  return <div className={`auto-paragraph-content ${className}`}>{elementsWithAds}</div>;
}

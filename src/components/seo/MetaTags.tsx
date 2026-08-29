import { useEffect } from "react";

interface MetaTagsProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  schema?: Record<string, any> | Record<string, any>[];
  tool?: any;
}

export function MetaTags({ title, description, canonicalUrl, schema }: MetaTagsProps) {
  useEffect(() => {
    // Update Title
    const safeTitle = title || "Student Toolkit India";
    document.title = safeTitle.includes("Student Toolkit India")
      ? safeTitle
      : `${safeTitle} | Student Toolkit India`;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description || "Free educational tools for Indian students");

    // Update Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalUrl || window.location.href);

    // Inject JSON-LD Schema
    const existingScript = document.getElementById("jsonld-structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement("script");
      script.id = "jsonld-structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalUrl, schema]);

  return null;
}

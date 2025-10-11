"use client";

import { useEffect, useRef, useState } from "react";

interface CusdisProps {
  appId: string;
  pageId?: string;
  pageUrl?: string;
  pageTitle?: string;
  theme?: "light" | "dark" | "auto";
}

export default function Comments({
  appId,
  pageId,
  pageUrl,
  pageTitle,
  theme = "auto",
}: CusdisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load Cusdis script
    const script = document.createElement("script");
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize Cusdis when script loads
    script.onload = () => {
      if (window.CUSDIS) {
        window.CUSDIS.initial();
      }
    };

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [mounted]);

  // Update Cusdis when theme changes
  useEffect(() => {
    if (window.CUSDIS) {
      window.CUSDIS.setTheme(theme);
    }
  }, [theme]);

  // Don't render the widget until after hydration to avoid mismatch
  if (!mounted) {
    return <div className="w-full" style={{ minHeight: "324px" }} />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ minHeight: "324px" }}
      id="cusdis_thread"
      data-host="https://cusdis.com"
      data-app-id={appId}
      data-page-id={pageId || window.location.pathname}
      data-page-url={pageUrl || window.location.href}
      data-page-title={pageTitle || document.title}
      data-theme={theme}
    />
  );
}

// Type augmentation for window.CUSDIS
declare global {
  interface Window {
    CUSDIS?: {
      initial: () => void;
      setTheme: (theme: string) => void;
    };
  }
}

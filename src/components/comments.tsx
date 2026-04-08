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
  const hasAppId = appId.trim().length > 0;

  // Set mounted state after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !hasAppId) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-cusdis="true"]',
    );

    if (existingScript) {
      if (window.CUSDIS) {
        window.CUSDIS.initial();
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cusdis.com/js/cusdis.es.js";
    script.async = true;
    script.defer = true;
    script.dataset.cusdis = "true";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.CUSDIS) {
        window.CUSDIS.initial();
      }
    };

    return () => {
      script.onload = null;
    };
  }, [hasAppId, mounted]);

  // Update Cusdis when theme changes
  useEffect(() => {
    if (hasAppId && window.CUSDIS) {
      window.CUSDIS.setTheme(theme);
    }
  }, [hasAppId, theme]);

  // Don't render the widget until after hydration to avoid mismatch
  if (!mounted) {
    return <div className="w-full" style={{ minHeight: "324px" }} />;
  }

  if (!hasAppId) {
    return (
      <div className="rounded-2xl border border-dashed border-foreground/15 bg-background/70 p-5 text-sm leading-6 text-foreground/70">
        Comments are not configured for this deployment yet. Add
        `NEXT_PUBLIC_CUSDIS_APP_ID` and redeploy to enable Cusdis.
      </div>
    );
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

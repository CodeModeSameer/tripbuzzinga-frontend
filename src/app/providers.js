"use client";

import { useEffect, useState } from "react";
import { SiteDataProvider, useSiteData } from "@/context/SiteDataContext";

/**
 * Gate: renders children only once data is ready AND component is mounted.
 * This completely avoids hydration mismatches between server (empty data)
 * and client (localStorage data).
 */
function SiteDataGate({ children }) {
  const { isReady } = useSiteData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // On the server, we render the spinner.
  // On the very first client paint, we render the spinner (matching server).
  // Immediately after, we render the real children if data is ready.
  if (!mounted || !isReady) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          zIndex: 99999,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#fbbf24",
              letterSpacing: "-0.5px",
              marginBottom: "16px",
            }}
          >
            ✈ TripBuzzinga
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(251,191,36,0.2)",
              borderTopColor: "#fbbf24",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return children;
}

export function Providers({ children }) {
  return (
    <SiteDataProvider>
      <SiteDataGate>{children}</SiteDataGate>
    </SiteDataProvider>
  );
}

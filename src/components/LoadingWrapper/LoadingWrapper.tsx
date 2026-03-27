"use client";
import React, { useState } from "react";
import LoadingScreen from "@/app/Loading/page";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div 
        className="transition-opacity duration-700"
        style={{ 
          opacity: loading ? 0 : 1,
          pointerEvents: loading ? "none" : "auto"
        }}
      >
        {children}
      </div>
    </>
  );
}

"use client";
import React, { useState } from "react";
import LoadingScreen from "@/app/Loading/page";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div 
        style={{ 
          pointerEvents: loading ? "none" : "auto"
        }}
      >
        {children}
      </div>
    </>
  );
}

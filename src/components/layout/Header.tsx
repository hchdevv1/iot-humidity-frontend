/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
  const [mounted, setMounted] =
    useState(false);

  const [currentDate, setCurrentDate] =
    useState("");

  useEffect(() => {
    setMounted(true);

    setCurrentDate(
      new Date().toLocaleString("en-GB", {
       weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) .replace(",", "")
    );
  }, []);

  return (
    <header
      className="bg-card/95 backdrop-blur-sm border border-border rounded-3xl shadow-sm px-6 py-5"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="flex-1">
          {/* Title */}
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Temperature & Humidity Monitoring Dashboard
          </h1>

          {/* Breadcrumb */}
          <div className="mt-2">
            <Breadcrumbs />
          </div>
        </div>

        {/* Right */}
        <div className="whitespace-nowrap text-sm text-muted-foreground bg-muted/60 px-4 py-2 rounded-2xl border border-border">
          {mounted ? currentDate : ""}
        </div>
      </div>
    </header>
  );
}
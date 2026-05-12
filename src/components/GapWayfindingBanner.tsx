"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isGapPath } from "@/lib/gap-path";

const STORAGE_KEY = "benn-gap-wayfinding";

export default function GapWayfindingBanner() {
  const pathname = usePathname();
  const prevRef = useRef<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prev = prevRef.current;

    if (prev !== null && isGapPath(prev) && !isGapPath(pathname)) {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }

    if (isGapPath(pathname)) {
      sessionStorage.removeItem(STORAGE_KEY);
    }

    const shouldShow =
      !isGapPath(pathname) && sessionStorage.getItem(STORAGE_KEY) === "1";
    setActive(shouldShow);

    prevRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (active) {
      document.body.classList.add("gap-wayfinding-banner-visible");
    } else {
      document.body.classList.remove("gap-wayfinding-banner-visible");
    }
    return () => document.body.classList.remove("gap-wayfinding-banner-visible");
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="gap-wayfinding-banner"
      role="region"
      aria-label="Return to Gap Inc. strategic work hub"
    >
      <span className="gap-wayfinding-banner__mark">Gap</span>
      <span className="gap-wayfinding-banner__text">
        You are in the main portfolio site. Use the ribbon to return to the Gap microsite.
      </span>
      <Link href="/gap" className="gap-wayfinding-banner__link">
        Back to Gap hub
      </Link>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encore Cup '26 — Live District Tracker",
  description:
    "Encore Cup '26: a live cards-per-transaction contest tracker for the Gap Specialty Mid-Atlantic District. Twelve stores, five weeks, Swiss pairings, district MTD, and goal zones — all driven by one weekly data block.",
  openGraph: {
    title: "Encore Cup '26 — Live District Tracker",
    description:
      "Twelve stores. Five weeks. Swiss pairings, golden boot, and a district MTD that recomputes every Monday.",
    url: "https://bennpattara.com/encore-cup",
    type: "website",
  },
};

export default function EncoreCupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

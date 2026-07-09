import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encore Cup '26 · Strategic Audit",
  description:
    "Five-week post-tournament analysis of Encore Cup '26: district conversion floor, cashier cohorts, coaching tiers, and actionable recommendations for Gap Specialty Mid-Atlantic.",
  openGraph: {
    title: "Encore Cup '26 · Strategic Audit",
    description:
      "The district closed at 1.40% vs 1.80% goal. Coaching — not traffic — is the lever. Full five-week breakdown inside.",
    url: "https://bennpattara.com/encore-cup/strategic-audit",
    type: "article",
  },
};

export default function EncoreCupStrategicAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

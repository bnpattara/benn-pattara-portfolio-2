import type { Metadata } from "next";
import CaseStudyHtmlIframe from "@/components/CaseStudyHtmlIframe";

export const metadata: Metadata = {
  title: "Canvas · Gap Inc. Loyalty · Benn Pattara",
  description: "Gap Inc. Loyalty Reimagined — concept brief for tiers, earn mechanics, and belonging.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Canvas · Gap Inc. Loyalty · Benn Pattara",
    description: "Encore rewards spending. Canvas rewards belonging. Architecture for a program that matches how people actually live with Gap.",
    url: "/gap/work/canvas",
    type: "website",
  },
};

export default function GapCanvasBriefPage(): React.ReactElement {
  return (
    <div style={{ width: "100%", height: "100dvh", background: "#fff" }}>
      <CaseStudyHtmlIframe
        htmlPath="/gap/briefs/canvas_brief.html"
        title="Canvas · Gap Inc. Loyalty Reimagined"
      />
    </div>
  );
}

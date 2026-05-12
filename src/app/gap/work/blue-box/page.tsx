import type { Metadata } from "next";
import CaseStudyHtmlIframe from "@/components/CaseStudyHtmlIframe";

export const metadata: Metadata = {
  title: "Blue Box · Gap Inc. · Benn Pattara",
  description: "Gap Inc. Personal Styling concept brief — Canvas-integrated service layer.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Blue Box · Gap Inc. · Benn Pattara",
    description: "The store already knows you. Now it dresses you. A service layer on 1,400 stores and 40M loyalty members.",
    url: "/gap/work/blue-box",
    type: "website",
  },
};

export default function GapBlueBoxBriefPage(): React.ReactElement {
  return (
    <div style={{ width: "100%", height: "100dvh", background: "#fff" }}>
      <CaseStudyHtmlIframe
        htmlPath="/gap/briefs/blue_box_brief.html"
        title="Blue Box · Gap Inc. Personal Styling"
      />
    </div>
  );
}

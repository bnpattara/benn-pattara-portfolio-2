import React from "react";
import type { Metadata } from "next";
import CaseStudyHtmlIframe from "@/components/CaseStudyHtmlIframe";

/** Bump when replacing `public/og/stylect.jpg` so LinkedIn refetches cached previews. */
const OG_STYLECT_VERSION = '2';

export const metadata: Metadata = {
  title: "Stylect · Benn Pattara",
  description:
    "Algorithm proposes. Human closes. A case study on trust, accountability, and the three-sided marketplace between shopper, stylist, and brand.",
  openGraph: {
    title: "Stylect · Benn Pattara",
    description:
      "Algorithm proposes. Human closes. Trust, attribution, and human-authored recommendation in fashion e-commerce.",
    url: "/work/stylect",
    type: "website",
    images: [{ url: `https://bennpattara.com/og/stylect.jpg?v=${OG_STYLECT_VERSION}`, width: 1200, height: 630 }],
  },
};

export default function StylectCaseStudy() {
  return (<div style={{ width: "100%", height: "100dvh", background: "#fff" }}>
      <CaseStudyHtmlIframe
        htmlPath="/case-studies/stylect/index.html"
        title="Stylect, Product &amp; UX Design Case Study"
      />
    </div>);
}

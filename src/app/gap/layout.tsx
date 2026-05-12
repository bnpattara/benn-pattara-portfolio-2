import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gap Inc. · Benn Pattara",
  description:
    "Strategic speculative work and internal context for Gap Inc. — Canvas, Blue Box, applications (M.S. completed May 2026), and the ask.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Gap Inc. · Benn Pattara",
    description:
      "Strategic speculative work and internal context for Gap Inc. — Canvas, Blue Box, applications (M.S. completed May 2026), and the ask.",
    url: "https://bennpattara.com/gap",
    type: "website",
    images: [
      {
        url: "https://bennpattara.com/og/home.png?v=8",
        width: 2400,
        height: 1256,
      },
    ],
  },
};

export default function GapLayout({ children }: { children: React.ReactNode }) {
  return children;
}

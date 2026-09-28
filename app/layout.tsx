import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7A1B29",
};

export const metadata: Metadata = {
  title: {
    default: "NBSZ Certificate Office",
    template: "%s | NBSZ Certificate Office",
  },
  description:
    "National Blood Service Zimbabwe donor certificate printing and recognition office.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
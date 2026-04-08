import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://felippex.netlify.app"),
  title: {
    default: "Felippe Content Playlist",
    template: "%s | Felippe Content Playlist",
  },
  description:
    "Private content playlist demo built with Next.js and Auth.js. The public homepage is informational and account access lives on a dedicated sign-in route.",
  applicationName: "Felippe Content Playlist",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Felippe Content Playlist",
    description:
      "Private content playlist demo built with Next.js and Auth.js on Netlify.",
    url: "https://felippex.netlify.app",
    siteName: "Felippe Content Playlist",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

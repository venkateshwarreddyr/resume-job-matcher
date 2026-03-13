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
  title: "Resume Job Matcher - AI-Powered Resume Analysis",
  description:
    "Analyze your resume against any job description with AI-powered insights. Get match scores, skill analysis, and actionable recommendations to improve your application.",
  keywords: [
    "resume matcher",
    "job matching",
    "ATS analysis",
    "resume analysis",
    "AI resume",
    "career tools",
  ],
  openGraph: {
    title: "Resume Job Matcher - AI-Powered Resume Analysis",
    description:
      "Analyze your resume against any job description with AI-powered insights and actionable recommendations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950`}
      >
        {children}
      </body>
    </html>
  );
}

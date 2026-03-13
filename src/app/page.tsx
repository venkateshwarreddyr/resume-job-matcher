"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ResumeAnalyzer from "@/components/ResumeAnalyzer";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Header />
      <Hero />
      <ResumeAnalyzer />
      <Features />
      <Footer />
    </main>
  );
}

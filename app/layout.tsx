import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import HeroParallax from "@/components/HeroParallax";
import PageFade from "@/components/PageFade";
import FadeProvider from "@/components/FadeProvider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zane Perry | Applied Math & ML",
  description: "Portfolio and research site for Zane Perry – applied mathematics, machine learning, and software engineering."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <FadeProvider>
          <NavBar />

          {/* Top hero/banner - use homepage image */}
          <div className="hero-banner" role="img" aria-label="Homepage banner">
          <img
            src="/homepage.avif"
            alt="Homepage banner"
            className="w-full object-cover"
          />
          <div className="hero-overlay">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                  <HeroParallax />
              </div>
          </div>
        </div>

          <main className="flex-1">
            <div className="content-area">
              {/* PageFade handles entry animations on mount. */}
              <PageFade>{children}</PageFade>
            </div>
          </main>
          <Footer />
        </FadeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import HeroParallax from "@/components/HeroParallax";
import PageFade from "@/components/PageFade";
import FadeProvider from "@/components/FadeProvider";
import Footer from "@/components/Footer";
import BackgroundEffectsRoot from "@/components/BackgroundEffectsRoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://zane-perry.com"),
  title: {
    default: "Zane Perry — Applied Math & ML",
    template: "%s | Zane Perry"
  },
  description:
    "Portfolio and research site for Zane Perry — applied mathematics, machine learning, and software engineering.",
  keywords: [
    "Zane Perry",
    "Applied Mathematics",
    "Machine Learning",
    "Software Engineering",
    "Portfolio",
    "Research"
  ],
  authors: [{ name: "Zane Perry", url: "https://zane-perry.com" }],
  creator: "Zane Perry",
  publisher: "Zane Perry",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "https://zane-perry.com"
  },
  openGraph: {
    type: "website",
    url: "https://zane-perry.com",
    siteName: "Zane Perry",
    title: "Zane Perry — Applied Math & ML",
    description:
      "Portfolio and research site for Zane Perry — applied mathematics, machine learning, and software engineering.",
    locale: "en_US",
    images: [
      {
        url: "/homepage.avif",
        width: 1200,
        height: 630,
        alt: "Zane Perry portfolio banner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Zane Perry — Applied Math & ML",
    description:
      "Portfolio and research site for Zane Perry — applied mathematics, machine learning, and software engineering.",
    images: ["/homepage.avif"]
  },
  verification: {
    google: "fvbnfmBIQn9txuszDP_rwAQT9zsA59Pb_TTfErmZ9U8"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();
  return (
    <html lang="en">
      <head>
        {/* Ensure browsers load the SVG favicon and provide fallbacks for older clients */}
        <link rel="icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
  {/* Person JSON-LD to help search engines associate the site with the person */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Zane Perry",
              url: "https://zane-perry.com",
              sameAs: [
                "https://github.com/zane-perry",
                "https://www.linkedin.com/in/zane-perry"
              ],
              jobTitle: "Applied Mathematics & Machine Learning",
              image: "https://zane-perry.com/headshot.JPG",
              email: "mailto:Zane.L.Perry@gmail.com",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Colorado Boulder",
                sameAs: "https://www.colorado.edu/"
              },
              knowsAbout: [
                "Applied Mathematics",
                "Machine Learning",
                "Numerical Methods",
                "Dynamical Systems",
                "Genetic Circuits",
                "Data Science",
                "Software Engineering"
              ],
              description:
                "Portfolio and research site for Zane Perry — applied mathematics, machine learning, and software engineering."
            })
          }}
        />
        {/* Optional WebSite JSON-LD to reinforce site association */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Zane Perry",
              url: "https://zane-perry.com",
              publisher: {
                "@type": "Person",
                name: "Zane Perry",
                url: "https://zane-perry.com"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <FadeProvider>
          <NavBar />

          {/* Top hero/banner - use homepage image */}
          <div className="hero-banner" role="img" aria-label="Homepage banner">
          <img
            src="/homepage.avif"
            alt="Zane Perry portfolio banner"
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
              {/* Wave background sits above base background and behind content cards */}
              <div className="relative">
                <BackgroundEffectsRoot />
                <div className="relative z-10">
                  {/* PageFade handles entry animations on mount. */}
                  <PageFade>{children}</PageFade>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </FadeProvider>
      </body>
    </html>
  );
}

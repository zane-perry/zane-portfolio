import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import HeroParallax from "@/components/HeroParallax";
import PageFade from "@/components/PageFade";
import FadeProvider from "@/components/FadeProvider";
import Footer from "@/components/Footer";

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
  {/* Google Search Console site verification */}
  <meta name="google-site-verification" content="fvbnfmBIQn9txuszDP_rwAQT9zsA59Pb_TTfErmZ9U8" />

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
                "https://www.linkedin.com/in/zane-perry/"
                // Add more profiles as available, e.g. LinkedIn, X/Twitter
                // "https://www.linkedin.com/in/<your-handle>",
                // "https://twitter.com/<your-handle>"
              ],
              jobTitle: "Applied Mathematics & Machine Learning",
              description:
                "Portfolio and research site for Zane Perry — applied mathematics, machine learning, and software engineering."
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

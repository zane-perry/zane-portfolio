import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Zane Perry",
  description: "Technical stack and design philosophy of Zane Perry's applied mathematics & machine learning portfolio site.",
  alternates: { canonical: "https://zane-perry.com/about" }
};

export default function AboutPage() {
  return (
    <div className="section">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">About Zane Perry&apos;s Site</h1>
        <p className="mt-3 text-sm text-slate-700 max-w-3xl">
          A short summary of the technologies used to build this site and the design
          choices that guided its look and behavior.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card">
          <h2 className="section-title">Tech stack</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Next.js (App Router)</strong> — Server and client rendering, filesystem-based
              routing using the <code>app/</code> directory.
            </li>
            <li>
              <strong>TypeScript</strong> — Strong typing for components and data files.
            </li>
            <li>
              <strong>React</strong> — Component-driven UI (server and client components).
            </li>
            <li>
              <strong>Tailwind CSS</strong> — Utility-first styling. The project includes
              a small set of semantic classes (e.g. <code>card</code>, <code>section-title</code>)
              layered on top of Tailwind utilities in <code>app/globals.css</code>.
            </li>
            <li>
              <strong>Static assets</strong> — Images and PDFs live in <code>public/</code> and
              employ modern formats (AVIF) for better performance.
            </li>
            <li>
              <strong>Custom components</strong> — Reusable pieces live in <code>components/</code>
              (NavBar, Footer, PageFade, FadeProvider, etc.).
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 className="section-title">Design choices</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Minimal, content-first layout</strong> — The site emphasizes readability
              and concise presentation of projects and research.
            </li>
            <li>
              <strong>Performance-focused</strong> — Small images (AVIF), simple markup, and
              minimal client-side JavaScript where possible to reduce load and improve
              first-contentful-paint.
            </li>
            <li>
              <strong>Subtle motion</strong> — Entry/exit fades and a parallax hero are used to
              make navigation feel smooth while avoiding distraction. The <code>FadeProvider</code>
              and <code>PageFade</code> components coordinate these transitions.
            </li>
            <li>
              <strong>Responsive and accessible</strong> — The layout uses semantic HTML,
              responsive utility classes, and accessible attributes (alt text, landmarks).
              Contrast and font sizes are chosen for readability across devices.
            </li>
            <li>
              <strong>Color & typography</strong> — A restrained palette keeps emphasis on
              content and imagery; system fonts and a small set of typographic scales
              are used for consistency.
            </li>
          </ul>
        </section>
      </div>

      {/* only the two primary sections requested are shown: tech stack and design choices */}
      <div className="mt-8">
        <div className="card">
          <h2 className="section-title">Source</h2>
          <p className="mt-3 text-sm text-slate-700">
            The repository for this site is available on GitHub:
            <br />
            <a
              href="https://github.com/zane-perry/zane-portfolio"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-sm text-accent hover:underline"
            >
              https://github.com/zane-perry/zane-portfolio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

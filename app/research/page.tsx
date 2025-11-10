export default function ResearchPage() {
  return (
    <div className="section">
      <h1 className="section-title">Research</h1>
      <p className="section-subtitle">
        High-level overview of my current and past research work. You can expand
        these sections later with posters, papers, plots, and detailed
        descriptions.
      </p>

      <div className="space-y-4">
        <section className="card">
          <h2 className="text-lg font-semibold">
            Hybrid Mechanistic–ML Models for Genetic Circuits
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Ongoing research in the Genetic Logic Lab (CU Electrical Engineering).
            I&apos;m exploring ways to combine ODE-based mechanistic models with
            machine learning correction terms to better predict genetic circuit
            behavior, with an emphasis on interpretability and modular model
            design.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Final written report due at end of the semester — this section is
            intentionally a placeholder for a more complete write-up, figures,
            and links to slides/posters.
          </p>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold">
            Synbiohub - Software development
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Contributed to Synbiohub tooling and integrations: building API
            features, improving user tooling for genetic circuit sharing, and
            maintaining deployment scripts. Placeholder entry — add links or
            details later.
          </p>
          <ul className="mt-2 text-sm text-slate-700 list-disc list-inside">
            <li>API integration and backend improvements</li>
            <li>User interface enhancements for repository browsing</li>
            <li>CI/CD and deployment automation</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold">
            Other Directions &amp; Interests
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Boundary integral equation methods, PDEs for physical systems,
            radiation environment modeling, and deep learning for music and
            structured signal data. Over time, you can add separate subsections
            or project links here for each line of work.
          </p>
        </section>
      </div>
      <div className="mt-8">
        <section className="card">
          <h3 className="font-semibold">Genetic Logic Lab</h3>
          <p className="mt-2 text-sm text-slate-700">
            For more about the lab and group research, visit the Genetic Logic Lab at CU Electrical Engineering.
          </p>
          <div className="mt-3">
            <a
              href="https://geneticlogiclab.org/"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              geneticlogiclab.org
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

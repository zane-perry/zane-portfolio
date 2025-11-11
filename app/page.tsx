export default function HomePage() {
  return (
    <div className="section">
      <div className="mb-10 flex flex-col md:flex-row md:items-start md:gap-8">
        {/* Headshot column (left on md+, hidden above md) */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <div className="headshot-wrapper rounded-full inline-block">
            <img
              src="/headshot.JPG"
              alt="Zane Perry headshot"
              className="headshot-img rounded-full w-36 h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 object-cover shadow-sm"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">
            Applied Mathematics · Machine Learning · Software Engineering
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold">
            Zane Perry
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-slate-700">
            I&apos;m a M.S. Applied Mathematics student at the University of Colorado
            Boulder with a B.S. in Computer Science and Applied Math. I work at the
            intersection of mathematical modeling, machine learning, and software
            engineering — from genetic circuit modeling and scientific computing to
            deep learning for music recommendation.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card">
          <h2 className="section-title text-xl mb-2">Current Focus</h2>
          <p className="text-sm text-slate-700">
            Designing hybrid mechanistic–machine learning models for genetic
            circuits, advancing tools in the Genetic Logic Lab at CU Boulder, and
            building production-quality software systems using React, Spring, and
            modern DevOps practices.
          </p>
        </section>

        <section className="card">
          <h2 className="section-title text-xl mb-2">Highlights</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 list-disc list-inside">
            <li>M.S. Applied Mathematics (4.0 GPA) with 200+ credits across math, CS, and science.</li>
            <li>Research assistant in the CU Electrical Engineering Genetic Logic Lab.</li>
            <li>Experience in radiation modeling, data analysis, and full-stack web apps.</li>
            <li>Deep learning &amp; signal processing projects for music recommendation.</li>
          </ul>
        </section>
      </div>
      {/* About + Philosophy section */}
      <div className="mt-8">
        <section className="mb-4">
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">Interests, background, and my approach to research and engineering.</p>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h3 className="font-semibold text-lg">About me</h3>
            <p className="text-sm text-slate-700 mt-3">When I&apos;m not working on models or code I like to keep my hands busy and my curiosity active. A few things I enjoy:</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc list-inside">
              <li>Guitar and music production — experimenting with signal processing and recommendation systems.</li>
              <li>Hiking and landscape photography around Colorado.</li>
              <li>Cooking and trying recipes from different cuisines.</li>
              <li>Open-source contributions and learning new tools (recently: Rust and PyTorch internals).</li>
              <li>Reading technical books and papers — especially applied math and ML research.</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg">My philosophy</h3>
            <p className="text-sm text-slate-700 mt-3">I approach problems by combining principled mathematical modeling with pragmatic engineering. I believe good models are interpretable, testable, and integrated with data-driven components where appropriate.</p>
            <p className="text-sm text-slate-700 mt-3">I value reproducibility, well-documented code, and clear communication — whether in research papers, code reviews, or collaborative projects. I aim to build tools and models that are useful to domain experts and production-ready when needed.</p>
            <p className="text-sm text-slate-700 mt-3">Collaboration and mentorship are important: I seek diverse perspectives and enjoy helping others learn and grow through code reviews, talks, and open-source contributions.</p>
          </div>
        </div>

      </div>

      {/* Education section */}
      <div className="mt-10">
        <section className="mb-6">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Academic background and transcripts.</p>
        </section>

    <div className="grid gap-6 grid-cols-1">
          <div className="card">
            <h3 className="font-semibold text-lg">M.S. Applied Mathematics</h3>
            <p className="text-sm text-slate-700 mt-2">University of Colorado Boulder — Expected 2026</p>
            <p className="text-sm text-slate-700 mt-3">Focus: Dynamics & Numerical Modeling, Applied Data Science & Stochastic Processes, Machine Learning.</p>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg">B.S. Computer Science</h3>
            <p className="text-sm text-slate-700 mt-2">University of Colorado Boulder — 2025</p>

            <div className="mt-4">
              <p className="text-xs font-medium text-slate-500">Diploma / Transcript</p>
              <a href="/CompSci.pdf" className="mt-2 inline-block text-sm text-accent hover:underline" target="_blank" rel="noreferrer">Download B.S. Computer Science (PDF)</a>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg">B.S. Applied Mathematics</h3>
            <p className="text-sm text-slate-700 mt-2">University of Colorado Boulder — 2025</p>

            <div className="mt-4">
              <p className="text-xs font-medium text-slate-500">Diploma / Transcript</p>
              <a href="/Math.pdf" className="mt-2 inline-block text-sm text-accent hover:underline" target="_blank" rel="noreferrer">Download B.S. Applied Mathematics (PDF)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    </div>
  );
}

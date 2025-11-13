import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zane Perry — Applied Math & ML",
  description:
    "Portfolio homepage for Zane Perry — applied mathematics, machine learning, and software engineering.",
  alternates: { canonical: "https://zane-perry.com/" }
};

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
            Boulder with a B.S. in Computer Science and Applied Mathematics. I work at the
            intersection of mathematical modeling, machine learning, and software
            engineering with a deep interest in how technology can be used to enhance
            existing scientific knowledge and drive innovation.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card">
          <h2 className="section-title text-xl mb-2">Current Focus</h2>
          <p className="text-sm text-slate-700">
            Designing hybrid mechanistic–machine learning models for genetic
            circuits, advancing software tools in the Genetic Logic Lab at CU Boulder, and
            deepening my knowledge of applied math with a focus on dynamical systems and modeling
            with an emphasis on machine learning and data science through my graduate studies.
          </p>
        </section>

        <section className="card">
          <h2 className="section-title text-xl mb-2">Highlights</h2>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>M.S. Applied Mathematics (4.0 GPA) with 200+ credits across math, CS, engineering, and natural science.</li>
            <li>Research assistant in the CU Electrical Engineering Genetic Logic Lab.</li>
            <li>Experience in mathematical modeling, data analysis & data-driven machine learning, and full-stack web apps.</li>
            <li>Passion for unique applications of mathematics and machine learning to bridge interdisciplinary gaps and bring theoretical concepts to life.</li>
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
            <h3 className="font-semibold text-lg">About Me</h3>
            <p className="text-sm text-slate-700 mt-3">When I&apos;m not working on models or code I like to keep my mind busy and my curiosity active. A few things I enjoy:</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Violin & Piano - A lifelong passion for music that inspires my creativity and gives me a stake in the artistic process.</li>
              <li>Music Production - Exploring sound design and audio engineering techniques to understand how the music I love comes to be.</li>
              <li>Theta Tau Professional Engineering Fraternity - Using my leadership skills to promote collaboration and professional development among members, while also learning valuable lessons in project management and responsibility</li>
              <li>Expanding my Knowledge Base - Continuously seeking out new learning opportunities and learning how to apply new concepts in both software and mathematical approaches.</li>
              <li>Networking & Mentorship - I love getting to know people beyond their work by understanding what excites them, what they value, and how they see the world. I enjoy sharing lessons I&apos;ve learned and learning from others in return. For me, connection and conversation are some of the most meaningful ways to keep growing.</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg">My Philosophy</h3>
            <p className="text-sm text-slate-700 mt-3">Technology should enhance our tools, not our distance from one another, and should benefit everyone across all industries.</p>
            <p className="text-sm text-slate-700 mt-3">Technology has always been one of humanity&apos;s most powerful tools, but like any tool, its value depends on the intention and understanding behind it.
I believe that the best technology doesn&apos;t try to replace people; it helps them see, create, and connect more clearly. The best systems don&apos;t operate in isolation. They grow from interdisciplinary collaboration and diverse perspectives, built by people who listen as much as they invent.</p>
            <p className="text-sm text-slate-700 mt-3">Every system I build, whether it&apos;s a mathematical model, a machine learning framework, or a creative interface, starts from that principle. Tools should 
              be designed with care, not just capability; with an understanding of the human context they exist within. Progress isn&apos;t just measured in efficiency or performance, but in how well we preserve empathy, clarity, and meaning along the way.</p>
            <p className="text-sm text-slate-700 mt-3">Innovation and responsibility are not opposites. The most impactful technologies are those that balance both, rigorous in their logic, but guided by respect for the people who use them and the world they affect.
When built thoughtfully and collaboratively, technology doesn&apos;t just solve problems, it helps us understand the world, and one another, more deeply.</p>
          </div>
        </div>

      </div>

      {/* Education section */}
      <div className="mt-10">
        <section className="mb-6">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">Academic background and degrees.</p>
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
              <a href="/CompSci.pdf" className="mt-2 inline-block text-sm text-accent hover:underline" target="_blank" rel="noopener noreferrer">View B.S. Computer Science (PDF)</a>
              <br />
              <a href="/CompSci.pdf" className="mt-2 inline-block text-sm text-accent hover:underline" download>Download B.S. Computer Science (PDF)</a>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-lg">B.S. Applied Mathematics</h3>
            <p className="text-sm text-slate-700 mt-2">University of Colorado Boulder — 2025</p>

            <div className="mt-4">
              <p className="text-xs font-medium text-slate-500">Diploma / Transcript</p>
              <a href="/Math.pdf" className="mt-2 inline-block text-sm text-accent hover:underline" target="_blank" rel="noopener noreferrer">View B.S. Applied Mathematics (PDF)</a>
              <br />
              <a href="/Math.pdf" className="mt-2 inline-block text-sm text-accent hover:underline" download>Download B.S. Applied Mathematics (PDF)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

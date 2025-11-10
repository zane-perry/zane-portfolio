const groups = [
  {
    title: "Core Mathematics",
    items: [
      "Calculus I-III",
      "Differential Equations",
      "Linear Algebra / Matrix Theory",
      "Real Analysis",
      "Complex Analysis",
      "Numerical Methods",
      "Fourier Analysis",
      "Stochastic Processes",
      "Operations Research"
    ]
  },
  {
    title: "Core Computer Science",
    items: [
      "Data Structures",
      "Computer Systems",
      "Algorithms",
      "Operating Systems",
      "Databases",
      "Software Development",
      "Programming Languages",
      "Theory of Computation",
      "Object-Oriented Design"
    ]
  },
  {
    title: "Dynamics and Modeling",
    items: [
      "Differential Equations Computational Lab",
      "Differential Dynamical Systems (Grad)",
      "Chaotic Dynamics",
      "Numerical Differential Equations",
      "Partial Differential Equations (Grad)",
      "Modeling in Mathematical Biology (Grad)"
    ]
  },
  {
    title: "Data Science, ML & AI",
    items: [
      "Applied Probability",
      "Data Science",
      "Mathematical Statistics (Grad)",
      "Artificial Intelligence",
      "Machine Learning (Grad)",
      "Neural Networks & Deep Learning (Grad)",
      "Time Series Analysis (Grad)",
      "Theory of Machine Learning (Audit)"
    ]
  },
  {
    title: "Biology",
    items: [
      "Molecular Biology",
      "Genetics",
      "Medical Ethics",
      "Modeling in Mathematical Biology (Grad)",
      "Engineering Genetic Circuits (Coursera)",
      "Computational Neuroscience (Coursera)"
    ]
  },
  {
    title: "Interdisciplinary",
    items: [
      "Music Technology",
      "Cognitive Science",
      "Music & Space",
      "Quantum Mechanics",
      "Quantum Computing",
      "Digital Signal Processing (Coursera)",
    ]
  }
];

export default function CourseworkPage() {
  return (
    <div className="section">
      <h1 className="section-title">Coursework</h1>
      <p className="section-subtitle">
        I&apos;ve completed an unusually broad and deep curriculum in applied
        mathematics, computer science, and the sciences, with more than 200
        credit hours. This page is a thematic snapshot rather than a literal
        transcript.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="card">
            <h2 className="text-base font-semibold">{group.title}</h2>
            <ul className="mt-3 space-y-1 text-sm text-slate-700 list-disc list-inside">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 card">
        <h3 className="font-semibold">Transcript</h3>
        <p className="mt-2 text-sm text-slate-700">You can download my unofficial transcript (PDF) using the link below.</p>
        <div className="mt-4">
          <a href="/Transcript.pdf" download className="rounded bg-slate-100 px-3 py-1 text-sm hover:underline focus:underline">
            Download Transcript (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}

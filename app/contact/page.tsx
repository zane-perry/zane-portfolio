export default function ContactPage() {
  return (
    <div className="section">
      <h1 className="section-title">Contact</h1>
      <p className="section-subtitle">
        Ways to get in touch or find more about my work. Later you can upgrade
        this section with a form or scheduling links.
      </p>

  <div className="card space-y-3 text-sm text-slate-700">
        <p>
          <span className="font-semibold">Email:</span>{" "}
          <a
            href="mailto:Zane.L.Perry@gmail.com"
            className="text-accent hover:underline"
          >
            Zane.L.Perry@gmail.com
          </a>
        </p>
        <p>
          <span className="font-semibold">LinkedIn:</span>{" "}
          <a
            href="https://www.linkedin.com/in/zane-perry"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            linkedin.com/in/zane-perry
          </a>
        </p>
        <p>
          <span className="font-semibold">GitHub:</span>{" "}
          <a
            href="https://github.com/zane-perry"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            github.com/zane-perry
          </a>
        </p>
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="section">
      <h1 className="section-title">Resume</h1>
      <p className="section-subtitle">
        This page is a placeholder for your embedded PDF resume and/or a
        plain-text version for accessibility. For now, it reminds you where to
        plug that in once you deploy.
      </p>

      <div className="card text-sm text-slate-700">
        <p>
          Your resume PDF is included in <code>/public</code>. You can download
          it or view it inline below. If you have a different file to use,
          replace <code>/public/Resume.pdf</code> with your PDF (case matters on some
          deployments).
        </p>

        <div className="mt-4 flex gap-3">
          <a
            href="/Resume.pdf"
            download
            className="rounded bg-slate-100 px-3 py-1 text-sm"
          >
            Download PDF
          </a>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded border border-slate-200 px-3 py-1 text-sm"
          >
            Open in new tab
          </a>
        </div>

        <div className="mt-6">
          <iframe
            src="/Resume.pdf"
            title="Resume PDF"
            className="w-full h-[700px] border rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

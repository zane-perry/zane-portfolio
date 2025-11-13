import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download or view the resume of Zane Perry — applied mathematics and machine learning.",
  alternates: { canonical: "https://zane-perry.com/resume" }
};

export default function ResumePage() {
  return (
    <div className="section">
      <h1 className="section-title">Resume</h1>

      <div className="card text-sm text-slate-700">

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

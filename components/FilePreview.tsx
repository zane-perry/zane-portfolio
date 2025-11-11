"use client";

import React from "react";

type Props = {
  label: string;
  href: string;
};

export default function FilePreview({ label, href }: Props) {
  const lower = href.toLowerCase();
  const isImage = lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".avif") || lower.endsWith(".webp");
  const isPdf = lower.endsWith(".pdf");
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <div className="border rounded-lg bg-white shadow-sm p-4 md:w-3/4 md:mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-800 truncate" title={label}>{label}</div>
        <div className="flex gap-2">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-slate-100 px-2 py-1 text-xs hover:bg-slate-200"
          >
            Open
          </a>
          {!isExternal && (
            <a
              href={href}
              download
              className="rounded bg-slate-50 border px-2 py-1 text-xs hover:bg-slate-100"
            >
              Download
            </a>
          )}
        </div>
      </div>

      <div className="mt-4">
        {isImage && (
          <img src={href} alt={label} className="max-h-128 w-full object-contain rounded" />
        )}

        {isPdf && (
          <div className="h-[24rem] w-full border rounded overflow-hidden">
              <iframe
                src={href + (href.includes('#') ? '&' : '#') + 'navpanes=0&toolbar=0&zoom=page-width'}
                title={label}
                className="w-full h-full"
              />
          </div>
        )}

        {isExternal && !isImage && !isPdf && (
          <div className="h-24 w-full flex items-center justify-start text-sm text-slate-700">
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-sky-600 underline">
              Open {label} in a new window
            </a>
          </div>
        )}

        {!isExternal && !isImage && !isPdf && (
          <div className="h-24 w-full flex items-center justify-center text-sm text-slate-600">
            Preview unavailable — use Open / Download
          </div>
        )}
      </div>
    </div>
  );
}

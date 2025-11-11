"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFade } from "@/components/FadeProvider";

// Module-level flag to detect first hydration and avoid animating on initial load
let footerHasHydrated = false;

export default function Footer() {
  const pathname = usePathname();

  // Determine if this is the first client hydration of the session
  const isInitialSessionMount = !footerHasHydrated;
  useEffect(() => {
    footerHasHydrated = true;
  }, []);

  // Try to consume fade context; guard if provider not present
  let fadeCtx: { isFadingOut: boolean } | null = null;
  try {
    fadeCtx = useFade();
  } catch (e) {
    fadeCtx = null;
  }

  // On client navigations (not first hydration), apply quicker slide animation
  const navDelay = "100ms";
  const navDuration = "800ms";
  const inlineStyles = isInitialSessionMount || (fadeCtx && fadeCtx.isFadingOut)
    ? undefined
    : { animationDelay: navDelay, animationDuration: navDuration } as React.CSSProperties;

  const animClass = isInitialSessionMount
    ? ""
    : (fadeCtx && fadeCtx.isFadingOut ? "footer-slide-out" : "footer-slide-in");

  return (
    // key by pathname to retrigger entrance on route change
    <footer key={pathname} className={`site-footer ${animClass}`} style={inlineStyles}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 footer-inner">
        <div className="text-sm text-slate-600">Zane Perry</div>
        <div className="flex items-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/zane-perry"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.048.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.241 2.873.118 3.176.77.84 1.234 1.911 1.234 3.221 0 4.61-2.803 5.624-5.475 5.922.43.372.815 1.102.815 2.222 0 1.606-.014 2.9-.014 3.293 0 .323.216.699.825.58C20.565 21.796 24 17.297 24 12 24 5.37 18.63 0 12 0z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/zane-perry"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.84v2.2h.05c.54-1.02 1.86-2.1 3.82-2.1 4.09 0 4.84 2.7 4.84 6.2V24h-4v-7.3c0-1.74-.03-3.98-2.42-3.98-2.42 0-2.79 1.88-2.79 3.83V24h-4V8z" fill="currentColor"/>
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:Zane.L.Perry@gmail.com"
            className="footer-icon"
            aria-label="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M1.5 4.5h21v15h-21v-15zm2.25 2.25v10.5h16.5v-10.5l-8.25 6.375-8.25-6.375z" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

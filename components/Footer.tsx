"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFade } from "@/components/FadeProvider";

// Module-level flag to detect first hydration and avoid animating on initial load
let footerHasHydrated = false;

export default function Footer() {
  const pathname = usePathname();

  const footerRef = React.useRef<HTMLElement | null>(null);
  const [isFixed, setIsFixed] = React.useState(false);

  // Determine if this is the first client hydration of the session
  const isInitialSessionMount = !footerHasHydrated;
  useEffect(() => {
    footerHasHydrated = true;
  }, []);
 

  // Try to consume fade context; guard if provider not present
  // include navigate in the type so we can call it from event handlers
  let fadeCtx: { isFadingOut: boolean; navigate?: (href: string) => void } | null = null;
  try {
    fadeCtx = useFade();
  } catch (e) {
    fadeCtx = null;
  }

  // If this is a full page load (initial session mount), delay the footer
  // slide-in so it matches the rest of the page entrance timing. Respect
  // user's reduced-motion preference.
  React.useEffect(() => {
    if (!isInitialSessionMount) return;
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = footerRef.current;
    const t = setTimeout(() => {
      if (!el) return;
      // only add the slide-in if not currently fading out
      if (!(fadeCtx && fadeCtx.isFadingOut)) {
        el.classList.remove('footer-slide-out');
        el.classList.remove('initial-footer-hidden');
        el.classList.add('footer-slide-in');
      }
    }, 2000);
    return () => clearTimeout(t);
  }, [isInitialSessionMount, fadeCtx]);
  

  // On client navigations (not first hydration), apply quicker slide animation
  const navDelay = "100ms";
  const navDuration = "800ms";
  const inlineStyles = isInitialSessionMount || (fadeCtx && fadeCtx.isFadingOut)
    ? undefined
    : { animationDelay: navDelay, animationDuration: navDuration } as React.CSSProperties;

  const animClass = isInitialSessionMount
    ? ""
    : (fadeCtx && fadeCtx.isFadingOut ? "footer-slide-out" : "footer-slide-in");
  // hook to auto-fix footer for short pages; pass initial mount flag so the
  // hook won't immediately play the slide-in on a fresh full-page reload.
  useFooterAutoFix(footerRef, pathname ?? null, setIsFixed, isInitialSessionMount);

  // When fading out (navigation) force slide-out class; when not, ensure slide-in present.
  useEffect(() => {
    // Avoid interfering with the initial full-page delayed entrance. The
    // initial mount has a separate delayed effect that will add the
    // 'footer-slide-in' after 2000ms; we don't want to add it immediately.
    if (isInitialSessionMount) return;

    const el = footerRef.current;
    if (!el) return;
    if (fadeCtx?.isFadingOut) {
      el.classList.remove('footer-slide-in');
      el.classList.add('footer-slide-out');
    } else {
      // only add slide-in if not already sliding out; avoids flicker
      if (!el.classList.contains('footer-slide-in')) {
        el.classList.remove('footer-slide-out');
        el.classList.add('footer-slide-in');
      }
    }
  }, [fadeCtx?.isFadingOut, isInitialSessionMount]);

  return (
    // key by pathname to retrigger entrance on route change
    <footer
      ref={footerRef}
      key={pathname}
      className={`site-footer ${isFixed ? 'fixed-footer' : ''} ${animClass} ${isInitialSessionMount ? 'initial-footer-hidden' : ''}`}
      style={inlineStyles}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 footer-inner">
        <div className="text-sm text-slate-600">
          <Link
            href="/about"
            onClick={(e) => {
              // if fade provider is available, use it for smooth nav (scroll up, fade out)
              if (fadeCtx && typeof fadeCtx.navigate === 'function') {
                e.preventDefault();
                fadeCtx.navigate('/about');
              }
              // otherwise, let Next handle the navigation normally
            }}
            className="hover:underline"
          >
            About this Page
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/zane-perry/zane-portfolio"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
            aria-label="GitHub Repository"
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

// Detect short pages and toggle fixed footer accordingly. We keep the logic
// outside the component render path to avoid surprising behavior during SSR.
// This hook runs on the client and updates the footer position when the
// window resizes or when the route changes.
function useFooterAutoFix(
  footerRef: React.RefObject<HTMLElement | null>,
  pathname: string | null,
  onFixedChange?: (isFixed: boolean) => void,
  initialMount?: boolean
) {
  React.useEffect(() => {
    if (!footerRef.current) return;

    const footerEl = footerRef.current;
    const contentEl = document.querySelector('.content-area') as HTMLElement | null;
    let lastFixed = footerEl.classList.contains('fixed-footer');

    function update() {
      // measure total document height vs viewport height
      const docH = document.documentElement.scrollHeight;
      const viewH = window.innerHeight;
      // small tolerance to account for sticky UI
      const shouldFix = docH <= viewH + 4;

      if (shouldFix) {
        // if transitioning from non-fixed to fixed, ensure we animate the entrance
        const wasFixed = footerEl.classList.contains('fixed-footer');
        footerEl.classList.add('fixed-footer');
        if (!wasFixed) {
          // trigger slide-in animation for fixed footer on short pages unless
          // this is the initial full page load (we will add the delayed
          // entrance from the parent component in that case)
          if (!initialMount) {
            footerEl.classList.remove('footer-slide-out');
            footerEl.classList.add('footer-slide-in');
          }
        }
        lastFixed = true;
        onFixedChange && onFixedChange(true);
        // ensure content area has bottom padding so content isn't hidden
        if (contentEl) {
          const h = footerEl.getBoundingClientRect().height;
          contentEl.style.paddingBottom = `${h + 12}px`;
        }
      } else {
        footerEl.classList.remove('fixed-footer');
        if (contentEl) {
          contentEl.style.paddingBottom = '';
        }
        lastFixed = false;
        onFixedChange && onFixedChange(false);
      }
    }

    // run initially
    update();

    // re-run on resize and when pathname changes
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      // cleanup padding
      if (contentEl) contentEl.style.paddingBottom = '';
    };
  }, [footerRef, pathname]);
}

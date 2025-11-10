"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/coursework", label: "Coursework" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 backdrop-blur site-nav">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="brand text-sm font-mono tracking-tight">
            zane.perry
          </span>
        </Link>
        <button
          className="flex items-center gap-2 text-sm text-white sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <nav className="hidden gap-6 text-sm text-white sm:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "transition-colors " +
                  (active
                    ? "underline underline-offset-4"
                    : "hover:text-accent-light hover:underline underline-offset-4")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      {open && (
        <nav className="border-t border-slate-200 px-4 py-3 text-sm text-white sm:hidden" style={{ backgroundColor: 'var(--accent)' }}>
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    "transition-colors " +
                    (active
                      ? "text-accent"
                      : "hover:text-white hover:underline underline-offset-4")
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

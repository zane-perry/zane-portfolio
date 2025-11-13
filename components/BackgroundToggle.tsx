"use client";
import React from "react";
import { createPortal } from "react-dom";
import { useBackgroundEffects } from "./BackgroundEffectsProvider";

export default function BackgroundToggle() {
  const { enabled, toggle } = useBackgroundEffects();
  const [bottomOffset, setBottomOffset] = React.useState<number>(24); // px; Tailwind bottom-6 ≈ 24px
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const footer = document.querySelector('.site-footer') as HTMLElement | null;
    if (!footer) return;

    const base = 24; // default spacing from viewport bottom (px)
    const update = () => {
      const isFixed = footer.classList.contains('fixed-footer');
      if (isFixed) {
        const h = footer.getBoundingClientRect().height || 0;
        setBottomOffset(Math.round(h + 16)); // keep ~16px gap above footer
      } else {
        setBottomOffset(base);
      }
    };

    // Observe class changes on the footer so we react when it becomes fixed/unfixed
    const mo = new MutationObserver(update);
    mo.observe(footer, { attributes: true, attributeFilter: ['class'] });

    // Also update on resize as footer height may change
    window.addEventListener('resize', update);
    // initial run
    update();
    return () => {
      mo.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const node = (
    <div
      className="effects-toggle fixed right-6 pointer-events-auto"
      style={{ bottom: bottomOffset, zIndex: 1000000 }}
    >
      <button
        aria-pressed={!enabled}
        onClick={toggle}
        className="flex items-center gap-3 bg-white/6 backdrop-blur-sm rounded-full px-3 py-2 shadow-md hover:bg-white/8 transition-colors"
        title={enabled ? 'Disable background effects' : 'Enable background effects'}
      >
        <span className="sr-only">Toggle background effects</span>
        <div className={`w-12 h-6 flex items-center p-1 rounded-full transition-colors ${enabled ? 'bg-teal-500' : 'bg-gray-400'}`}>
          <div
            className={`bg-white rounded-full w-4 h-4 transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </div>
        <span className="text-xs text-black">Effects</span>
      </button>
    </div>
  );

  // Avoid SSR/early render mismatch; only portal on client when body exists
  if (!mounted || typeof document === 'undefined') return null;
  return createPortal(node, document.body);
}

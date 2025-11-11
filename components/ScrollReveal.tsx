"use client";

import React, { useEffect } from "react";

/**
 * ScrollReveal scans descendants of a container and applies a fade-in when
 * they enter the viewport significantly (e.g. 40% visible). It preserves the
 * original long-delay fade for elements initially in view (those will rely on
 * existing .fade-in animation provided by PageFade) and only manages elements
 * that start outside the viewport.
 */
export default function ScrollReveal({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
	useEffect(() => {
		const root = containerRef.current;
		if (!root) return;
		if (typeof window === 'undefined') return;

		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return; // respect reduced motion

		// Collect all revealable elements (exclude ones already marked fade-in)
		// We go deep to text nodes by targeting elements – text will fade with parent.
		const candidates: HTMLElement[] = [];
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
		while (walker.nextNode()) {
			const el = walker.currentNode as HTMLElement;
			// Skip elements that already have explicit fade classes from initial load
			if (el.classList.contains('fade-in') || el.classList.contains('fade-out')) continue;
			// Skip script/style/meta etc.
			const tag = el.tagName.toLowerCase();
			if (["script","style","link","meta"].includes(tag)) continue;
			candidates.push(el);
		}

		// Determine viewport height for initial in-view filtering
		const vh = window.innerHeight || document.documentElement.clientHeight;

		// Collect elements that start outside the initial viewport
		const outside: HTMLElement[] = [];
		for (const el of candidates) {
			const rect = el.getBoundingClientRect();
			if (rect.top > vh * 0.9) {
				outside.push(el);
			}
		}

		if (!outside.length) return;

		// Choose deepest elements only to avoid parents revealing children too early
		const depth = (el: HTMLElement) => {
			let d = 0; let p = el.parentElement;
			while (p && p !== root) { d++; p = p.parentElement; }
			return d;
		};
		outside.sort((a,b) => depth(b) - depth(a)); // deepest first
		const toObserve: HTMLElement[] = [];
		for (const el of outside) {
			// If this element contains any already-selected element, skip it (it's a parent)
			if (toObserve.some(child => el.contains(child))) continue;
			toObserve.push(el);
		}

		// Hide only the deepest targets, leave parents visible
		for (const el of toObserve) {
			el.style.opacity = '0';
			el.style.transform = 'translateY(6px)';
			el.style.willChange = 'opacity, transform';
		}

		const revealDelayMs = 200; // base delay before triggering reveal when entering
		const visibilityThreshold = 0.95; // start earlier: 20% visible before animating

			// Assign DOM-order indices for stagger
			toObserve.forEach((el, i) => {
				(el as any).dataset.srIndex = String(i);
			});

			const observer = new IntersectionObserver((entries) => {
				// Process entries top-to-bottom for nicer stagger
				entries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				// Use intersection ratio to ensure significant visibility
				if (entry.intersectionRatio < visibilityThreshold) continue;
				observer.unobserve(el);
					// Stagger using element's assigned index
					const idx = Number((el as any).dataset?.srIndex ?? 0);
					const perItemStagger = 80; // ms per item
					const delay = revealDelayMs + (idx % 8) * perItemStagger;
					setTimeout(() => {
						el.style.transition = 'opacity 880ms cubic-bezier(.2,.9,.2,1), transform 880ms cubic-bezier(.2,.9,.2,1)';
						el.style.opacity = '1';
						el.style.transform = 'translateY(0)';
					}, delay);
			}
		}, {
				threshold: visibilityThreshold,
				// Expand bottom margin so elements start intersecting a bit earlier
				rootMargin: '0px 0px 15% 0px'
		});

		toObserve.forEach(el => observer.observe(el));

		return () => observer.disconnect();
	}, [containerRef]);

	return null; // no visible UI
}

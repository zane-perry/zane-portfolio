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

		// Treat cards (and explicit reveal units) as atomic reveal targets
		const isRevealUnit = (el: HTMLElement) => el.classList.contains('card') || el.hasAttribute('data-sr');
		const findRevealUnit = (el: HTMLElement) => {
			let p: HTMLElement | null = el;
			while (p && p !== root) {
				if (isRevealUnit(p)) return p;
				p = p.parentElement;
			}
			return el;
		};

		const depthMap = new Map<HTMLElement, number>();
		const getDepth = (el: HTMLElement) => {
			let cached = depthMap.get(el);
			if (cached != null) return cached;
			let d = 0; let p = el.parentElement;
			while (p && p !== root) { d++; p = p.parentElement as HTMLElement | null; }
			depthMap.set(el, d);
			return d;
		};

		// Map to reveal units and deduplicate
		const unitTargets = Array.from(new Set(outside.map(findRevealUnit)));

		// Prefer deepest units; avoid selecting ancestors of already-selected units
		unitTargets.sort((a,b) => getDepth(b) - getDepth(a));
		const toObserve: HTMLElement[] = [];
		for (const el of unitTargets) {
			if (toObserve.some(child => el.contains(child))) continue;
			toObserve.push(el);
		}

		// For card units, also prepare leaf children for staggered reveal
		const cardLeaves = new Map<HTMLElement, HTMLElement[]>();
		for (const unit of toObserve) {
			if (unit.classList.contains('card')) {
				const leaves: HTMLElement[] = [];
				const walkerLeaf = document.createTreeWalker(unit, NodeFilter.SHOW_ELEMENT);
				while (walkerLeaf.nextNode()) {
					const node = walkerLeaf.currentNode as HTMLElement;
					if (node === unit) continue;
					// Skip non-visual elements and respect existing explicit fades
					const tag = node.tagName.toLowerCase();
					if (["script","style","link","meta"].includes(tag)) continue;
					if (node.classList.contains('fade-in') || node.classList.contains('fade-out')) continue;
					// Treat elements with no child element nodes as leaves
					if (node.childElementCount === 0) {
						leaves.push(node);
					}
				}
				// Sort leaves by visual order for consistent stagger
				leaves.sort((a, b) => {
					const ra = a.getBoundingClientRect();
					const rb = b.getBoundingClientRect();
					if (ra.top !== rb.top) return ra.top - rb.top;
					return ra.left - rb.left;
				});
				cardLeaves.set(unit, leaves);
			}
		}

		// Hide only the deepest targets and, for cards, their leaf children
		for (const el of toObserve) {
			el.style.opacity = '0';
			el.style.transform = 'translateY(6px)';
			el.style.willChange = 'opacity, transform';
			const leaves = cardLeaves.get(el);
			if (leaves && leaves.length) {
				for (const leaf of leaves) {
					leaf.style.opacity = '0';
					leaf.style.transform = 'translateY(6px)';
					leaf.style.willChange = 'opacity, transform';
				}
			}
		}

		const revealDelayMs = 200; // base delay before triggering reveal when entering
		const visibilityThreshold = 0.10; // require 10% of the element to be visible

		// Assign indices based on visual order: top-to-bottom, then left-to-right
		const orderSorted = [...toObserve].sort((a, b) => {
			const ra = a.getBoundingClientRect();
			const rb = b.getBoundingClientRect();
			if (ra.top !== rb.top) return ra.top - rb.top;
			return ra.left - rb.left;
		});
		orderSorted.forEach((el, i) => {
			(el as any).dataset.srIndex = String(i);
		});

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
					// Stagger using strict visual order (top->bottom, left->right)
					const idx = Number((el as any).dataset?.srIndex ?? 0);
					const perItemStagger = 70; // ms per item
					const delay = revealDelayMs + idx * perItemStagger;
					setTimeout(() => {
						el.style.transition = 'opacity 960ms cubic-bezier(.2,.9,.2,1), transform 960ms cubic-bezier(.2,.9,.2,1)';
						el.style.opacity = '1';
						el.style.transform = 'translateY(0)';
						// If this is a card, reveal its leaves in-stagger, starting at the same time
						const leaves = cardLeaves.get(el);
						if (leaves && leaves.length) {
							const childStagger = 70; // ms per leaf
							leaves.forEach((leaf, i) => {
								setTimeout(() => {
									leaf.style.transition = 'opacity 960ms cubic-bezier(.2,.9,.2,1), transform 960ms cubic-bezier(.2,.9,.2,1)';
									leaf.style.opacity = '1';
									leaf.style.transform = 'translateY(0)';
								}, i * childStagger);
							});
						}
					}, delay);
			}
		}, {
				threshold: visibilityThreshold,
				// Use a slight negative bottom margin so the element must be inside the viewport
				// to trigger (prevents early reveals before the element is actually visible).
				rootMargin: '0px 0px -5% 0px'
		});

		toObserve.forEach(el => observer.observe(el));

		return () => observer.disconnect();
	}, [containerRef]);

	return null; // no visible UI
}

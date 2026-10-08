"use client";

import { useId, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PillNavProps } from "@/types/pill-nav";
import PillNavItem from "@/components/pill-nav/PillNavItem";
import { usePillAnimations } from "@/components/pill-nav/usePillAnimations";
import { useMobileMenu } from "@/components/pill-nav/useMobileMenu";
import "./PillNav.css";

// Adapted from React Bits PillNav (JavaScript + CSS) for Next.js.
export default function PillNav({
  logo, logoAlt = "Logo", brandName = "Home", items, activeHref, className = "",
  ease = "power3.out", baseColor = "#fff", pillColor = "#120F17",
  hoveredPillTextColor = "#120F17", pillTextColor, onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) {
  const menuId = useId();
  const { rootRef, animatePill, animateLogo } = usePillAnimations(ease, initialLoadAnimation, items);
  const { open, setOpen, buttonRef, menuRef } = useMobileMenu(rootRef, ease);
  const colors = {
    "--base": baseColor, "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor, "--pill-text": pillTextColor ?? baseColor,
  } as CSSProperties;

  return (
    <div ref={rootRef} className={`pill-nav-container ${className}`} style={colors}>
      <nav className="pill-nav" aria-label="Primary navigation">
        <Link href="/" className={`pill-logo${logo ? "" : " pill-brand"}`}
          aria-label={`${brandName} — home`} onMouseEnter={animateLogo}
          onClick={() => setOpen(false)}>
          {logo ? <Image src={logo} alt={logoAlt} width={28} height={28} unoptimized /> : brandName}
        </Link>
        <div className="pill-nav-items">
          <ul className="pill-list">
            {items.map((item, index) => (
              <PillNavItem key={item.href} item={item} active={activeHref === item.href}
                onEnter={() => animatePill(index, true)} onLeave={() => animatePill(index, false)} />
            ))}
          </ul>
        </div>
        <button ref={buttonRef} type="button" className="mobile-menu-button"
          aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={menuId}
          onClick={() => { setOpen(value => !value); onMobileMenuClick?.(); }}>
          <span className="hamburger-line" /><span className="hamburger-line" />
        </button>
        <div id={menuId} ref={menuRef} className="mobile-menu-popover" inert={!open}>
          <ul className="mobile-menu-list">
            {items.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="mobile-menu-link" aria-label={item.ariaLabel}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

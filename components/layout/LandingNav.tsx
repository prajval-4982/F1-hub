"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`landing-nav${scrolled ? " landing-nav--scrolled" : ""}`}>
      <Link href="/" className="nav-logo">
        <div className="nav-flag">🏎️</div>
        F1 HUB
      </Link>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#tracks">Tracks</a>
        <Link href="/recap" style={{ color: 'var(--lp-teal)', fontWeight: 600 }}>Recap</Link>
        <a href="#standings">Standings</a>
        <a href="#data">Data</a>
      </div>
      <Link href="/track" className="nav-cta">OPEN HUB →</Link>
    </nav>
  );
}

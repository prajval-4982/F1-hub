'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';

const NAV_ITEMS = [
    { href: '/track', label: 'Track Analyzer' },
    { href: '/season', label: '2026 Season' },
    { href: '/recap', label: 'Season Recap' },
    { href: '/compare', label: 'Car Comparison' },
];

export default function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        <header className="site-header" id="site-header">
            <div className="header-inner">
                <Link href="/" className="logo">
                    <div className="logo-icon">🏎️</div>
                    <div className="logo-text">
                        <h1 className="logo-title">F1 Performance Hub</h1>
                        <p className="logo-sub">Track Analyzer · Live 2026 Season · Jolpica API</p>
                    </div>
                </Link>
                <div className="header-right">
                    {mounted && (
                        <button
                            aria-label="Toggle theme"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            style={{ background: 'none', border: 'none', color: 'var(--text-1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}
                    <button
                        className="nav-toggle"
                        id="nav-toggle"
                        aria-label="Toggle navigation"
                        onClick={() => setMenuOpen(o => !o)}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
            <nav
                className={`main-nav${menuOpen ? ' open' : ''}`}
                role="navigation"
                aria-label="Main navigation"
            >
                {NAV_ITEMS.map(item => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-btn${pathname === item.href ? ' active' : ''}`}
                        aria-selected={pathname === item.href}
                        onClick={() => setMenuOpen(false)}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}

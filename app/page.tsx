"use client";

import "./landing.css";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";
import LandingNav from "@/components/layout/LandingNav";

export default function Home() {
  const statNumsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll reveal
    const revealEls = document.querySelectorAll(".lp-reveal, .lp-reveal-left");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("lp-visible");
        }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));

    // Counter animation
    function animateCount(el: Element, target: number, suffix: string) {
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 40);
    }
    const timer = setTimeout(() => {
      const nums = document.querySelectorAll(".lp-stat-num");
      if (nums[0]) animateCount(nums[0], 10, " tracks");
      if (nums[1]) animateCount(nums[1], 24, "");
    }, 900);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="lp-root" ref={statNumsRef}>
      <LandingNav />

      {/* ── HERO ── */}
      <div className="lp-hero">
        <div className="lp-hero-track-bg">
          <svg viewBox="0 0 900 520" fill="none">
            <path
              className="lp-track-path"
              d="M 100 410 C 100 410 120 440 200 450 C 300 462 500 455 620 430 C 740 405 810 350 820 260 C 830 160 760 80 650 60 C 530 38 380 50 270 80 C 150 112 90 180 80 270 C 70 360 100 410 100 410 Z"
              stroke="white"
              strokeWidth="28"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="lp-car-dot" />

        <div className="lp-eyebrow">2026 Season · Live</div>

        <h1 className="lp-h1">
          F1 Performance
          <span className="lp-h1-line2">Hub</span>
        </h1>

        <p className="lp-hero-sub">
          Live championship standings, interactive track maps with{" "}
          <strong>sector-by-sector speed analysis</strong>, race results, and
          team comparisons — all powered by real telemetry data.
        </p>

        <div className="lp-hero-ctas">
          <Link href="/track" className="lp-btn-primary">
            ENTER THE HUB
          </Link>
          <a href="#features" className="lp-btn-ghost">
            Explore Features
          </a>
        </div>

        <div className="lp-hero-stats">
          <div className="lp-stat">
            <div className="lp-stat-num">10 tracks</div>
            <div className="lp-stat-label">Circuits mapped</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-num">24</div>
            <div className="lp-stat-label">Race calendar</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-num">
              2<span>/24</span>
            </div>
            <div className="lp-stat-label">Races complete</div>
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="lp-ticker-wrap">
        <div className="lp-ticker-inner">
          {[
            "RUSSELL LEADS CHAMPIONSHIP · 51 PTS",
            "ANTONELLI WINS CHINA GP · YOUNGEST EVER POLESITTER",
            "MERCEDES DOMINANT · 4 FROM 4 WINS",
            "MCLAREN CRISIS · 4 DNS IN 2 RACES",
            "HAMILTON FIRST FERRARI PODIUM · CHINA P3",
            "AUDI FIRST EVER F1 POINTS · BORTOLETO P9 AUSTRALIA",
            "NEXT: JAPANESE GP · SUZUKA · MAR 29",
          ]
            .concat([
              "RUSSELL LEADS CHAMPIONSHIP · 51 PTS",
              "ANTONELLI WINS CHINA GP · YOUNGEST EVER POLESITTER",
              "MERCEDES DOMINANT · 4 FROM 4 WINS",
              "MCLAREN CRISIS · 4 DNS IN 2 RACES",
              "HAMILTON FIRST FERRARI PODIUM · CHINA P3",
              "AUDI FIRST EVER F1 POINTS · BORTOLETO P9 AUSTRALIA",
              "NEXT: JAPANESE GP · SUZUKA · MAR 29",
            ])
            .map((item, i) => (
              <span key={i} className="lp-ticker-item">
                {item} <span className="lp-ticker-sep">◆</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="lp-section">
        <div className="lp-section-label">What&apos;s inside</div>
        <h2 className="lp-h2">
          Everything F1,
          <br />
          in one place
        </h2>
        <p className="lp-section-sub">
          Built for fans who want more than a results table. Real data, real
          telemetry, real insights — updated live after every race.
        </p>

        <div className="lp-features-grid lp-reveal">
          <Link href="/track" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeatureCard
              num="01"
              icon="🗺"
              title="Interactive Track Maps"
              desc="Hover any segment to see which team is fastest there and by how much. Colour-coded by team dominance across every corner and straight."
              tag="FastF1 Telemetry"
              accent="var(--lp-teal)"
            />
          </Link>
          <Link href="/season" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeatureCard
              num="02"
              icon="🏆"
              title="Live Championship"
              desc="Driver and Constructor standings pulled directly from the Jolpica F1 API after every race. Zero manual updates required."
              tag="Auto-updates"
              accent="var(--lp-red)"
            />
          </Link>
          <Link href="/season" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeatureCard
              num="03"
              icon="📊"
              title="Race Results"
              desc="Full classification with positions, fastest laps, DNS/DNF flags, gap times, and team colour coding — every completed race."
              tag="All 2026 races"
              accent="var(--lp-orange)"
            />
          </Link>
          <Link href="/season" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeatureCard
              num="04"
              icon="📅"
              title="Full Race Calendar"
              desc="24-round 2026 season schedule showing completed, next, and upcoming races. Sprint weekends flagged automatically."
              tag="24 rounds"
              accent="var(--lp-blue)"
            />
          </Link>
          <Link href="/compare" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeatureCard
              num="05"
              icon="🔬"
              title="Car Comparison"
              desc="Radar chart comparing PU power, aero, chassis, downforce, tyre management, and reliability across the top four teams."
              tag="6 attributes"
              accent="var(--lp-purple)"
            />
          </Link>
          <Link href="/track" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeatureCard
              num="06"
              icon="⚡"
              title="Speed Profile Charts"
              desc="Bar chart showing all teams' speeds across every circuit segment — straights peak at 340+ km/h, chicanes plunge to 70 km/h."
              tag="Per-segment"
              accent="var(--lp-green)"
            />
          </Link>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── TRACKS ── */}
      <section id="tracks" className="lp-section">
        <div className="lp-section-label lp-reveal">Race Circuits</div>
        <h2 className="lp-h2 lp-reveal">
          10 Tracks.
          <br />
          Mapped in detail.
        </h2>
        <p className="lp-section-sub lp-reveal">
          Each circuit is hand-digitised from official GeoJSON data and enriched
          with sector-level telemetry from FastF1.
        </p>

        <div className="lp-tracks-row lp-reveal">
          <Link href="/track?id=australia" style={{ textDecoration: 'none' }}>
            <TrackCard
              flag="🇦🇺"
              round="ROUND 01 · MAR 8"
              name="Australian GP"
              circuit="Albert Park, Melbourne"
              status="done"
              winner="George Russell"
              winnerColor="#27F4D2"
              team="Mercedes"
              svgPath="M 140 10 L 140 18 L 138 28 C 136 38 128 44 118 45 C 100 46 80 44 62 40 C 44 36 30 26 26 18 C 22 10 28 4 40 3 C 58 1 100 2 118 4 C 130 5 138 7 140 10 Z"
              strokeColor="#27F4D2"
            />
          </Link>
          <Link href="/track?id=china" style={{ textDecoration: 'none' }}>
            <TrackCard
              flag="🇨🇳"
              round="ROUND 02 · MAR 15"
              name="Chinese GP"
              circuit="Shanghai International Circuit"
              status="done"
              winner="Kimi Antonelli"
              winnerColor="#27F4D2"
              team="Mercedes"
              svgPath="M 20 40 L 65 40 L 90 36 C 110 32 125 20 125 12 C 125 4 112 1 96 2 C 76 3 56 8 40 14 C 24 20 12 30 12 38 L 20 40"
              strokeColor="#27F4D2"
            />
          </Link>
          <Link href="/track?id=suzuka" style={{ textDecoration: 'none' }}>
            <TrackCard
              flag="🇯🇵"
              round="ROUND 03 · MAR 29"
              name="Japanese GP"
              circuit="Suzuka International Racing Course"
              status="next"
              winner=""
              winnerColor="#3a3a5c"
              team="Race upcoming"
              svgPath="M 22 22 L 65 22 L 80 18 C 95 14 102 8 100 4 C 98 0 88 -1 76 2 C 60 6 50 14 44 22 C 38 30 42 38 50 42 C 60 46 76 46 92 42 C 108 38 118 30 118 22 C 118 16 112 12 104 14 C 96 16 90 24 92 32 C 94 40 106 44 118 44 L 158 44 L 162 30"
              strokeColor="#3671C6"
            />
          </Link>
          <Link href="/track?id=monaco" style={{ textDecoration: 'none' }}>
            <TrackCard
              flag="🇲🇨"
              round="ROUND 08 · MAY"
              name="Monaco GP"
              circuit="Circuit de Monaco"
              status="upcoming"
              statusLabel="R08"
              winner=""
              winnerColor="#3a3a5c"
              team="Street circuit"
              svgPath="M 20 20 L 40 10 L 80 15 L 100 40 L 80 45 L 40 40 L 20 20 Z"
              strokeColor="#efefef"
            />
          </Link>
          <Link href="/track?id=silverstone" style={{ textDecoration: 'none' }}>
            <TrackCard
              flag="🇬🇧"
              round="ROUND 12 · JUL"
              name="British GP"
              circuit="Silverstone Circuit"
              status="upcoming"
              statusLabel="R12"
              winner=""
              winnerColor="#3a3a5c"
              team="High speed"
              svgPath="M 10 30 L 50 10 L 100 15 L 140 30 L 100 45 L 50 40 L 10 30 Z"
              strokeColor="#004225"
            />
          </Link>
          <Link href="/track?id=spa" style={{ textDecoration: 'none' }}>
            <TrackCard
              flag="🇧🇪"
              round="ROUND 14 · JUL"
              name="Belgian GP"
              circuit="Circuit de Spa-Francorchamps"
              status="upcoming"
              statusLabel="R14"
              winner=""
              winnerColor="#3a3a5c"
              team="Legendary"
              svgPath="M 10 10 L 60 15 L 110 10 L 160 30 L 100 45 L 40 40 L 10 10 Z"
              strokeColor="#00D2BE"
            />
          </Link>
          <Link href="/track?id=monza" style={{ textDecoration: 'none' }}>
            <TrackCard
              flag="🇮🇹"
              round="ROUND 16 · SEP"
              name="Italian GP"
              circuit="Autodromo Nazionale di Monza"
              status="upcoming"
              statusLabel="R16"
              winner=""
              winnerColor="#3a3a5c"
              team="Telemetry reference"
              svgPath="M 18 22 L 80 22 L 90 22 C 102 22 108 18 110 12 C 112 6 106 2 96 4 C 82 6 72 14 72 22 C 72 30 80 36 90 38 C 100 40 108 36 114 30 C 122 22 118 12 108 8 L 140 8 L 155 22 L 155 36 C 150 44 136 46 120 44 L 60 44 L 40 44 C 26 42 18 34 18 22 Z"
              strokeColor="#E8002D"
            />
          </Link>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── STANDINGS ── */}
      <section id="standings" className="lp-section">
        <div className="lp-section-label lp-reveal">Live Data</div>
        <div className="lp-standings-layout">
          <div className="lp-standings-left lp-reveal-left">
            <h2 className="lp-h2">
              2026 Championship
              <br />
              After 2 Races
            </h2>
            <p className="lp-section-sub lp-section-sub--sm">
              Automatically updated after each Grand Prix via the Jolpica F1
              API. No manual work needed — ever.
            </p>
            <Link href="/season" className="lp-standings-table" style={{ textDecoration: 'none' }}>
              {[
                { pos: 1, name: "George Russell",   team: "Mercedes", pts: 51,  pct: 100, color: "#27F4D2" },
                { pos: 2, name: "Kimi Antonelli",   team: "Mercedes", pts: 47,  pct: 92,  color: "#27F4D2" },
                { pos: 3, name: "Charles Leclerc",  team: "Ferrari",  pts: 34,  pct: 67,  color: "#E8002D" },
                { pos: 4, name: "Lewis Hamilton",   team: "Ferrari",  pts: 33,  pct: 65,  color: "#E8002D" },
                { pos: 5, name: "Oliver Bearman",   team: "Haas",     pts: 16,  pct: 31,  color: "#B6BABD" },
                { pos: 6, name: "Lando Norris",     team: "McLaren",  pts: 11,  pct: 22,  color: "#FF8000" },
              ].map((d) => (
                <div key={d.pos} className="lp-standings-row">
                  <span className="lp-srow-pos">{d.pos}</span>
                  <div className="lp-srow-dot" style={{ background: d.color }} />
                  <span className="lp-srow-name">{d.name}</span>
                  <span className="lp-srow-team">{d.team}</span>
                  <div className="lp-pts-bar-bg">
                    <div className="lp-pts-bar-fill" style={{ width: `${d.pct}%`, background: d.color }} />
                  </div>
                  <span className="lp-srow-pts" style={{ color: d.color }}>{d.pts}</span>
                </div>
              ))}
            </Link>
          </div>

          <div className="lp-standings-right lp-reveal">
            <div className="lp-leader-box" style={{ borderColor: "#27F4D244" }}>
              <div className="lp-leader-tag">Championship Leader</div>
              <div className="lp-leader-name">
                George
                <br />
                Russell
              </div>
              <div className="lp-leader-team">Mercedes · 1 Win · British</div>
              <div className="lp-leader-pts">
                51<span>pts</span>
              </div>
            </div>
            <div className="lp-constructor-box">
              <div className="lp-con-label">Constructors Leader</div>
              {[
                { name: "Mercedes", sub: "98 pts · 2 drivers", color: "#27F4D2", pts: 98 },
                { name: "Ferrari",  sub: "67 pts · gap: 31",   color: "#E8002D", pts: 67 },
              ].map((c) => (
                <div key={c.name} className="lp-con-row">
                  <div className="lp-con-bar" style={{ background: c.color }} />
                  <div>
                    <div className="lp-con-name" style={{ color: c.color }}>{c.name}</div>
                    <div className="lp-con-sub">{c.sub}</div>
                  </div>
                  <div className="lp-con-pts" style={{ color: c.color }}>{c.pts}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="lp-divider" />

      {/* ── DATA ── */}
      <section id="data" className="lp-section">
        <div className="lp-section-label lp-reveal">Under the hood</div>
        <h2 className="lp-h2 lp-reveal">
          Real data.
          <br />
          Zero backend.
        </h2>
        <p className="lp-section-sub lp-reveal">
          Open index.html in any browser. The app fetches live F1 data directly
          from public APIs — no server, no build step, no npm install.
        </p>

        <div className="lp-data-grid lp-reveal">
          <div className="lp-data-card">
            <div className="lp-data-label">LIVE API</div>
            <div className="lp-data-title" style={{ color: "var(--lp-teal)" }}>Jolpica F1 API</div>
            <p className="lp-data-desc">
              Open-source successor to the Ergast API. Provides driver standings,
              constructor standings, race results, sprint results, and the full
              24-round schedule — updated within 30 minutes of each race finishing.
            </p>
            <pre className="lp-code-snippet"><span className="k">fetch</span>(<span className="s">&apos;https://api.jolpi.ca/ergast/f1/2026/driverstandings/&apos;</span>){"\n"}<span className="c">{"// → live championship table, zero auth required"}</span></pre>
          </div>
          <div className="lp-data-card">
            <div className="lp-data-label">TELEMETRY</div>
            <div className="lp-data-title" style={{ color: "var(--lp-orange)" }}>FastF1 Python</div>
            <p className="lp-data-desc">
              github.com/theOehrly/Fast-F1 — extracts per-segment average speed
              from qualifying telemetry. Run once per circuit to populate the
              speed comparison data that powers the track visualisation.
            </p>
            <pre className="lp-code-snippet"><span className="k">session</span> = fastf1.<span className="k">get_session</span>(<span className="s">2026</span>, <span className="s">&apos;Monza&apos;</span>, <span className="s">&apos;Q&apos;</span>){"\n"}<span className="k">tel</span> = lap.<span className="k">get_telemetry</span>(){"\n"}<span className="c"># → Distance, Speed, Brake, Throttle</span></pre>
          </div>
          <div className="lp-data-card">
            <div className="lp-data-label">CIRCUIT DATA</div>
            <div className="lp-data-title" style={{ color: "var(--lp-purple)" }}>bacinger/f1-circuits</div>
            <p className="lp-data-desc">
              GeoJSON files for every current F1 circuit. GPS coordinates are
              normalised to fit the 790×510 SVG viewBox, then split into named
              segments matching the official corner names.
            </p>
            <pre className="lp-code-snippet"><span className="c"># Convert GPS → SVG coords</span>{"\n"}<span className="k">geojson</span> → <span className="k">normalize</span>(0→790, 0→510) → <span className="k">tracks.js</span></pre>
          </div>
          <div className="lp-data-card">
            <div className="lp-data-label">ARCHITECTURE</div>
            <div className="lp-data-title" style={{ color: "var(--lp-green)" }}>Next.js App Router</div>
            <p className="lp-data-desc">
              Migrated to Next.js for server-side data fetching, file-based
              routing, image optimisation and Vercel edge caching. Built on top
              of the same proven track telemetry data from the v1 vanilla JS app.
            </p>
            <pre className="lp-code-snippet">f1-hub-next/{"\n"}  app/          <span className="c">← routes & pages</span>{"\n"}  components/   <span className="c">← track, season, compare</span>{"\n"}  lib/          <span className="c">← api, types, constants</span></pre>
          </div>
        </div>

        <div className="lp-tech-row lp-reveal">
          {["Next.js 14", "TypeScript", "Framer Motion", "Jolpica F1 API", "FastF1", "GeoJSON", "SVG Animation", "No External UI Libs"].map(
            (t) => <div key={t} className="lp-tech-pill">{t}</div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="lp-cta-section">
        <div className="lp-section-label lp-section-label--center">Ready to explore</div>
        <h2 className="lp-cta-h2">
          Track by track.
          <br />
          Race by race.
        </h2>
        <p className="lp-cta-p">
          Every corner, every segment, every championship point — visualised and
          updated live throughout the 2026 season.
        </p>
        <Link href="/track" className="lp-cta-btn">
          OPEN F1 HUB →
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-logo">
          <div className="lp-footer-flag">🏎️</div>
          F1 PERFORMANCE HUB
        </div>
        <div className="lp-footer-links">
          <a href="#features">Features</a>
          <a href="#tracks">Tracks</a>
          <a href="#standings">Standings</a>
          <a href="https://github.com/theOehrly/Fast-F1" target="_blank" rel="noopener">FastF1 ↗</a>
          <a href="https://jolpi.ca" target="_blank" rel="noopener">Jolpica ↗</a>
        </div>
        <div className="lp-footer-copy">
          Live data from Jolpica F1 API · Telemetry from FastF1 · Circuits from bacinger/f1-circuits · Built with Next.js 14
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */
function FeatureCard({
  num, icon, title, desc, tag, accent,
}: {
  num: string; icon: string; title: string; desc: string; tag: string; accent: string;
}) {
  return (
    <div className="lp-feature-card" style={{ ["--fc-accent" as string]: accent }}>
      <div className="lp-feature-number">{num}</div>
      <span className="lp-feature-icon">{icon}</span>
      <div className="lp-feature-title">{title}</div>
      <p className="lp-feature-desc">{desc}</p>
      <span className="lp-feature-tag" style={{ color: accent, borderColor: `${accent}44` }}>
        {tag}
      </span>
    </div>
  );
}

function TrackCard({
  flag, round, name, circuit, status, statusLabel, winner, winnerColor, team, svgPath, strokeColor,
}: {
  flag: string; round: string; name: string; circuit: string;
  status: "done" | "next" | "upcoming"; statusLabel?: string;
  winner: string; winnerColor: string; team: string;
  svgPath: string; strokeColor: string;
}) {
  const statusClass =
    status === "done" ? "lp-status-done" :
    status === "next" ? "lp-status-next" : "lp-status-upcoming";
  const statusText =
    status === "done" ? "DONE" :
    status === "next" ? "NEXT" : (statusLabel ?? "–");

  return (
    <div className="lp-track-card">
      <span className={`lp-track-status ${statusClass}`}>{statusText}</span>
      <div className="lp-track-flag">{flag}</div>
      <div className="lp-track-round">{round}</div>
      <div className="lp-track-name">{name}</div>
      <div className="lp-track-circuit">{circuit}</div>
      <div className="lp-track-winner">
        <div className="lp-winner-dot" style={{ background: winnerColor }} />
        {winner ? (
          <>
            <span style={{ fontWeight: 500, color: winnerColor }}>{winner}</span>
            <span style={{ color: "var(--lp-txt3)", fontSize: "11px" }}>{team}</span>
          </>
        ) : (
          <span style={{ color: "var(--lp-txt3)", fontSize: "11px" }}>{team}</span>
        )}
      </div>
      <svg className="lp-track-preview" viewBox="0 0 180 50" fill="none">
        <path className="lp-track-preview-path" d={svgPath} stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

'use client';

import { RADAR_TEAMS, ATTR_LABELS, CAR_DIFFS } from '@/data/radar';
import Link from 'next/link';

export default function ComparePage() {
    return (
        <section aria-label="Car Comparison" className="pane-in">
            <div className="sub-bar">
                <span className="pill-btn active">Car Comparison</span>
                <Link href="/compare/drivers" className="pill-btn">Driver H2H</Link>
            </div>
            <div className="grid-2col">
                <div className="col-main">
                    <div className="card">
                        <p className="sec-label">Car attribute radar — estimated from 2026 race data</p>
                        <RadarChart />
                        <div className="radar-legend">
                            {RADAR_TEAMS.map(t => (
                                <div key={t.name} className="rleg-item">
                                    <div className="rleg-line" style={{ background: t.color }} />
                                    {t.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-side">
                    <div className="card">
                        <p className="sec-label">Attribute breakdown</p>
                        <AttrBars />
                    </div>
                </div>
            </div>
            <div className="card" style={{ marginTop: '14px' }}>
                <p className="sec-label">Key differentiators — 2026 cars</p>
                <div className="diff-grid">
                    {CAR_DIFFS.map(c => (
                        <div key={c.name} className="diff-card" style={{ borderLeftColor: c.color }}>
                            <p className="diff-title" style={{ color: c.color }}>{c.name}</p>
                            <p className="diff-note">{c.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RadarChart() {
    const cx = 150, cy = 148, R = 90;
    const N = ATTR_LABELS.length;
    const ang = ATTR_LABELS.map((_, i) => (i * 2 * Math.PI) / N - Math.PI / 2);

    return (
        <svg className="radar-svg" viewBox="0 0 300 280">
            {/* Grid rings */}
            {[0.2, 0.4, 0.6, 0.8, 1].map(r => (
                <polygon
                    key={r}
                    points={ang
                        .map(a => `${cx + R * r * Math.cos(a)},${cy + R * r * Math.sin(a)}`)
                        .join(' ')}
                    fill="none"
                    stroke="#1e1e38"
                    strokeWidth="0.5"
                />
            ))}

            {/* Spokes + labels */}
            {ang.map((a, i) => {
                const tx = cx + (R + 14) * Math.cos(a);
                const ty = cy + (R + 14) * Math.sin(a);
                return (
                    <g key={i}>
                        <line
                            x1={cx} y1={cy}
                            x2={cx + R * Math.cos(a)} y2={cy + R * Math.sin(a)}
                            stroke="#1e1e38" strokeWidth="0.5"
                        />
                        <text
                            x={tx} y={ty + 4}
                            textAnchor="middle" fill="#2a2a4a" fontSize="8.5"
                            fontFamily="Rajdhani, sans-serif"
                        >
                            {ATTR_LABELS[i]}
                        </text>
                    </g>
                );
            })}

            {/* Team polygons */}
            {RADAR_TEAMS.map(team => {
                const pts = ang
                    .map(
                        (a, i) =>
                            `${cx + R * (team.attrs[i] / 100) * Math.cos(a)},${cy + R * (team.attrs[i] / 100) * Math.sin(a)
                            }`
                    )
                    .join(' ');
                return (
                    <polygon
                        key={team.name}
                        points={pts}
                        fill={team.color + '22'}
                        stroke={team.color}
                        strokeWidth="1.5"
                    />
                );
            })}
        </svg>
    );
}

function AttrBars() {
    return (
        <>
            {ATTR_LABELS.map((label, ai) => (
                <div key={label} className="attr-block">
                    <div className="attr-label">{label}</div>
                    {RADAR_TEAMS.map(t => (
                        <div key={t.name} className="attr-row">
                            <span className="attr-name">{t.name}</span>
                            <div className="attr-wrap">
                                <div
                                    className="attr-fill"
                                    style={{ width: `${t.attrs[ai]}%`, background: t.color }}
                                />
                            </div>
                            <span className="attr-val" style={{ color: t.color }}>
                                {t.attrs[ai]}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

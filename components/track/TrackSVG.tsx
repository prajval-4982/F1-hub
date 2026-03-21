'use client';

import { type TrackData, type Segment } from '@/data/tracks';
import { TEAMS_LIST } from '@/lib/constants';
import { useTheme } from 'next-themes';

function toPts(pts: number[][]): string {
    return pts.map(([x, y]) => `${x},${y}`).join(' ');
}

function fastest(seg: Segment): string {
    return Object.entries(seg.speeds).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

function getTeam(id: string) {
    return TEAMS_LIST.find(t => t.id === id)!;
}

interface TrackSVGProps {
    track: TrackData;
    activeSeg: Segment | null;
    onHover: (seg: Segment | null) => void;
    onClick: (seg: Segment) => void;
}

export default function TrackSVG({ track, activeSeg, onHover, onClick }: TrackSVGProps) {
    const { resolvedTheme } = useTheme();
    const isLight = resolvedTheme === 'light';
    const sf = track.segments[0].pts[0];

    // Theme-aware colors
    const roadBase = isLight ? '#d0d0e0' : '#4a4a78';
    const roadSurface = isLight ? '#f8f8fc' : '#1a1a35';
    const labelText = isLight ? '#1a1a3a' : '#7878a0';
    const labelBg = isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(10, 10, 20, 0.5)';
    const labelStroke = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(80, 80, 140, 0.2)';
    const sfText = isLight ? '#4a4a78' : '#9898c8';
    const dashStroke = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.06)';
    const arrowFill = isLight ? '#2a2a5a' : '#5858a0';

    return (
        <svg className="track-svg" viewBox="0 0 790 510" role="img" aria-label="F1 track map">
            <defs>
                {/* Arrow marker */}
                <marker id="tarr" markerWidth="5" markerHeight="5" refX="3" refY="2.5" orient="auto">
                    <path d="M0,0 L5,2.5 L0,5 Z" fill={arrowFill} />
                </marker>
                {/* Glow filter for active segments */}
                <filter id="seg-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* Subtle overall glow for the track */}
                <filter id="track-glow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                    <feFlood floodColor="#4466aa" floodOpacity="0.15" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feComposite in="SourceGraphic" in2="shadow" operator="over" />
                </filter>
            </defs>

            {/* Ambient glow behind track */}
            {track.segments.map(seg => (
                <polyline
                    key={`glow-${seg.id}`}
                    points={toPts(seg.pts)}
                    fill="none"
                    stroke={getTeam(fastest(seg)).color}
                    strokeWidth="40"
                    strokeOpacity="0.04"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ))}

            {/* Base layer — road outline (brighter kerb edge) */}
            {track.segments.map(seg => (
                <g key={`base-${seg.id}`}>
                    <polyline
                        points={toPts(seg.pts)}
                        fill="none"
                        stroke={roadBase}
                        strokeWidth="28"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <polyline
                        points={toPts(seg.pts)}
                        fill="none"
                        stroke={roadSurface}
                        strokeWidth="22"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            ))}

            {/* Color layer — team color per segment */}
            {track.segments.map(seg => {
                const isAct = activeSeg?.id === seg.id;
                const t = getTeam(fastest(seg));
                return (
                    <polyline
                        key={`col-${seg.id}`}
                        points={toPts(seg.pts)}
                        fill="none"
                        stroke={t.color}
                        strokeWidth={isAct ? '14' : '8'}
                        strokeOpacity={isAct ? '1' : '0.6'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter={isAct ? 'url(#seg-glow)' : undefined}
                        style={{ transition: 'stroke-width 0.2s ease, stroke-opacity 0.2s ease' }}
                    />
                );
            })}

            {/* Racing line dashes (subtle direction indicator) */}
            {track.segments.map(seg => (
                <polyline
                    key={`dash-${seg.id}`}
                    points={toPts(seg.pts)}
                    fill="none"
                    stroke={dashStroke}
                    strokeWidth="1"
                    strokeDasharray="8 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd="url(#tarr)"
                />
            ))}

            {/* Hit areas */}
            {track.segments.map(seg => (
                <polyline
                    key={`hit-${seg.id}`}
                    points={toPts(seg.pts)}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="30"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => onHover(seg)}
                    onMouseLeave={() => onHover(null)}
                    onClick={() => onClick(seg)}
                />
            ))}

            {/* Labels */}
            {track.segments.map(seg => {
                const isAct = activeSeg?.id === seg.id;
                const t = getTeam(fastest(seg));
                const lx = seg.lp[0];
                const bx = seg.la === 'start' ? lx - 2 : seg.la === 'end' ? lx - 44 : lx - 22;
                return (
                    <g key={`lbl-${seg.id}`} style={{ pointerEvents: 'none' }}>
                        <rect
                            x={isAct ? bx : seg.lp[0] - 22}
                            y={seg.lp[1] - 12}
                            width={46}
                            height={18}
                            rx="5"
                            fill={isAct ? (isLight ? t.color : t.color + '30') : labelBg}
                            stroke={isAct ? t.color : labelStroke}
                            strokeWidth={isAct ? '1' : '0.5'}
                        />
                        <text
                            x={seg.lp[0]}
                            y={seg.lp[1] + 1}
                            textAnchor={seg.la === 'start' ? 'start' : seg.la === 'end' ? 'end' : 'middle'}
                            fill={isAct ? (isLight ? (t.id === 'mclaren' || t.id === 'mercedes' || t.id === 'williams' || t.id === 'haas' || t.id === 'rb' ? '#000' : '#fff') : t.color) : labelText}
                            fontSize={isAct ? '11' : '9.5'}
                            fontWeight={isAct ? '700' : '500'}
                            fontFamily="Rajdhani, sans-serif"
                        >
                            {seg.label}
                        </text>
                    </g>
                );
            })}

            {/* S/F line with glow */}
            <rect x={sf[0] - 2} y={sf[1] - 16} width={4} height={32} fill={isLight ? '#4a4a78' : 'white'} opacity="0.7" rx="2" />
            <rect x={sf[0] - 2} y={sf[1] - 16} width={4} height={32} fill={isLight ? '#4a4a78' : 'white'} opacity="0.2" rx="2" filter="url(#seg-glow)" />
            <text
                x={sf[0] + 5}
                y={sf[1] - 18}
                fill={sfText}
                fontSize="8"
                fontWeight="600"
                fontFamily="Rajdhani, sans-serif"
                letterSpacing="0.05em"
            >
                S/F
            </text>
        </svg>
    );
}

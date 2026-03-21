'use client';

import { type TrackData } from '@/data/tracks';
import { TEAMS_LIST } from '@/lib/constants';

interface SpeedChartProps {
    track: TrackData;
}

export default function SpeedChart({ track }: SpeedChartProps) {
    const W = 540;
    const mL = 32, mR = 6, mT = 6, mB = 36, pH = 118;
    const pW = W - mL - mR;
    const minV = 60, maxV = 360;
    const sW = pW / track.segments.length;
    const tW = (sW / TEAMS_LIST.length) * 0.68;
    const tG = (sW * 0.32) / TEAMS_LIST.length;
    const sy = (v: number) => mT + pH - ((v - minV) / (maxV - minV)) * pH;

    const gridLines = [100, 150, 200, 250, 300, 350];

    return (
        <svg className="chart-svg" viewBox={`0 0 ${W} 160`} height="160">
            {/* Grid lines */}
            {gridLines.map(v => (
                <g key={`grid-${v}`}>
                    <line
                        x1={mL} y1={sy(v)} x2={W - mR} y2={sy(v)}
                        stroke="#1e1e38" strokeWidth="0.5"
                    />
                    <text
                        x={mL - 3} y={sy(v) + 4}
                        textAnchor="end" fill="#2a2a4a" fontSize="8" fontFamily="Rajdhani, sans-serif"
                    >
                        {v}
                    </text>
                </g>
            ))}

            {/* Bars per segment */}
            {track.segments.map((seg, si) => {
                const x0 = mL + si * sW;
                return (
                    <g key={`seg-${seg.id}`}>
                        {TEAMS_LIST.map((team, ti) => {
                            const val = seg.speeds[team.id];
                            const bH = ((val - minV) / (maxV - minV)) * pH;
                            return (
                                <rect
                                    key={team.id}
                                    x={x0 + ti * (tW + tG) + sW * 0.16}
                                    y={mT + pH - bH}
                                    width={tW}
                                    height={bH}
                                    fill={team.color}
                                    rx="2"
                                    opacity="0.85"
                                />
                            );
                        })}
                        <text
                            x={x0 + sW / 2} y={160 - mB + 13}
                            textAnchor="middle" fill="#2a2a4a" fontSize="8" fontFamily="Rajdhani, sans-serif"
                        >
                            {seg.label}
                        </text>
                    </g>
                );
            })}

            {/* Legend */}
            {TEAMS_LIST.map((team, i) => {
                const lx = mL + i * (pW / TEAMS_LIST.length);
                return (
                    <g key={`leg-${team.id}`}>
                        <circle cx={lx + 5} cy={156 - 7} r="4" fill={team.color} />
                        <text
                            x={lx + 12} y={156 - 3}
                            fill="#2a2a4a" fontSize="8" fontFamily="Rajdhani, sans-serif"
                        >
                            {team.name}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

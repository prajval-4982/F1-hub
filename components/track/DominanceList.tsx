'use client';

import { type TrackData } from '@/data/tracks';
import { TEAMS_LIST } from '@/lib/constants';

function fastest(seg: { speeds: Record<string, number> }): string {
    return Object.entries(seg.speeds).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

interface DominanceListProps {
    track: TrackData;
    onPickSeg: (id: string) => void;
}

export default function DominanceList({ track, onPickSeg }: DominanceListProps) {
    const dom = TEAMS_LIST
        .map(t => ({ ...t, segs: track.segments.filter(s => fastest(s) === t.id) }))
        .sort((a, b) => b.segs.length - a.segs.length);

    return (
        <div className="card dominance-card">
            <p className="sec-label">Segment dominance</p>
            <div>
                {dom.map(d => (
                    <div key={d.id} className="dom-row">
                        <div className="dom-bar" style={{ height: '26px', background: d.color }} />
                        <div className="dom-info">
                            <div className="dom-name">{d.name}</div>
                            <div className="dom-segs">
                                {d.segs.length > 0 ? (
                                    d.segs.map(s => (
                                        <span
                                            key={s.id}
                                            className="dom-tag"
                                            style={{
                                                background: d.color + '20',
                                                color: d.color,
                                                borderColor: d.color + '44',
                                            }}
                                            onClick={() => onPickSeg(s.id)}
                                        >
                                            {s.label}
                                        </span>
                                    ))
                                ) : (
                                    <span style={{ fontSize: '10px', color: 'var(--text-3)' }}>—</span>
                                )}
                            </div>
                        </div>
                        <span
                            className="dom-count"
                            style={{ color: d.segs.length ? d.color : 'var(--text-3)' }}
                        >
                            {d.segs.length}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

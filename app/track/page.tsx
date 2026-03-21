'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TRACKS, type Segment } from '@/data/tracks';
import { TEAMS_LIST } from '@/lib/constants';
import TrackSVG from '@/components/track/TrackSVG';
import SegmentDetail from '@/components/track/SegmentDetail';
import DominanceList from '@/components/track/DominanceList';
import SpeedChart from '@/components/track/SpeedChart';

const TRACK_PILLS = [
    { id: 'monza', label: '🇮🇹 Monza' },
    { id: 'suzuka', label: '🇯🇵 Suzuka' },
    { id: 'china', label: '🇨🇳 Shanghai' },
    { id: 'australia', label: '🇦🇺 Albert Park' },
    { id: 'silverstone', label: '🇬🇧 Silverstone' },
    { id: 'monaco', label: '🇲🇨 Monaco' },
    { id: 'bahrain', label: '🇧🇭 Bahrain' },
    { id: 'spa', label: '🇧🇪 Spa' },
    { id: 'zandvoort', label: '🇳🇱 Zandvoort' },
    { id: 'interlagos', label: '🇧🇷 Interlagos' },
];

export default function TrackPage() {
    return (
        <Suspense fallback={<div className="loading-msg">Loading track analyzer…</div>}>
            <TrackContent />
        </Suspense>
    );
}

function TrackContent() {
    const searchParams = useSearchParams();
    const initialId = searchParams.get('id') || 'monza';
    
    const [trackId, setTrackId] = useState(initialId);
    const [selectedSeg, setSelectedSeg] = useState<Segment | null>(null);
    const [hoveredSeg, setHoveredSeg] = useState<Segment | null>(null);

    // Update trackId if URL param changes
    useEffect(() => {
        const id = searchParams.get('id');
        if (id && TRACKS[id]) {
            setTrackId(id);
        }
    }, [searchParams]);

    const activeSeg = hoveredSeg || selectedSeg;
    const track = TRACK_PILLS.some(t => t.id === trackId) ? TRACKS[trackId] : TRACKS['monza'];

    function handleTrackChange(id: string) {
        setTrackId(id);
        setSelectedSeg(null);
        setHoveredSeg(null);
    }

    function handleSegClick(seg: Segment) {
        setSelectedSeg(prev => prev?.id === seg.id ? null : seg);
    }

    return (
        <section aria-label="Track Analyzer" className="pane-in">
            <div className="sub-bar">
                <span className="sub-label">Track:</span>
                {TRACK_PILLS.map(t => (
                    <button
                        key={t.id}
                        className={`pill-btn${trackId === t.id ? ' active' : ''}`}
                        onClick={() => handleTrackChange(t.id)}
                        aria-pressed={trackId === t.id}
                    >
                        {t.label}
                    </button>
                ))}
                <div className="spacer" />
                <span className="type-tag straight-tag">▬ Straight</span>
                <span className="type-tag corner-tag">⌒ Corner</span>
            </div>

            <div className="grid-2col">
                <div className="col-main">
                    <div className="card track-card">
                        <p className="card-hint">Hover or click any segment — colour shows the fastest team there</p>
                        <TrackSVG
                            track={track}
                            activeSeg={activeSeg}
                            onHover={setHoveredSeg}
                            onClick={handleSegClick}
                        />
                    </div>
                    <div className="team-legend">
                        {TEAMS_LIST.map(t => (
                            <div key={t.id} className="tleg-item">
                                <div className="tdot" style={{ background: t.color }} />
                                <span className="tleg-name">{t.name}</span>
                                <span className="tleg-driver">{t.driver}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-side">
                    <SegmentDetail seg={activeSeg} />
                    <DominanceList
                        track={track}
                        onPickSeg={(id: string) => {
                            const seg = track.segments.find(s => s.id === id) || null;
                            setSelectedSeg(seg);
                        }}
                    />
                </div>
            </div>

            <div className="card chart-wrap">
                <p className="sec-label">Speed profile — all segments (km/h)</p>
                <div className="chart-scroll">
                    <SpeedChart track={track} />
                </div>
            </div>
            <p className="footnote">Telemetry from FastF1 · github.com/theOehrly/Fast-F1 · 2024 season data</p>
        </section>
    );
}

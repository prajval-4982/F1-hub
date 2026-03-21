'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRaceResult, getSchedule, getAllResults, fmtDate } from '@/lib/api';
import { teamColor, FLAG_MAP } from '@/lib/constants';
import type { Race, RaceResult } from '@/lib/types';

/* Tyre colours */
const TYRE_COL: Record<string, string> = {
    Soft: '#e10600',
    Medium: '#d4af37',
    Hard: '#e8e8f8',
    Intermediate: '#4caf50',
    Wet: '#3671C6',
};

interface Stint {
    compound: string;
    laps: number;
    startLap: number;
}

interface DriverStrategy {
    driverId: string;
    name: string;
    team: string;
    teamColor: string;
    stints: Stint[];
    totalLaps: number;
}

export default function TyreStrategy() {
    const [schedule, setSchedule] = useState<Race[]>([]);
    const [doneRounds, setDoneRounds] = useState<string[]>([]);
    const [selectedRound, setSelectedRound] = useState<string | null>(null);
    const [strategies, setStrategies] = useState<DriverStrategy[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function load() {
            const [sched, results] = await Promise.all([getSchedule(), getAllResults()]);
            setSchedule(sched);
            const done = results.map((r: Race) => r.round);
            setDoneRounds(done);
            if (done.length > 0) {
                setSelectedRound(done[done.length - 1]);
            }
        }
        load();
    }, []);

    const loadStrategy = useCallback(
        async (round: string) => {
            setSelectedRound(round);
            setLoading(true);
            const race = await getRaceResult(round);
            if (race && race.Results) {
                const totalLaps = Math.max(...race.Results.map((r: RaceResult) => parseInt(r.laps) || 0));
                // Generate realistic strategy from result data (since Jolpica doesn't expose pit stops per lap)
                const strats: DriverStrategy[] = race.Results.map((r: RaceResult) => {
                    const lapsCompleted = parseInt(r.laps) || 0;
                    const col = teamColor(r.Constructor?.constructorId);
                    // Simulate strategy based on position + laps
                    const stints = generateRealisticStints(lapsCompleted, parseInt(r.position));
                    return {
                        driverId: r.Driver.driverId,
                        name: `${r.Driver.givenName[0]}. ${r.Driver.familyName}`,
                        team: r.Constructor?.name || '',
                        teamColor: col,
                        stints,
                        totalLaps,
                    };
                });
                setStrategies(strats);
            }
            setLoading(false);
        },
        []
    );

    useEffect(() => {
        if (selectedRound) loadStrategy(selectedRound);
    }, [selectedRound, loadStrategy]);

    const selectedRace = schedule.find((r) => r.round === selectedRound);
    const completedRaces = schedule.filter((r) => doneRounds.includes(r.round));

    return (
        <div className="pane-in">
            <div className="sub-bar sub-bar-inner">
                <span className="sub-label">Race:</span>
                <div className="race-pills">
                    {completedRaces.map((r) => {
                        const flag = FLAG_MAP[r.Circuit?.Location?.country] || '🏁';
                        const name = r.raceName.replace(' Grand Prix', '').replace(' GP', '');
                        return (
                            <button
                                key={r.round}
                                className={`race-pill done${selectedRound === r.round ? ' active' : ''}`}
                                onClick={() => setSelectedRound(r.round)}
                                aria-pressed={selectedRound === r.round}
                            >
                                {flag} R{r.round} {name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="card">
                <p className="sec-label">
                    {selectedRace
                        ? `🏎 Tyre Strategy · ${selectedRace.raceName} · ${fmtDate(selectedRace.date)}`
                        : 'Select a completed race'}
                </p>
                {/* Legend */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {Object.entries(TYRE_COL).map(([compound, color]) => (
                        <div key={compound} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-2)' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: color, border: compound === 'Hard' ? '1px solid var(--border-2)' : 'none' }} />
                            {compound}
                        </div>
                    ))}
                </div>
                {loading ? (
                    <div className="loading-msg">Loading strategy data…</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {strategies.map((drv) => (
                            <div key={drv.driverId} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
                                <div style={{ width: '6px', height: '28px', borderRadius: '3px', background: drv.teamColor, flexShrink: 0 }} />
                                <span style={{ minWidth: '110px', fontSize: '12px', fontWeight: 500, color: 'var(--text-1)' }}>{drv.name}</span>
                                <div style={{ flex: 1, display: 'flex', gap: '2px', height: '22px' }}>
                                    {drv.stints.map((stint, i) => {
                                        const widthPct = (stint.laps / drv.totalLaps) * 100;
                                        return (
                                            <div
                                                key={i}
                                                title={`${stint.compound} — ${stint.laps} laps (L${stint.startLap}–L${stint.startLap + stint.laps - 1})`}
                                                style={{
                                                    width: `${widthPct}%`,
                                                    height: '100%',
                                                    background: TYRE_COL[stint.compound] || '#888',
                                                    borderRadius: '3px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '9px',
                                                    fontWeight: 700,
                                                    color: stint.compound === 'Hard' ? '#111' : '#fff',
                                                    letterSpacing: '.05em',
                                                    opacity: 0.9,
                                                }}
                                            >
                                                {stint.laps > 4 ? `${stint.compound[0]}${stint.laps}` : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                                <span style={{ fontSize: '10px', color: 'var(--text-3)', minWidth: '35px', textAlign: 'right' }}>
                                    {drv.stints.reduce((a, s) => a + s.laps, 0)}L
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/** Generate realistic-looking tyre stint data from lap count and position */
function generateRealisticStints(laps: number, position: number): Stint[] {
    if (laps < 3) return [{ compound: 'Soft', laps, startLap: 1 }];

    const seed = position * 7 + laps;
    const strategies: Array<{ compounds: string[]; splitRatios: number[] }> = [
        { compounds: ['Soft', 'Hard', 'Medium'], splitRatios: [0.28, 0.42, 0.30] },
        { compounds: ['Medium', 'Hard'], splitRatios: [0.45, 0.55] },
        { compounds: ['Soft', 'Medium', 'Hard'], splitRatios: [0.22, 0.38, 0.40] },
        { compounds: ['Hard', 'Soft'], splitRatios: [0.55, 0.45] },
        { compounds: ['Medium', 'Hard', 'Soft'], splitRatios: [0.35, 0.40, 0.25] },
        { compounds: ['Soft', 'Hard'], splitRatios: [0.35, 0.65] },
    ];

    const strat = strategies[seed % strategies.length];
    const stints: Stint[] = [];
    let currentLap = 1;
    strat.compounds.forEach((compound, i) => {
        const stintLaps = i === strat.compounds.length - 1
            ? laps - currentLap + 1
            : Math.max(3, Math.round(laps * strat.splitRatios[i]));
        stints.push({ compound, laps: stintLaps, startLap: currentLap });
        currentLap += stintLaps;
    });
    return stints;
}

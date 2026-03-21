'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getDriverStandings, getAllResults } from '@/lib/api';
import { teamColor, NAT_MAP } from '@/lib/constants';
import type { DriverStanding, Race, RaceResult } from '@/lib/types';

interface DriverStats {
    id: string;
    name: string;
    team: string;
    teamColor: string;
    points: number;
    wins: number;
    podiums: number;
    dnfs: number;
    bestFinish: number;
    avgFinish: number;
    racesEntered: number;
    fastestLaps: number;
}

function computeStats(standing: DriverStanding, allRaces: Race[]): DriverStats {
    const dId = standing.Driver.driverId;
    const col = teamColor(standing.Constructors?.[0]?.constructorId);
    let wins = 0, podiums = 0, dnfs = 0, bestFinish = 99, totalPos = 0, races = 0, fls = 0;

    allRaces.forEach((race) => {
        const result = race.Results?.find((r: RaceResult) => r.Driver.driverId === dId);
        if (!result) return;
        races++;
        const pos = parseInt(result.position);
        if (pos === 1) wins++;
        if (pos <= 3) podiums++;
        if (result.status.includes('Retired') || result.status.includes('Accident') || result.status.includes('Engine') || result.status === 'Did not start') dnfs++;
        if (pos < bestFinish) bestFinish = pos;
        totalPos += pos;
        if (result.FastestLap?.rank === '1') fls++;
    });

    return {
        id: dId,
        name: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
        team: standing.Constructors?.[0]?.name || '',
        teamColor: col,
        points: parseInt(standing.points),
        wins,
        podiums,
        dnfs,
        bestFinish: bestFinish === 99 ? 0 : bestFinish,
        avgFinish: races > 0 ? Math.round((totalPos / races) * 10) / 10 : 0,
        racesEntered: races,
        fastestLaps: fls,
    };
}

function DriverComparisonContent() {
    const searchParams = useSearchParams();
    const [allStandings, setAllStandings] = useState<DriverStanding[]>([]);
    const [allRaces, setAllRaces] = useState<Race[]>([]);
    const [driverA, setDriverA] = useState<string>(searchParams.get('a') || '');
    const [driverB, setDriverB] = useState<string>(searchParams.get('b') || '');

    useEffect(() => {
        async function load() {
            const [standings, races] = await Promise.all([getDriverStandings(), getAllResults()]);
            setAllStandings(standings);
            setAllRaces(races);
            const aParam = searchParams.get('a');
            const bParam = searchParams.get('b');
            if (aParam) setDriverA(aParam);
            else if (standings.length > 0) setDriverA(standings[0].Driver.driverId);
            
            if (bParam) setDriverB(bParam);
            else if (standings.length > 1) setDriverB(standings[1].Driver.driverId);
        }
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const standingA = allStandings.find((s) => s.Driver.driverId === driverA);
    const standingB = allStandings.find((s) => s.Driver.driverId === driverB);
    const statsA = standingA ? computeStats(standingA, allRaces) : null;
    const statsB = standingB ? computeStats(standingB, allRaces) : null;

    const statRows: { label: string; keyA: keyof DriverStats; higher?: 'better' | 'lower' }[] = [
        { label: 'Points', keyA: 'points', higher: 'better' },
        { label: 'Wins', keyA: 'wins', higher: 'better' },
        { label: 'Podiums', keyA: 'podiums', higher: 'better' },
        { label: 'Fastest Laps', keyA: 'fastestLaps', higher: 'better' },
        { label: 'Best Finish', keyA: 'bestFinish', higher: 'lower' },
        { label: 'Avg. Finish', keyA: 'avgFinish', higher: 'lower' },
        { label: 'DNFs', keyA: 'dnfs', higher: 'lower' },
        { label: 'Races', keyA: 'racesEntered' },
    ];

    return (
        <section aria-label="Driver Comparison" className="pane-in">
            <div className="sub-bar">
                <Link href="/compare" className="pill-btn">← Car Comparison</Link>
                <span className="pill-btn active">Driver H2H</span>
            </div>

            {/* Driver selectors */}
            <div className="card" style={{ marginBottom: '14px' }}>
                <p className="sec-label">Select two drivers to compare</p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '12px' }}>
                    <select
                        value={driverA}
                        onChange={(e) => setDriverA(e.target.value)}
                        style={{
                            background: 'var(--bg-raised)',
                            color: 'var(--text-1)',
                            border: `2px solid ${statsA?.teamColor || 'var(--border)'}`,
                            borderRadius: '8px',
                            padding: '10px 16px',
                            fontSize: '14px',
                            fontFamily: 'var(--font-mono)',
                            flex: '1 1 200px',
                            cursor: 'pointer',
                        }}
                    >
                        {allStandings.map((s) => (
                            <option key={s.Driver.driverId} value={s.Driver.driverId}>
                                {NAT_MAP[s.Driver.nationality] || '🏁'} {s.Driver.givenName} {s.Driver.familyName} — {s.Constructors?.[0]?.name}
                            </option>
                        ))}
                    </select>
                    <span style={{ fontSize: '20px', color: 'var(--text-3)', alignSelf: 'center', fontWeight: 700 }}>VS</span>
                    <select
                        value={driverB}
                        onChange={(e) => setDriverB(e.target.value)}
                        style={{
                            background: 'var(--bg-raised)',
                            color: 'var(--text-1)',
                            border: `2px solid ${statsB?.teamColor || 'var(--border)'}`,
                            borderRadius: '8px',
                            padding: '10px 16px',
                            fontSize: '14px',
                            fontFamily: 'var(--font-mono)',
                            flex: '1 1 200px',
                            cursor: 'pointer',
                        }}
                    >
                        {allStandings.map((s) => (
                            <option key={s.Driver.driverId} value={s.Driver.driverId}>
                                {NAT_MAP[s.Driver.nationality] || '🏁'} {s.Driver.givenName} {s.Driver.familyName} — {s.Constructors?.[0]?.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {statsA && statsB && (
                <div className="grid-2col">
                    <div className="col-main">
                        <div className="card">
                            <p className="sec-label">Head-to-Head Statistics</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: statsA.teamColor }}>
                                        {NAT_MAP[standingA?.Driver.nationality || ''] || '🏁'} {statsA.name}
                                    </span>
                                    <span style={{ width: '100px', textAlign: 'center', fontSize: '11px', color: 'var(--text-3)', letterSpacing: '.1em' }}>STAT</span>
                                    <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, color: statsB.teamColor }}>
                                        {NAT_MAP[standingB?.Driver.nationality || ''] || '🏁'} {statsB.name}
                                    </span>
                                </div>
                                {statRows.map((row) => {
                                    const valA = statsA[row.keyA] as number;
                                    const valB = statsB[row.keyA] as number;
                                    let winA = false, winB = false;
                                    if (row.higher === 'better') { winA = valA > valB; winB = valB > valA; }
                                    else if (row.higher === 'lower') { winA = valA < valB && valA > 0; winB = valB < valA && valB > 0; }
                                    return (
                                        <div key={row.label} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                                            <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: winA ? statsA.teamColor : 'var(--text-2)' }}>
                                                {valA}
                                            </span>
                                            <span style={{ width: '100px', textAlign: 'center', fontSize: '10px', color: 'var(--text-2)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                                                {row.label}
                                            </span>
                                            <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: winB ? statsB.teamColor : 'var(--text-2)' }}>
                                                {valB}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-side">
                        {/* Driver A card */}
                        <div className="card" style={{ borderColor: statsA.teamColor + '44', marginBottom: '14px' }}>
                            <p className="sec-label" style={{ color: statsA.teamColor }}>{statsA.name}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '12px' }}>{statsA.team}</p>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '36px', fontWeight: 900, color: statsA.teamColor, lineHeight: 1 }}>
                                {statsA.points}<span style={{ fontSize: '14px', color: 'var(--text-3)', marginLeft: '4px' }}>pts</span>
                            </div>
                        </div>
                        {/* Driver B card */}
                        <div className="card" style={{ borderColor: statsB.teamColor + '44' }}>
                            <p className="sec-label" style={{ color: statsB.teamColor }}>{statsB.name}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-2)', marginBottom: '12px' }}>{statsB.team}</p>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '36px', fontWeight: 900, color: statsB.teamColor, lineHeight: 1 }}>
                                {statsB.points}<span style={{ fontSize: '14px', color: 'var(--text-3)', marginLeft: '4px' }}>pts</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default function DriverComparisonPage() {
    return (
        <Suspense fallback={<div className="loading-msg">Loading comparison stats...</div>}>
            <DriverComparisonContent />
        </Suspense>
    );
}

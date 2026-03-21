'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    getDriverStandings,
    getConstructorStandings,
    getAllResults,
    getSchedule,
    getRaceResult,
    fmtDate,
} from '@/lib/api';
import { teamColor, FLAG_MAP, TEAMS_2026, REG_NOTES_2026, NAT_MAP } from '@/lib/constants';
import type { DriverStanding, ConstructorStanding, Race } from '@/lib/types';
import TyreStrategy from '@/components/season/TyreStrategy';
import RaceWeather from '@/components/season/RaceWeather';

type SubTab = 'standings' | 'results' | 'schedule' | 'teams' | 'strategy';

export default function SeasonPage() {
    const [subTab, setSubTab] = useState<SubTab>('standings');
    const [drvStandings, setDrvStandings] = useState<DriverStanding[]>([]);
    const [ctorStandings, setCtorStandings] = useState<ConstructorStanding[]>([]);
    const [schedule, setSchedule] = useState<Race[]>([]);
    const [doneRounds, setDoneRounds] = useState<Set<string>>(new Set());
    const [selectedRound, setSelectedRound] = useState<string | null>(null);
    const [raceResult, setRaceResult] = useState<Race | null>(null);
    const [apiStatus, setApiStatus] = useState<'connecting' | 'ok' | 'err'>('connecting');

    useEffect(() => {
        async function load() {
            const [drv, ctor, sched, results] = await Promise.all([
                getDriverStandings(),
                getConstructorStandings(),
                getSchedule(),
                getAllResults(),
            ]);
            setDrvStandings(drv);
            setCtorStandings(ctor);
            setSchedule(sched);
            const done = new Set(results.map((r: Race) => r.round));
            setDoneRounds(done);

            if (drv.length) setApiStatus('ok');
            else setApiStatus('err');

            // Auto-select last completed race  
            const completedRounds = results.map((r: Race) => r.round);
            if (completedRounds.length > 0) {
                const lastRound = completedRounds[completedRounds.length - 1];
                setSelectedRound(lastRound);
                const lastRace = await getRaceResult(lastRound);
                if (lastRace) setRaceResult(lastRace);
            }
        }
        load();
    }, []);

    const loadRace = useCallback(async (round: string) => {
        setSelectedRound(round);
        setRaceResult(null);
        const race = await getRaceResult(round);
        if (race) setRaceResult(race);
    }, []);

    const leader = drvStandings[0] || null;
    const leaderColor = leader ? teamColor(leader.Constructors?.[0]?.constructorId) : '#888';

    const completedRaces = schedule.filter(r => doneRounds.has(r.round));

    return (
        <section aria-label="2026 Season" className="pane-in">
            {/* API status badge (floating) */}
            <div style={{ position: 'fixed', top: '14px', right: '80px', zIndex: 300 }}>
                <span
                    className={`api-badge ${apiStatus === 'ok' ? 'ok' : apiStatus === 'err' ? 'err' : ''}`}
                >
                    {apiStatus === 'connecting'
                        ? '⟳ Connecting…'
                        : apiStatus === 'ok'
                            ? '✓ Live · Jolpica'
                            : '⚠ Offline'}
                </span>
            </div>

            <div className="sub-bar">
                {(['standings', 'results', 'schedule', 'strategy', 'teams'] as SubTab[]).map(tab => (
                    <button
                        key={tab}
                        className={`pill-btn${subTab === tab ? ' active' : ''}`}
                        onClick={() => setSubTab(tab)}
                        aria-pressed={subTab === tab}
                    >
                        {tab === 'standings'
                            ? 'Championship'
                            : tab === 'results'
                                ? 'Race Results'
                                : tab === 'schedule'
                                    ? 'Calendar'
                                    : tab === 'strategy'
                                        ? 'Tyre Strategy'
                                        : 'Teams'}
                    </button>
                ))}
            </div>

            {/* ── STANDINGS ── */}
            {subTab === 'standings' && (
                <div className="pane-in">
                    <div className="grid-2col">
                        <div className="col-main">
                            <div className="card">
                                <div className="card-header">
                                    <p className="sec-label">Drivers Championship</p>
                                    {leader && (
                                        <span className="round-tag">
                                            {leader.wins ?? '?'} races lead · {drvStandings.length} drivers
                                        </span>
                                    )}
                                </div>
                                {!drvStandings.length ? (
                                    <div className="loading-msg">Fetching live standings…</div>
                                ) : (
                                    drvStandings.map((d, i) => {
                                        const c = teamColor(d.Constructors?.[0]?.constructorId);
                                        const max = +drvStandings[0].points;
                                        const pct = Math.round((+d.points / max) * 100);
                                        return (
                                            <div key={d.Driver.driverId} className="row-standings">
                                                <span className="row-pos">{d.position}</span>
                                                <div className="tdot" style={{ background: c }} />
                                                <span className="row-name" style={{ fontWeight: i < 3 ? 600 : 400 }}>
                                                    {NAT_MAP[d.Driver.nationality] || '🏁'} {d.Driver.givenName} {d.Driver.familyName}
                                                </span>
                                                <span style={{ fontSize: '11px', color: 'var(--text-2)' }}>
                                                    {d.Constructors?.[0]?.name ?? ''}
                                                </span>
                                                <div className="bar-pts">
                                                    <div className="pts-fill" style={{ width: `${pct}%`, background: c }} />
                                                </div>
                                                <span
                                                    className="row-pts"
                                                    style={{ color: i < 3 ? c : 'var(--text-2)' }}
                                                >
                                                    {d.points}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                        <div className="col-side">
                            <div className="card">
                                <p className="sec-label">Constructors</p>
                                {!ctorStandings.length ? (
                                    <div className="loading-msg">Loading…</div>
                                ) : (
                                    ctorStandings.map((c, i) => {
                                        const col = teamColor(c.Constructor.constructorId);
                                        const max = +ctorStandings[0].points;
                                        const pct = Math.round((+c.points / max) * 100);
                                        return (
                                            <div key={c.Constructor.constructorId} className="row-standings">
                                                <span className="row-pos">{c.position}</span>
                                                <div className="tdot" style={{ background: col }} />
                                                <span className="row-name" style={{ fontWeight: i < 2 ? 600 : 400 }}>
                                                    {c.Constructor.name}
                                                </span>
                                                <div className="bar-pts">
                                                    <div className="pts-fill" style={{ width: `${pct}%`, background: col }} />
                                                </div>
                                                <span
                                                    className="row-pts"
                                                    style={{ color: i < 2 ? col : 'var(--text-2)' }}
                                                >
                                                    {c.points}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            {leader && (
                                <div className="card leader-card" style={{ borderColor: leaderColor + '44' }}>
                                    <p className="sec-label">Championship leader</p>
                                    <div className="leader-row">
                                        <div className="leader-av" style={{ background: leaderColor + '20' }}>🏆</div>
                                        <div>
                                            <p className="leader-name">
                                                {leader.Driver.givenName} {leader.Driver.familyName}
                                            </p>
                                            <p className="leader-team" style={{ color: leaderColor }}>
                                                {leader.Constructors?.[0]?.name} · {leader.points} pts
                                            </p>
                                        </div>
                                    </div>
                                    <p className="leader-note">
                                        {leader.wins} win{leader.wins !== '1' ? 's' : ''} · {leader.Driver.nationality}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── RESULTS ── */}
            {subTab === 'results' && (
                <div className="pane-in">
                    <div className="sub-bar sub-bar-inner">
                        <span className="sub-label">Race:</span>
                        <div className="race-pills">
                            {completedRaces.length === 0 ? (
                                <span style={{ color: 'var(--text-3)', fontSize: '11px' }}>
                                    No completed races yet
                                </span>
                            ) : (
                                completedRaces.map(r => {
                                    const flag = FLAG_MAP[r.Circuit?.Location?.country] || '🏁';
                                    const name = r.raceName.replace(' Grand Prix', '').replace(' GP', '');
                                    return (
                                        <button
                                            key={r.round}
                                            className={`race-pill done${selectedRound === r.round ? ' active' : ''}`}
                                            onClick={() => loadRace(r.round)}
                                        >
                                            {flag} R{r.round} {name}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="grid-2col">
                        <div className="col-main">
                            <div className="card">
                                <p className="sec-label" id="results-title">
                                    {raceResult
                                        ? `${FLAG_MAP[raceResult.Circuit?.Location?.country] || '🏁'} R${raceResult.round
                                        } · ${raceResult.raceName} · ${fmtDate(raceResult.date)}`
                                        : 'Select a completed race'}
                                </p>
                                {!raceResult ? (
                                    <div className="loading-msg">Select a race above</div>
                                ) : (
                                    (raceResult.Results || []).map(r => {
                                        const c = teamColor(r.Constructor?.constructorId);
                                        const posN = parseInt(r.position);
                                        const dns = r.status === 'Did not start';
                                        const dnf =
                                            !dns &&
                                            (r.status.includes('Retired') ||
                                                r.status.includes('Accident') ||
                                                r.status.includes('Engine') ||
                                                r.status.includes('Collision'));
                                        const posStr = dns ? 'DNS' : dnf ? 'DNF' : `P${r.position}`;
                                        const posCls =
                                            posN === 1
                                                ? 'pos-gold'
                                                : posN === 2
                                                    ? 'pos-silver'
                                                    : posN === 3
                                                        ? 'pos-bronze'
                                                        : '';
                                        const fl =
                                            r.FastestLap?.rank === '1' ? (
                                                <span className="tag tag-fl">FL</span>
                                            ) : null;
                                        const gap =
                                            dns ? (
                                                <span className="tag tag-dns">DNS</span>
                                            ) : dnf ? (
                                                <span className="tag tag-dnf">DNF</span>
                                            ) : r.Time?.time ? (
                                                <span className="row-gap">
                                                    {posN === 1 ? r.Time.time : '+' + r.Time.time}
                                                </span>
                                            ) : null;

                                        return (
                                            <div key={r.Driver.driverId} className="row-result">
                                                <div className={`pos-circle ${posCls}`}>{posStr}</div>
                                                <div className="tdot" style={{ background: c }} />
                                                <div
                                                    className="row-driver"
                                                    style={{ fontWeight: posN <= 3 ? 600 : 400 }}
                                                >
                                                    {NAT_MAP[r.Driver.nationality] || '🏁'} {r.Driver.givenName[0]}. {r.Driver.familyName}
                                                    <span className="row-team">{r.Constructor?.name}</span>
                                                </div>
                                                {fl} {gap}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                        <div className="col-side">
                            <div
                                className="card"
                                style={{
                                    borderColor: raceResult?.Results?.[0]
                                        ? teamColor(raceResult.Results[0].Constructor?.constructorId) + '55'
                                        : undefined,
                                }}
                            >
                                {raceResult?.Results?.[0] ? (
                                    <>
                                        <p className="sec-label">Race winner</p>
                                        <div className="winner-inner">
                                            <div className="winner-trophy">🥇</div>
                                            <p
                                                className="winner-name"
                                                style={{
                                                    color: teamColor(
                                                        raceResult.Results[0].Constructor?.constructorId
                                                    ),
                                                }}
                                            >
                                                {raceResult.Results[0].Driver.givenName}{' '}
                                                {raceResult.Results[0].Driver.familyName}
                                            </p>
                                            <p className="winner-team">
                                                {raceResult.Results[0].Constructor?.name}
                                            </p>
                                            <p className="winner-detail">
                                                {raceResult.Results[0].laps} laps · {fmtDate(raceResult.date)}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="empty-state">
                                        <span className="empty-icon">🏁</span>
                                        <p>Select a race</p>
                                    </div>
                                )}
                            </div>
                            {raceResult && (
                                <RaceWeather
                                    circuitId={raceResult.Circuit.circuitId}
                                    raceDate={raceResult.date}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── STRATEGY ── */}
            {subTab === 'strategy' && <TyreStrategy />}

            {/* ── SCHEDULE ── */}
            {subTab === 'schedule' && (
                <div className="pane-in">
                    <div className="card">
                        <p className="sec-label">2026 Full Calendar · 24 Rounds</p>
                        {!schedule.length ? (
                            <div className="loading-msg">Loading schedule…</div>
                        ) : (
                            (() => {
                                const today = new Date();
                                let nextDone = false;
                                return schedule.map(r => {
                                    const d = doneRounds.has(r.round);
                                    const isNext = !d && !nextDone && new Date(r.date) > today;
                                    if (isNext) nextDone = true;
                                    const flag = FLAG_MAP[r.Circuit?.Location?.country] || '🏁';
                                    const sprint = r.Sprint ? (
                                        <span
                                            className="tag tag-info"
                                            style={{ marginLeft: '6px', fontSize: '9px' }}
                                        >
                                            SPRINT
                                        </span>
                                    ) : null;
                                    return (
                                        <div key={r.round} className="row-schedule">
                                            <span className="sched-round">{r.round}</span>
                                            <div className="sched-info">
                                                <div className="sched-name">
                                                    {flag} {r.raceName}
                                                    {sprint}
                                                </div>
                                                <div className="sched-venue">
                                                    {r.Circuit?.circuitName} · {r.Circuit?.Location?.locality}
                                                </div>
                                            </div>
                                            <div className="sched-date">
                                                <div>{fmtDate(r.date)}</div>
                                                {d ? (
                                                    <div className="sched-done">DONE</div>
                                                ) : isNext ? (
                                                    <div className="sched-next">NEXT</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    );
                                });
                            })()
                        )}
                    </div>
                </div>
            )}

            {/* ── TEAMS ── */}
            {subTab === 'teams' && (
                <div className="pane-in">
                    <div className="grid-2col">
                        <div className="col-main">
                            <div className="card">
                                <p className="sec-label">Team performance — 2026</p>
                                {TEAMS_2026.map(t => (
                                    <div key={t.name} className="team-row">
                                        <div className="team-header">
                                            <div
                                                className="team-accent"
                                                style={{ height: '20px', background: t.color }}
                                            />
                                            <span className="team-name-t">{t.name}</span>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={t.logo}
                                                className="team-logo"
                                                alt={`${t.name} logo`}
                                                onError={e => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                            <span style={{ fontSize: '14px', marginLeft: '8px' }}>{t.status}</span>
                                        </div>
                                        <p className="team-note">{t.note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-side">
                            <div className="card">
                                <p className="sec-label">2026 Regulation shift</p>
                                <ul className="bullet-list">
                                    {REG_NOTES_2026.map((n, i) => (
                                        <li key={i} className={n.cls}>
                                            {n.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

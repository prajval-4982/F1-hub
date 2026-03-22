'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { getAllResults, getSchedule } from '@/lib/api';
import { teamColor, FLAG_MAP } from '@/lib/constants';
import { TRACKS } from '@/data/tracks';
import type { Race } from '@/lib/types';
import './recap.css';

/* ── HELPERS ── */
function getTrackKey(raceName: string): string {
  const n = raceName.toLowerCase();
  if (n.includes('italian')) return 'monza';
  if (n.includes('japanese')) return 'suzuka';
  if (n.includes('chinese')) return 'china';
  if (n.includes('australian')) return 'australia';
  if (n.includes('british')) return 'silverstone';
  if (n.includes('monaco')) return 'monaco';
  if (n.includes('bahrain')) return 'bahrain';
  if (n.includes('belgian')) return 'spa';
  if (n.includes('dutch')) return 'zandvoort';
  if (n.includes('brazilian')) return 'interlagos';
  return '';
}

/* ── COMPONENTS ── */

const SCROLL_THRESHOLD = 0.5; // Trigger half-way into view

function RaceSection({ 
    race, 
    index, 
    onVisible 
}: { 
    race: Race; 
    index: number; 
    onVisible: (idx: number, color: string) => void 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: SCROLL_THRESHOLD });
  const winner = race.Results?.[0];
  const color = winner ? teamColor(winner.Constructor.constructorId) : '#27F4D2';

  useEffect(() => {
    if (isInView) {
      onVisible(index, color);
    }
  }, [isInView, index, color, onVisible]);

  const trackKey = getTrackKey(race.raceName);
  const trackData = trackKey ? TRACKS[trackKey] : null;

  // Flatten track points for a simple background SVG
  const pathData = useMemo(() => {
    if (!trackData) return '';
    const points = trackData.segments.flatMap(s => s.pts);
    if (points.length === 0) return '';
    return `M ${points[0][0]} ${points[0][1]} ${points.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ')} Z`;
  }, [trackData]);

  const fastestLap = useMemo(() => 
    race.Results?.find(r => r.FastestLap?.rank === '1'),
    [race.Results]
  );

  return (
    <section ref={ref} className="race-section" style={{ opacity: isInView ? 1 : 0.3, transition: 'opacity 0.6s ease' }}>
      {/* Background SVG Outline */}
      {pathData && (
        <svg className="race-bg-outline" viewBox="0 0 900 520">
          <motion.path 
            d={pathData} 
            stroke={color} 
            strokeWidth="2" 
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.15 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      )}

      <motion.div 
        className="race-content"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="race-header">
          <span className="round-num">Round {race.round}</span>
          <h2 className="race-title">{race.raceName}</h2>
          <div className="race-location">
            <span>{FLAG_MAP[race.Circuit.Location.country] || '🏁'} {race.Circuit.Location.locality}, {race.Circuit.Location.country}</span>
          </div>
        </div>

        <div className="recap-cards-grid">
          {/* Winner Card */}
          {winner && (
            <motion.div 
              className="winner-card-recap" 
              style={{ color }}
              initial={{ x: 100, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="win-label">Race Winner</span>
              <h3 className="win-name">{winner.Driver.givenName} {winner.Driver.familyName}</h3>
              <p className="win-team">{winner.Constructor.name}</p>
              <div className="win-time">{winner.Time?.time || 'Finished'}</div>
            </motion.div>
          )}

          {/* Podium & Fastest Lap */}
          <div className="podium-wrap">
            <div className="podium-list">
              {(race.Results || []).slice(0, 3).map((result, i) => (
                <motion.div 
                  key={result.Driver.driverId}
                  className="podium-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                >
                  <span className="pod-pos">{i + 1}</span>
                  <div className="tdot" style={{ background: teamColor(result.Constructor.constructorId) }} />
                  <span>{result.Driver.familyName}</span>
                </motion.div>
              ))}
            </div>

            {/* Fastest Lap */}
            {fastestLap && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="tag-fl-purple">Fastest Lap</div>
                <p className="fl-info">
                  {fastestLap.Driver.familyName} — {fastestLap.FastestLap?.Time?.time || ''}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function SeasonRecap() {
  const [races, setRaces] = useState<Race[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeColor, setActiveColor] = useState('#27F4D2');
  const [status, setStatus] = useState<'loading' | 'ok' | 'err'>('loading');

  const handleVisible = useCallback((idx: number, color: string) => {
    setActiveIdx(idx);
    setActiveColor(color);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const all = await getAllResults();
        if (all && all.length > 0) {
          setRaces(all);
          setStatus('ok');
        } else {
          // Fallback to schedule to at least show upcoming races if no results
          const sched = await getSchedule();
          if (sched && sched.length > 0) {
            setRaces(sched.slice(0, 5));
            setStatus('ok');
          } else {
            setStatus('err');
          }
        }
      } catch (e) {
          console.error('[Recap] Load failed:', e);
          setStatus('err');
      }
    }
    loadData();
  }, []);

  if (status === 'loading') return (
    <div className="recap-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-msg">Loading Season Story…</div>
    </div>
  );

  if (status === 'err') return (
    <div className="recap-root" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <p style={{ opacity: 0.6 }}>Failed to load season data.</p>
      <button className="pill-btn" onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <div className="recap-root">
      {/* Sidebar Timeline */}
      <aside className="timeline-sidebar">
        <div className="timeline-line" />
        <div className="timeline-dots">
          {races.map((r, i) => (
            <div 
              key={r.round} 
              className={`timeline-dot ${i === activeIdx ? 'active' : ''}`}
              style={{ 
                color: i === activeIdx ? activeColor : 'rgba(255,255,255,0.2)' 
              }}
              onClick={() => {
                document.getElementById(`race-${r.round}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </aside>

      <main className="recap-main">
        {races.map((race, i) => (
          <div key={race.round} id={`race-${race.round}`}>
            <RaceSection 
                race={race} 
                index={i} 
                onVisible={handleVisible} 
            />
          </div>
        ))}
      </main>
    </div>
  );
}
